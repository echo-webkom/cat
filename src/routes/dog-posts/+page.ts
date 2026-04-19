import type { DogPost } from '$lib/types.js'
import dogPostsData from '$lib/data/dog-posts.json'

export function load() {
  return { posts: dogPostsData as DogPost[] }
}
