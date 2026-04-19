<script lang="ts">
  import type { DogPost } from '$lib/types.js'
  import { formatRelativeTime } from '$lib/utils.js'
  import Avatar from './Avatar.svelte'
  import LikeButton from './LikeButton.svelte'

  let { post }: { post: DogPost } = $props()
</script>

<a
  href="/dog-posts/{post.id}"
  class="group flex flex-col gap-3 border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-[#00ff88]/30"
>
  {#if post.tags.includes('important')}
    <div
      class="flex items-center gap-1.5 self-start border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400"
    >
      <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        />
      </svg>
      [!] important
    </div>
  {/if}

  <div>
    <h3 class="line-clamp-2 text-xl font-bold leading-snug text-white">
      {post.title}
    </h3>
    <p class="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-zinc-400">{post.tagline}</p>
  </div>

  <div class="flex items-center justify-between pt-1">
    <div class="flex items-center gap-2">
      <Avatar name={post.author.name} size="sm" />
      <span class="text-xs text-zinc-400"
        >{post.author.name} // {formatRelativeTime(post.timestamp)}</span
      >
    </div>
    <LikeButton postId={post.id} initialLikes={post.likes} />
  </div>
</a>
