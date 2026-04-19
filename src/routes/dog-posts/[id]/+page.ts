import type { DogPost } from '$lib/types.js'
import dogPostsData from '$lib/data/dog-posts.json'

export function load({ params }: { params: { id: string } }) {
  const post = (dogPostsData as DogPost[]).find((p) => p.id === params.id) ?? null
  return { post, id: params.id }
}
