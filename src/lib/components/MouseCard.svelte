<script lang="ts">
	import type { MouseClick } from '$lib/types.js';
	import { formatRelativeTime, getDomain } from '$lib/utils.js';
	import Avatar from './Avatar.svelte';
	import LikeButton from './LikeButton.svelte';

	let { post }: { post: MouseClick } = $props();

	const domain = $derived(getDomain(post.url));
</script>

<a
	href="/mouse-clicks/{post.id}"
	class="group flex items-start gap-3.5 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3.5 transition-all hover:border-zinc-700 hover:bg-zinc-800/50"
>
	<div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-zinc-300 transition-colors">
		<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
		</svg>
	</div>

	<div class="min-w-0 flex-1">
		<div class="flex items-start justify-between gap-3">
			<div class="min-w-0">
				<h3 class="line-clamp-1 text-base font-bold text-white group-hover:text-zinc-100">
					{post.title}
				</h3>
				<span class="text-xs text-zinc-400">{domain}</span>
			</div>
			<div class="shrink-0">
				<LikeButton postId={post.id} initialLikes={post.likes} />
			</div>
		</div>

		{#if post.description}
			<p class="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-400">{post.description}</p>
		{/if}

		<div class="mt-2.5 flex items-center gap-2">
			<Avatar name={post.author.name} size="sm" />
			<span class="text-xs text-zinc-400">{post.author.name} · {formatRelativeTime(post.timestamp)}</span>
		</div>
	</div>
</a>
