import type { CatFoodPost } from '$lib/types.js'
import catFoodData from '$lib/data/cat-food.json'

export function load() {
  return { posts: catFoodData as CatFoodPost[] }
}
