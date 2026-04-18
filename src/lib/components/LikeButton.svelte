<script lang="ts">
	import { likeStore } from '$lib/store.svelte.js';

	let { postId, initialLikes, size = 'sm' }: { postId: string; initialLikes: number; size?: 'sm' | 'lg' } = $props();

	const count = $derived(likeStore.getCount(postId, initialLikes));
	const liked = $derived(likeStore.isLiked(postId));
</script>

<button
	type="button"
	class="transition-colors {size === 'lg' ? 'text-base' : 'text-sm'} {liked
		? 'text-[#00ff88]'
		: 'text-zinc-500 hover:text-zinc-200'}"
	onclick={() => likeStore.toggle(postId, initialLikes)}
	aria-label="Like post"
>
	[{liked ? '♥' : '♡'} {count}]
</button>
