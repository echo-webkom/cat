import { extractSessionId, getSessionById, getUserById } from '$lib/auth'
import { CatFetcher } from '$lib/posts'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get('session-token')

  event.locals.user = null

  if (sessionToken) {
    const token = await extractSessionId(sessionToken)
    if (token) {
      const session = await getSessionById(token)
      const user = await getUserById(session.userId)
      event.locals.user = user
    }
  }

  const fetcher = new CatFetcher({
    repo: 'cat-posts',
    owner: 'echo-webkom',
    // @ts-ignore idc
    token: process.env.GITHUB_TOKEN,
  })
  event.locals.fetcher = fetcher

  return resolve(event)
}
