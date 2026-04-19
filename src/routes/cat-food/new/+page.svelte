<script lang="ts">
  import { goto } from '$app/navigation'
  import { postStore } from '$lib/store.svelte.js'
  import TipTapEditor from '$lib/components/TipTapEditor.svelte'

  let title = $state('')
  let tagline = $state('')
  let headerImage = $state('')
  let body = $state('')
  let submitting = $state(false)

  const valid = $derived(
    title.trim().length > 0 && tagline.trim().length > 0 && body.trim().length > 0,
  )

  function submit(e: Event) {
    e.preventDefault()
    if (!valid || submitting) return
    submitting = true

    const id = `cf-new-${Date.now()}`
    postStore.addCatFood({
      id,
      title: title.trim(),
      tagline: tagline.trim(),
      headerImage: headerImage.trim() || `https://picsum.photos/seed/${id}/1200/500`,
      body,
      tags: [],
      likes: 0,
      timestamp: new Date().toISOString(),
      author: { id: 'u-1', name: 'Magnus Lie', role: 'student' },
    })

    goto('/cat-food')
  }
</script>

<svelte:head>
  <title>New Post — Cat</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 sm:px-6">
  <a
    href="/cat-food"
    class="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
  >
    ← cat-food
  </a>

  <h1 class="mb-8 text-3xl font-bold text-white">
    <span class="mr-1 select-none text-zinc-600">#</span>new post
  </h1>

  <form onsubmit={submit} class="flex flex-col gap-5">
    <div class="flex flex-col gap-1.5">
      <label for="cf-title" class="text-xs text-zinc-400"
        >title <span class="text-zinc-600">*</span></label
      >
      <input
        id="cf-title"
        type="text"
        placeholder="what's your post about?"
        bind:value={title}
        required
        class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
      />
    </div>

    <div class="flex flex-col gap-1.5">
      <label for="cf-tagline" class="text-xs text-zinc-400"
        >tagline <span class="text-zinc-600">*</span></label
      >
      <input
        id="cf-tagline"
        type="text"
        placeholder="one sentence summary"
        bind:value={tagline}
        required
        class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
      />
    </div>

    <div class="flex flex-col gap-1.5">
      <label for="cf-image" class="text-xs text-zinc-400"
        >header image url <span class="text-zinc-600">optional</span></label
      >
      <input
        id="cf-image"
        type="url"
        placeholder="https://... (leave blank for random)"
        bind:value={headerImage}
        class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
      />
    </div>

    <div class="flex flex-col gap-1.5">
      <p class="text-xs text-zinc-400">body <span class="text-zinc-600">*</span></p>
      <TipTapEditor
        placeholder="write your post..."
        minHeight="300px"
        onchange={(html) => (body = html)}
      />
    </div>

    <div class="flex items-center justify-between border-t border-zinc-800 pt-4">
      <a href="/cat-food" class="text-sm text-zinc-500 transition-colors hover:text-zinc-200">
        [ cancel ]
      </a>
      <button
        type="submit"
        disabled={!valid || submitting}
        class="border border-zinc-700 px-6 py-2 text-sm text-zinc-300 transition-colors hover:border-[#00ff88]/50 hover:text-[#00ff88] disabled:cursor-not-allowed disabled:opacity-30"
      >
        [ publish post ]
      </button>
    </div>
  </form>
</div>
