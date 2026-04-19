<script lang="ts">
  import type { PageData } from './$types'
  import type { CatFoodPost } from '$lib/types.js'
  import { formatFullDate } from '$lib/utils.js'
  import { postStore } from '$lib/store.svelte.js'
  import Avatar from '$lib/components/Avatar.svelte'
  import LikeButton from '$lib/components/LikeButton.svelte'
  import CommentSection from '$lib/components/CommentSection.svelte'

  let { data }: { data: PageData } = $props()
  const post = $derived(
    (data.post ? (postStore.getOverride(data.id) ?? data.post) : postStore.findById(data.id)) as
      | CatFoodPost
      | undefined,
  )
  const comments = $derived(data.comments)

  const isHtml = $derived(post?.body.trimStart().startsWith('<'))
</script>

<svelte:head>
  <title>{post?.title ?? 'Post'} — Cat</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 sm:px-6">
  <div class="mb-6 flex items-center justify-between">
    <a href="/cat-food" class="text-sm text-zinc-400 transition-colors hover:text-white">
      ← cat-food
    </a>
    <a
      href="/cat-food/{data.id}/edit"
      class="text-xs text-zinc-500 transition-colors hover:text-zinc-200"
    >
      [ edit ]
    </a>
  </div>

  {#if post}
    <div class="overflow-hidden border border-zinc-800 bg-zinc-900">
      <img src={post.headerImage} alt={post.title} class="aspect-[21/9] w-full object-cover" />

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

    <CommentSection postId={post.id} postType="cat-food" initialComments={comments} />
  {:else}
    <p class="text-zinc-500">// post not found</p>
  {/if}
</div>
