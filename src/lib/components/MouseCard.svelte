<script lang="ts">
	import type { MouseClick } from '$lib/types.js';
	import { formatRelativeTime } from '$lib/utils.js';
	import Avatar from './Avatar.svelte';
	import LikeButton from './LikeButton.svelte';

	let { post }: { post: MouseClick } = $props();
</script>

<a
	href="/mouse-clicks/{post.id}"
	class="group flex items-center justify-between gap-3 border border-zinc-800 bg-zinc-900 px-4 py-3.5 transition-colors hover:border-[#00ff88]/30"
>
	<div class="flex min-w-0 items-center gap-3">
		<Avatar name={post.author.name} size="sm" />
		<div class="min-w-0">
			<h3 class="line-clamp-1 text-base font-bold text-white">{post.title}</h3>
			<span class="text-xs text-zinc-400">{post.author.name} // {formatRelativeTime(post.timestamp)}</span>
		</div>
	</div>
	<div class="shrink-0">
		<LikeButton postId={post.id} initialLikes={post.likes} />
	</div>
</a>
