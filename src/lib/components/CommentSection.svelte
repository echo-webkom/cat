<script lang="ts">
  import type { Comment } from '$lib/types.js'
  import { commentStore } from '$lib/store.svelte.js'
  import { formatRelativeTime } from '$lib/utils.js'
  import Avatar from './Avatar.svelte'

  let {
    postId,
    postType,
    initialComments,
  }: { postId: string; postType: 'cat-food' | 'mouse-clicks'; initialComments: Comment[] } =
    $props()

  let authorName = $state('')
  let body = $state('')
  let submitting = $state(false)

  const newComments = $derived(commentStore.getNew(postId))
  const allComments = $derived([...initialComments, ...newComments])

  function submit(e: Event) {
    e.preventDefault()
    if (!authorName.trim() || !body.trim()) return
    submitting = true

    commentStore.add(postId, {
      id: `new-${Date.now()}`,
      postId,
      postType,
      author: { id: 'guest', name: authorName.trim(), role: 'student' },
      body: body.trim(),
      timestamp: new Date().toISOString(),
    })

    body = ''
    submitting = false
  }
</script>

<section class="mt-10 border-t border-zinc-800 pt-8">
  <h2 class="mb-6 text-base font-bold text-white">
    <span class="text-zinc-600 select-none mr-1">#</span>comments
    <span class="ml-2 text-sm font-normal text-zinc-600">({allComments.length})</span>
  </h2>

  <div class="mb-8 flex flex-col gap-4">
    {#each allComments as comment (comment.id)}
      <div class="flex gap-3">
        <Avatar name={comment.author.name} size="sm" />
        <div class="flex-1 border border-zinc-800 bg-zinc-900 p-4">
          <div class="mb-2 flex items-center gap-2">
            <span class="text-sm font-semibold text-zinc-100">{comment.author.name}</span>
            <span class="text-zinc-700">//</span>
            <span class="text-xs text-zinc-400">{formatRelativeTime(comment.timestamp)}</span>
          </div>
          <p class="font-sans text-sm leading-relaxed text-zinc-300">{comment.body}</p>
        </div>
      </div>
    {:else}
      <p class="text-sm text-zinc-600">// no comments yet</p>
    {/each}
  </div>

  <form onsubmit={submit} class="flex flex-col gap-3">
    <p class="text-sm font-bold text-zinc-400">
      <span class="text-zinc-600 select-none mr-1">#</span>add comment
    </p>
    <input
      type="text"
      placeholder="your name"
      bind:value={authorName}
      required
      class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
    />
    <textarea
      placeholder="write a comment..."
      bind:value={body}
      required
      rows="4"
      class="resize-none border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
    ></textarea>
    <div class="flex justify-end">
      <button
        type="submit"
        disabled={submitting || !authorName.trim() || !body.trim()}
        class="border border-zinc-700 px-5 py-2 text-sm text-zinc-300 transition-colors hover:border-[#00ff88]/50 hover:text-[#00ff88] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        [ post comment ]
      </button>
    </div>
  </form>
</section>
