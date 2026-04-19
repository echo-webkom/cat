<script lang="ts">
  import type { PageData } from './$types'
  import PostCard from '$lib/components/PostCard.svelte'
  import FeedHeader from '$lib/components/FeedHeader.svelte'
  import { postStore } from '$lib/store.svelte.js'

  let { data }: { data: PageData } = $props()

  let searchQuery = $state('')

  const allPosts = $derived([
    ...postStore.getCatFood(),
    ...data.posts.map((p) => (postStore.getOverride(p.id) ?? p) as typeof p),
  ])

  const filteredPosts = $derived(() => {
    if (!searchQuery.trim()) return allPosts
    const q = searchQuery.toLowerCase()
    return allPosts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q),
    )
  })
</script>

<svelte:head>
  <title>Cat Food — Cat</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 sm:px-6">
  <FeedHeader
    title="Cat Food"
    subtitle="Fresh posts from the community"
    bind:searchQuery
    newHref="/cat-food/new"
  />

  {#if filteredPosts().length === 0}
    <div class="flex flex-col items-center py-20 text-center">
      <p class="text-zinc-400">No posts found.</p>
      <button
        type="button"
        class="mt-3 text-sm text-zinc-300 hover:text-white"
        onclick={() => {
          searchQuery = ''
        }}
      >
        Clear search
      </button>
    </div>
  {:else}
    <div class="flex flex-col gap-4">
      {#each filteredPosts() as post (post.id)}
        <PostCard {post} />
      {/each}
    </div>
  {/if}
</div>
