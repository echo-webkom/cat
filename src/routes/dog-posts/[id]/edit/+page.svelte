<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import type { DogPost } from '$lib/types.js'
  import { postStore } from '$lib/store.svelte.js'
  import dogPostsData from '$lib/data/dog-posts.json'
  import TipTapEditor from '$lib/components/TipTapEditor.svelte'

  const id = $derived($page.params.id!)

  const source = $derived(
    (postStore.getOverride(id) ??
      postStore.findById(id) ??
      (dogPostsData as DogPost[]).find((p) => p.id === id)) as DogPost | undefined,
  )

  let title = $state('')
  let tagline = $state('')
  let body = $state('')
  let isImportant = $state(false)
  let initialised = $state(false)

  $effect(() => {
    if (source && !initialised) {
      title = source.title
      tagline = source.tagline
      body = source.body
      isImportant = source.tags.includes('important')
      initialised = true
    }
  })

  const valid = $derived(
    title.trim().length > 0 && tagline.trim().length > 0 && body.trim().length > 0,
  )

  function submit(e: Event) {
    e.preventDefault()
    if (!valid || !source) return

    postStore.update(id, {
      ...source,
      title: title.trim(),
      tagline: tagline.trim(),
      body,
      tags: isImportant ? ['important'] : source.tags.filter((t) => t !== 'important'),
    })

    goto(`/dog-posts/${id}`)
  }
</script>

<svelte:head>
  <title>Edit Post — Cat</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 sm:px-6">
  <div class="mb-6 flex items-center justify-between">
    <a href="/dog-posts/{id}" class="text-sm text-zinc-400 transition-colors hover:text-white">
      ← back
    </a>
  </div>

  <h1 class="mb-8 text-3xl font-bold text-white">
    <span class="mr-1 select-none text-zinc-600">#</span>edit announcement
  </h1>

  {#if source}
    <form onsubmit={submit} class="flex flex-col gap-5">
      <div class="flex flex-col gap-1.5">
        <label for="dp-edit-title" class="text-xs text-zinc-400"
          >title <span class="text-zinc-600">*</span></label
        >
        <input
          id="dp-edit-title"
          type="text"
          bind:value={title}
          required
          class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="dp-edit-tagline" class="text-xs text-zinc-400"
          >tagline <span class="text-zinc-600">*</span></label
        >
        <input
          id="dp-edit-tagline"
          type="text"
          bind:value={tagline}
          required
          class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <p class="text-xs text-zinc-400">body <span class="text-zinc-600">*</span></p>
        {#if initialised}
          <TipTapEditor
            content={source.body}
            minHeight="260px"
            onchange={(html) => (body = html)}
          />
        {/if}
      </div>

      <label class="flex cursor-pointer items-center gap-3 self-start">
        <div class="relative flex items-center">
          <input type="checkbox" bind:checked={isImportant} class="peer sr-only" />
          <div
            class="h-4 w-4 border border-zinc-700 bg-zinc-900 transition-colors peer-checked:border-red-500/50 peer-checked:bg-red-500/10"
          ></div>
          <div
            class="pointer-events-none absolute inset-0 hidden items-center justify-center peer-checked:flex"
          >
            <span class="text-[10px] text-red-400 leading-none">✓</span>
          </div>
        </div>
        <span class="text-sm text-zinc-400"
          >mark as <span class="text-red-400">[!] important</span></span
        >
      </label>

      <div class="flex items-center justify-between border-t border-zinc-800 pt-4">
        <a
          href="/dog-posts/{id}"
          class="text-sm text-zinc-500 transition-colors hover:text-zinc-200"
        >
          [ cancel ]
        </a>
        <button
          type="submit"
          disabled={!valid}
          class="border border-zinc-700 px-6 py-2 text-sm text-zinc-300 transition-colors hover:border-[#00ff88]/50 hover:text-[#00ff88] disabled:cursor-not-allowed disabled:opacity-30"
        >
          [ save changes ]
        </button>
      </div>
    </form>
  {:else}
    <p class="text-zinc-500">// post not found</p>
  {/if}
</div>
