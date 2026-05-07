import matter from 'gray-matter'
import type { CatPost, Author } from './types'
import { dev } from '$app/environment'

interface CatPostsRepository {
  list(): Promise<Array<CatPost>>
  get(id: string): Promise<CatPost | null>
}

function parseCatPost(id: string, raw: string): CatPost {
  const { data, content } = matter(raw)
  return {
    id,
    title: data.title ?? '',
    tagline: data.tagline ?? '',
    body: content.trim(),
    headerImage: data.headerImage ?? '',
    tags: data.tags ?? [],
    likes: data.likes ?? 0,
    timestamp: new Date(data.timestamp ?? Date.now()).toISOString(),
    author: (data.author ?? { id: 'unknown', name: 'Unknown' }) as Author,
  }
}

// Slugify a filename: strip directory prefix and .md extension
function slugFromPath(path: string): string {
  return path.replace(/^.*[\\/]/, '').replace(/\.md$/, '')
}

export class LocalCatPostsRepository implements CatPostsRepository {
  private readonly modules = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default' })

  async list(): Promise<CatPost[]> {
    const posts = await Promise.all(
      Object.entries(this.modules).map(async ([path, load]) => {
        const raw = (await load()) as string
        return parseCatPost(slugFromPath(path), raw)
      }),
    )
    return posts.toSorted((a, b) => b.timestamp.localeCompare(a.timestamp))
  }

  async get(id: string): Promise<CatPost | null> {
    const entry = Object.entries(this.modules).find(([path]) => slugFromPath(path) === id)
    if (!entry) return null
    const raw = (await entry[1]()) as string
    return parseCatPost(id, raw)
  }
}

interface GithubCatPostsRepositoryOptions {
  owner: string
  repo: string
  token?: string
}

interface GithubContentsItem {
  name: string
  type: 'file' | 'dir' | 'symlink' | 'submodule'
  download_url: string | null
}

export class GithubCatPostsRepository implements CatPostsRepository {
  private readonly baseUrl: string
  private readonly headers: Record<string, string>

  constructor({ owner, repo, token }: GithubCatPostsRepositoryOptions) {
    this.baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents`
    this.headers = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }

  private async fetchRaw(url: string): Promise<string> {
    const res = await fetch(url, { headers: this.headers })
    if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status} ${res.statusText}`)
    return res.text()
  }

  async list(): Promise<CatPost[]> {
    const res = await fetch(this.baseUrl, { headers: this.headers })
    if (!res.ok) throw new Error(`GitHub list failed: ${res.status} ${res.statusText}`)

    const items = (await res.json()) as GithubContentsItem[]
    const mdFiles = items.filter(
      (f) => f.type === 'file' && f.name.endsWith('.md') && f.download_url,
    )

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const raw = await this.fetchRaw(file.download_url!)
        return parseCatPost(file.name.replace(/\.md$/, ''), raw)
      }),
    )

    return posts.toSorted((a, b) => b.timestamp.localeCompare(a.timestamp))
  }

  async get(id: string): Promise<CatPost | null> {
    const url = `${this.baseUrl}/${id}.md`
    const res = await fetch(url, { headers: this.headers })
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`GitHub get failed: ${res.status} ${res.statusText}`)

    const item = (await res.json()) as GithubContentsItem
    if (!item.download_url) return null

    const raw = await this.fetchRaw(item.download_url)
    return parseCatPost(id, raw)
  }
}

export class CatFetcher implements CatPostsRepository {
  local: CatPostsRepository
  github: CatPostsRepository

  constructor(githubOptions: GithubCatPostsRepositoryOptions) {
    this.local = new LocalCatPostsRepository()
    this.github = new GithubCatPostsRepository(githubOptions)
  }

  async list(): Promise<Array<CatPost>> {
    if (dev) {
      return await this.local.list()
    }
    return await this.github.list()
  }

  async get(id: string): Promise<CatPost | null> {
    if (dev) {
      return await this.local.get(id)
    }
    return await this.github.get(id)
  }
}
