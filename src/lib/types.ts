export interface Author {
	id: string;
	name: string;
	role: 'student' | 'admin' | 'moderator';
}

export interface CatFoodPost {
	id: string;
	title: string;
	tagline: string;
	body: string;
	headerImage: string;
	tags: string[];
	likes: number;
	timestamp: string;
	author: Author;
}

export interface DogPost {
	id: string;
	title: string;
	tagline: string;
	body: string;
	headerImage: string;
	tags: string[];
	likes: number;
	timestamp: string;
	author: Author;
}

export interface MouseClick {
	id: string;
	title: string;
	url: string;
	description: string;
	tags: string[];
	likes: number;
	timestamp: string;
	author: Author;
}

export interface Comment {
	id: string;
	postId: string;
	postType: 'cat-food' | 'mouse-clicks';
	author: Author;
	body: string;
	timestamp: string;
}

export type SortOption = 'newest' | 'oldest' | 'most-liked';
