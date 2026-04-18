<script lang="ts">
	import { likeStore } from '$lib/store.svelte.js';

	let { postId, initialLikes }: { postId: string; initialLikes: number } = $props();

	const count = $derived(likeStore.getCount(postId, initialLikes));
	const liked = $derived(likeStore.isLiked(postId));

	function toggle() {
		likeStore.toggle(postId, initialLikes);
	}
</script>

<button
	type="button"
	class="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all {liked
		? 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30'
		: 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300'}"
	onclick={toggle}
	aria-label="Like post"
>
	<svg
		class="h-4 w-4 transition-transform group-active:scale-125 {liked ? 'fill-rose-400' : 'fill-none stroke-current'}"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path
			d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
		/>
	</svg>
	<span class="font-medium tabular-nums">{count}</span>
</button>
