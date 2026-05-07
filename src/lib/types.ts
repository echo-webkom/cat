export interface Author {
  id: string
  name: string
}

export interface CatPost {
  id: string
  title: string
  tagline: string
  body: string
  headerImage: string
  tags: string[]
  likes: number
  timestamp: string
  author: Author
}

export interface Comment {
  id: string
  postId: string
  postType: 'cat-food' | 'mouse-clicks'
  author: Author
  body: string
  timestamp: string
}

export type SortOption = 'newest' | 'oldest' | 'most-liked'

export interface User {
  id: string
  name: string
  email: string
  alternativeEmail: string | null
  hasImage: boolean
  degree: {
    id: string
    name: string
  }
}
