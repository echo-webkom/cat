import { error } from '@sveltejs/kit';
import type { CatFoodPost, Comment } from '$lib/types.js';
import catFoodData from '$lib/data/cat-food.json';
import commentsData from '$lib/data/comments.json';

export function load({ params }: { params: { id: string } }) {
	const post = (catFoodData as CatFoodPost[]).find((p) => p.id === params.id);
	if (!post) throw error(404, 'Post not found');

	const comments = (commentsData as Comment[]).filter(
		(c) => c.postId === params.id && c.postType === 'cat-food'
	);

	return { post, comments };
}
