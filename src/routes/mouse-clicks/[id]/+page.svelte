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
		← mouse-clicks
	</a>

	<div class="border border-zinc-800 bg-zinc-900">
		<div class="flex items-center gap-4 border-b border-zinc-800 p-6 sm:p-8">
			<div class="flex h-10 w-10 shrink-0 items-center justify-center bg-zinc-800 text-zinc-300 text-lg font-bold">
				→
			</div>
			<div class="min-w-0">
				<h1 class="text-xl font-bold text-white sm:text-2xl">{post.title}</h1>
				<a
					href={post.url}
					target="_blank"
					rel="noopener noreferrer"
					class="mt-0.5 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-[#00ff88] transition-colors"
					onclick={(e) => e.stopPropagation()}
				>
					{domain} ↗
				</a>
			</div>
		</div>

		<div class="p-6 sm:p-8">
			<div class="mb-2 text-xs text-zinc-400">// {formatFullDate(post.timestamp)}</div>

			{#if post.description}
				<p class="mb-8 font-sans text-base leading-relaxed text-zinc-200">{post.description}</p>
			{/if}

			<a
				href={post.url}
				target="_blank"
				rel="noopener noreferrer"
				class="mb-8 flex w-full items-center justify-center gap-2 border border-zinc-700 px-6 py-3.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-[#00ff88]/50 hover:text-[#00ff88]"
			>
				→ visit {domain}
			</a>

			<div class="flex items-center justify-between border-t border-zinc-800 pt-6">
				<div class="flex items-center gap-3">
					<Avatar name={post.author.name} size="md" />
					<div>
						<p class="text-sm font-semibold text-zinc-200">shared by {post.author.name}</p>
						<p class="text-xs text-zinc-400">// {formatFullDate(post.timestamp)}</p>
					</div>
				</div>
				<LikeButton postId={post.id} initialLikes={post.likes} size="lg" />
			</div>
		</div>
	</div>

	<CommentSection postId={post.id} postType="mouse-clicks" initialComments={comments} />
</div>
