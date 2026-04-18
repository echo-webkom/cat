import type { CatFoodPost, Comment, DogPost, MouseClick } from './types.js';

class LikeStore {
	#counts = $state<Record<string, number>>({});
	#liked = $state<Set<string>>(new Set());

	toggle(postId: string, initialLikes: number) {
		if (this.#liked.has(postId)) {
			this.#liked.delete(postId);
			this.#counts[postId] = this.getCount(postId, initialLikes) - 1;
		} else {
			this.#liked.add(postId);
			this.#counts[postId] = this.getCount(postId, initialLikes) + 1;
		}
	}

	getCount(postId: string, initialLikes: number): number {
		return this.#counts[postId] ?? initialLikes;
	}

	isLiked(postId: string): boolean {
		return this.#liked.has(postId);
	}
}

class CommentStore {
	#data = $state<Record<string, Comment[]>>({});

	add(postId: string, comment: Comment) {
		if (!this.#data[postId]) this.#data[postId] = [];
		this.#data[postId].push(comment);
	}

	getNew(postId: string): Comment[] {
		return this.#data[postId] ?? [];
	}
}

class PostStore {
	#catFood = $state<CatFoodPost[]>([]);
	#dogPosts = $state<DogPost[]>([]);
	#mouseClicks = $state<MouseClick[]>([]);

	addCatFood(post: CatFoodPost) {
		this.#catFood = [post, ...this.#catFood];
	}

	addDogPost(post: DogPost) {
		this.#dogPosts = [post, ...this.#dogPosts];
	}

	addMouseClick(post: MouseClick) {
		this.#mouseClicks = [post, ...this.#mouseClicks];
	}

	getCatFood(): CatFoodPost[] {
		return this.#catFood;
	}

	getDogPosts(): DogPost[] {
		return this.#dogPosts;
	}

	getMouseClicks(): MouseClick[] {
		return this.#mouseClicks;
	}

	findById(id: string): CatFoodPost | DogPost | MouseClick | undefined {
		return [...this.#catFood, ...this.#dogPosts, ...this.#mouseClicks].find((p) => p.id === id);
	}
}

export const likeStore = new LikeStore();
export const commentStore = new CommentStore();
export const postStore = new PostStore();
