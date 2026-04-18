<script lang="ts">
	import type { PageData } from './$types';
	import type { DogPost } from '$lib/types.js';
	import { formatFullDate } from '$lib/utils.js';
	import { postStore } from '$lib/store.svelte.js';
	import Avatar from '$lib/components/Avatar.svelte';
	import LikeButton from '$lib/components/LikeButton.svelte';

	let { data }: { data: PageData } = $props();
	const post = $derived((data.post ?? postStore.findById(data.id)) as DogPost | undefined);

	const isHtml = $derived(post?.body.trimStart().startsWith('<'));
</script>

<svelte:head>
	<title>{post?.title ?? 'Post'} — Cat</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 sm:px-6">
	<a
		href="/dog-posts"
		class="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
	>
		← dog-posts
	</a>

	{#if post}
		<div class="border border-zinc-800 bg-zinc-900">
			<div class="p-6 sm:p-8">
				{#if post.tags.includes('important')}
					<div class="mb-4 flex items-center gap-1.5 self-start border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-sm font-semibold text-red-400 w-fit">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
						</svg>
						[!] important
					</div>
				{/if}

				<div class="mb-2 text-xs text-zinc-400">// {formatFullDate(post.timestamp)}</div>

				<h1 class="mb-3 text-2xl font-bold text-white sm:text-3xl">{post.title}</h1>
				<p class="mb-6 font-sans text-base text-zinc-400 italic">{post.tagline}</p>

				<div class="mb-8 flex items-center justify-between border-b border-zinc-800 pb-6">
					<div class="flex items-center gap-3">
						<Avatar name={post.author.name} size="md" />
						<div>
							<p class="text-sm font-semibold text-zinc-200">{post.author.name}</p>
							<p class="text-xs text-zinc-400 capitalize">{post.author.role}</p>
						</div>
					</div>
					<LikeButton postId={post.id} initialLikes={post.likes} size="lg" />
				</div>

				{#if isHtml}
					<div class="tiptap-render font-sans leading-relaxed text-zinc-200">
						{@html post.body}
					</div>
				{:else}
					<div>
						{#each post.body.split('\n\n') as paragraph}
							<p class="mb-4 font-sans leading-relaxed text-zinc-200">{paragraph}</p>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<p class="text-zinc-500">// post not found</p>
	{/if}
</div>
