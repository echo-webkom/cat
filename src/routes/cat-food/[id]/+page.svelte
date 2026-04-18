<script lang="ts">
	import type { PageData } from './$types';
	import { formatFullDate } from '$lib/utils.js';
	import Avatar from '$lib/components/Avatar.svelte';
	import LikeButton from '$lib/components/LikeButton.svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
	const comments = $derived(data.comments);
</script>

<svelte:head>
	<title>{post.title} — Cat</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 sm:px-6">
	<a
		href="/cat-food"
		class="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
	>
		← cat-food
	</a>

	<div class="overflow-hidden border border-zinc-800 bg-zinc-900">
		<img
			src={post.headerImage}
			alt={post.title}
			class="aspect-[21/9] w-full object-cover"
		/>

		<div class="p-6 sm:p-8">
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

			<div>
				{#each post.body.split('\n\n') as paragraph}
					<p class="mb-4 font-sans leading-relaxed text-zinc-200">{paragraph}</p>
				{/each}
			</div>
		</div>
	</div>

	<CommentSection postId={post.id} postType="cat-food" initialComments={comments} />
</div>
