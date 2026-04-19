<script lang="ts">
  import { goto } from '$app/navigation'
  import { postStore } from '$lib/store.svelte.js'
  import TipTapEditor from '$lib/components/TipTapEditor.svelte'

  let title = $state('')
  let url = $state('')
  let description = $state('')
  let submitting = $state(false)

  const valid = $derived(title.trim().length > 0 && url.trim().length > 0)

  function submit(e: Event) {
    e.preventDefault()
    if (!valid || submitting) return
    submitting = true

    postStore.addMouseClick({
      id: `mc-new-${Date.now()}`,
      title: title.trim(),
      url: url.trim(),
      description,
      tags: [],
      likes: 0,
      timestamp: new Date().toISOString(),
      author: { id: 'u-1', name: 'Magnus Lie', role: 'student' },
    })

    goto('/mouse-clicks')
  }
</script>

<svelte:head>
  <title>New Link — Cat</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 sm:px-6">
  <a
    href="/mouse-clicks"
    class="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
  >
    ← mouse-clicks
  </a>

  <h1 class="mb-8 text-3xl font-bold text-white">
    <span class="mr-1 select-none text-zinc-600">#</span>share a link
  </h1>

  <form onsubmit={submit} class="flex flex-col gap-5">
    <div class="flex flex-col gap-1.5">
      <label for="mc-title" class="text-xs text-zinc-400"
        >title <span class="text-zinc-600">*</span></label
      >
      <input
        id="mc-title"
        type="text"
        placeholder="what is this link?"
        bind:value={title}
        required
        class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
      />
    </div>

    <div class="flex flex-col gap-1.5">
      <label for="mc-url" class="text-xs text-zinc-400"
        >url <span class="text-zinc-600">*</span></label
      >
      <input
        id="mc-url"
        type="url"
        placeholder="https://..."
        bind:value={url}
        required
        class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
      />
    </div>

    <div class="flex flex-col gap-1.5">
      <p class="text-xs text-zinc-400">description <span class="text-zinc-600">optional</span></p>
      <TipTapEditor
        placeholder="why is this worth sharing?"
        minHeight="160px"
        onchange={(html) => (description = html)}
      />
    </div>

    <div class="flex items-center justify-between border-t border-zinc-800 pt-4">
      <a href="/mouse-clicks" class="text-sm text-zinc-500 transition-colors hover:text-zinc-200">
        [ cancel ]
      </a>
      <button
        type="submit"
        disabled={!valid || submitting}
        class="border border-zinc-700 px-6 py-2 text-sm text-zinc-300 transition-colors hover:border-[#00ff88]/50 hover:text-[#00ff88] disabled:cursor-not-allowed disabled:opacity-30"
      >
        [ share link ]
      </button>
    </div>
  </form>
</div>
