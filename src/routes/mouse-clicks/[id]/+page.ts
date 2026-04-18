import type { MouseClick, Comment } from '$lib/types.js';
import mouseClicksData from '$lib/data/mouse-clicks.json';
import commentsData from '$lib/data/comments.json';

export function load({ params }: { params: { id: string } }) {
	const post = (mouseClicksData as MouseClick[]).find((p) => p.id === params.id) ?? null;
	const comments = post
		? (commentsData as Comment[]).filter(
				(c) => c.postId === params.id && c.postType === 'mouse-clicks'
			)
		: [];

	return { post, id: params.id, comments };
}
