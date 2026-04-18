import { error } from '@sveltejs/kit';
import type { DogPost } from '$lib/types.js';
import dogPostsData from '$lib/data/dog-posts.json';

export function load({ params }: { params: { id: string } }) {
	const post = (dogPostsData as DogPost[]).find((p) => p.id === params.id);
	if (!post) throw error(404, 'Post not found');
	return { post };
}
