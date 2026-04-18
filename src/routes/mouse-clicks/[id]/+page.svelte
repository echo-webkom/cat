<script lang="ts">
	import type { PageData } from './$types';
	import { formatFullDate, getDomain } from '$lib/utils.js';
	import Avatar from '$lib/components/Avatar.svelte';
	import LikeButton from '$lib/components/LikeButton.svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
	const comments = $derived(data.comments);
	const domain = $derived(getDomain(post.url));
</script>

<svelte:head>
	<title>{post.title} — Cat</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 sm:px-6">
	<a
		href="/mouse-clicks"
		class="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
	>
		<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
		Mouse Clicks
	</a>

	<div class="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
		<div class="flex items-center gap-4 border-b border-zinc-800 p-6 sm:p-8">
			<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-zinc-300">
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
				</svg>
			</div>
			<div class="min-w-0">
				<h1 class="text-xl font-bold text-white sm:text-2xl">{post.title}</h1>
				<a
					href={post.url}
					target="_blank"
					rel="noopener noreferrer"
					class="mt-0.5 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
					onclick={(e) => e.stopPropagation()}
				>
					{domain}
					<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
				</a>
			</div>
		</div>

		<div class="p-6 sm:p-8">
			<div class="mb-2 text-sm text-zinc-400">{formatFullDate(post.timestamp)}</div>

			{#if post.description}
				<p class="mb-8 text-base leading-relaxed text-zinc-200">{post.description}</p>
			{/if}

			<a
				href={post.url}
				target="_blank"
				rel="noopener noreferrer"
				class="mb-8 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
				</svg>
				Visit {domain}
			</a>

			<div class="flex items-center justify-between border-t border-zinc-800 pt-6">
				<div class="flex items-center gap-3">
					<Avatar name={post.author.name} size="md" />
					<div>
						<p class="text-sm font-medium text-zinc-200">Shared by {post.author.name}</p>
						<p class="text-xs text-zinc-400">{formatFullDate(post.timestamp)}</p>
					</div>
				</div>
				<LikeButton postId={post.id} initialLikes={post.likes} />
			</div>
		</div>
	</div>

	<div class="px-0 sm:px-2">
		<CommentSection postId={post.id} postType="mouse-clicks" initialComments={comments} />
	</div>
</div>
