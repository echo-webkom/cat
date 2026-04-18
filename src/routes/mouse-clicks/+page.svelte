<script lang="ts">
	import type { PageData } from './$types';
	import MouseCard from '$lib/components/MouseCard.svelte';
	import FeedHeader from '$lib/components/FeedHeader.svelte';
	import { postStore } from '$lib/store.svelte.js';

	let { data }: { data: PageData } = $props();

	let searchQuery = $state('');

	const allPosts = $derived([...postStore.getMouseClicks(), ...data.posts]);

	const filteredPosts = $derived(() => {
		if (!searchQuery.trim()) return allPosts;
		const q = searchQuery.toLowerCase();
		return allPosts.filter(
			(p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
		);
	});
</script>

<svelte:head>
	<title>Mouse Clicks — Cat</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 sm:px-6">
	<FeedHeader title="Mouse Clicks" subtitle="Links worth sharing — articles, tools, tutorials, and more" bind:searchQuery newHref="/mouse-clicks/new" />

	{#if filteredPosts().length === 0}
		<div class="flex flex-col items-center py-20 text-center">
			<p class="text-zinc-400">No links found.</p>
			<button type="button" class="mt-3 text-sm text-zinc-300 hover:text-white" onclick={() => { searchQuery = ''; }}>
				Clear search
			</button>
		</div>
	{:else}
		<div class="flex flex-col gap-3">
			{#each filteredPosts() as post (post.id)}
				<MouseCard {post} />
			{/each}
		</div>
	{/if}
</div>
