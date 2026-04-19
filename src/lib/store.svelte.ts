import type { CatFoodPost, Comment, DogPost, MouseClick } from './types.js'

class LikeStore {
  #counts = $state<Record<string, number>>({})
  #liked = $state<Set<string>>(new Set())

  toggle(postId: string, initialLikes: number) {
    if (this.#liked.has(postId)) {
      this.#liked.delete(postId)
      this.#counts[postId] = this.getCount(postId, initialLikes) - 1
    } else {
      this.#liked.add(postId)
      this.#counts[postId] = this.getCount(postId, initialLikes) + 1
    }
  }

  getCount(postId: string, initialLikes: number): number {
    return this.#counts[postId] ?? initialLikes
  }

  isLiked(postId: string): boolean {
    return this.#liked.has(postId)
  }
}

class CommentStore {
  #data = $state<Record<string, Comment[]>>({})

  add(postId: string, comment: Comment) {
    if (!this.#data[postId]) this.#data[postId] = []
    this.#data[postId].push(comment)
  }

  getNew(postId: string): Comment[] {
    return this.#data[postId] ?? []
  }
}

class PostStore {
  #catFood = $state<CatFoodPost[]>([])
  #dogPosts = $state<DogPost[]>([])
  #mouseClicks = $state<MouseClick[]>([])
  #overrides = $state<Record<string, CatFoodPost | DogPost | MouseClick>>({})

  addCatFood(post: CatFoodPost) {
    this.#catFood = [post, ...this.#catFood]
  }

  addDogPost(post: DogPost) {
    this.#dogPosts = [post, ...this.#dogPosts]
  }

  addMouseClick(post: MouseClick) {
    this.#mouseClicks = [post, ...this.#mouseClicks]
  }

  update(id: string, updated: CatFoodPost | DogPost | MouseClick) {
    const cfIdx = this.#catFood.findIndex((p) => p.id === id)
    if (cfIdx !== -1) {
      this.#catFood = this.#catFood.map((p) => (p.id === id ? (updated as CatFoodPost) : p))
      return
    }
    const dpIdx = this.#dogPosts.findIndex((p) => p.id === id)
    if (dpIdx !== -1) {
      this.#dogPosts = this.#dogPosts.map((p) => (p.id === id ? (updated as DogPost) : p))
      return
    }
    const mcIdx = this.#mouseClicks.findIndex((p) => p.id === id)
    if (mcIdx !== -1) {
      this.#mouseClicks = this.#mouseClicks.map((p) => (p.id === id ? (updated as MouseClick) : p))
      return
    }
    this.#overrides = { ...this.#overrides, [id]: updated }
  }

  getOverride(id: string): CatFoodPost | DogPost | MouseClick | undefined {
    return this.#overrides[id]
  }

  getCatFood(): CatFoodPost[] {
    return this.#catFood
  }

  getDogPosts(): DogPost[] {
    return this.#dogPosts
  }

  getMouseClicks(): MouseClick[] {
    return this.#mouseClicks
  }

  findById(id: string): CatFoodPost | DogPost | MouseClick | undefined {
    return (
      this.#overrides[id] ??
      [...this.#catFood, ...this.#dogPosts, ...this.#mouseClicks].find((p) => p.id === id)
    )
  }
}

export const likeStore = new LikeStore()
export const commentStore = new CommentStore()
export const postStore = new PostStore()
