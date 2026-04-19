<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import type { MouseClick } from '$lib/types.js'
  import { postStore } from '$lib/store.svelte.js'
  import mouseClicksData from '$lib/data/mouse-clicks.json'
  import TipTapEditor from '$lib/components/TipTapEditor.svelte'

  const id = $derived($page.params.id!)

  const source = $derived(
    (postStore.getOverride(id) ??
      postStore.findById(id) ??
      (mouseClicksData as MouseClick[]).find((p) => p.id === id)) as MouseClick | undefined,
  )

  let title = $state('')
  let url = $state('')
  let description = $state('')
  let initialised = $state(false)

  $effect(() => {
    if (source && !initialised) {
      title = source.title
      url = source.url
      description = source.description
      initialised = true
    }
  })

  const valid = $derived(title.trim().length > 0 && url.trim().length > 0)

  function submit(e: Event) {
    e.preventDefault()
    if (!valid || !source) return

    postStore.update(id, {
      ...source,
      title: title.trim(),
      url: url.trim(),
      description,
    })

    goto(`/mouse-clicks/${id}`)
  }
</script>

<svelte:head>
  <title>Edit Link — Cat</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 sm:px-6">
  <div class="mb-6 flex items-center justify-between">
    <a href="/mouse-clicks/{id}" class="text-sm text-zinc-400 transition-colors hover:text-white">
      ← back
    </a>
  </div>

  <h1 class="mb-8 text-3xl font-bold text-white">
    <span class="mr-1 select-none text-zinc-600">#</span>edit link
  </h1>

  {#if source}
    <form onsubmit={submit} class="flex flex-col gap-5">
      <div class="flex flex-col gap-1.5">
        <label for="mc-edit-title" class="text-xs text-zinc-400"
          >title <span class="text-zinc-600">*</span></label
        >
        <input
          id="mc-edit-title"
          type="text"
          bind:value={title}
          required
          class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="mc-edit-url" class="text-xs text-zinc-400"
          >url <span class="text-zinc-600">*</span></label
        >
        <input
          id="mc-edit-url"
          type="url"
          bind:value={url}
          required
          class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <p class="text-xs text-zinc-400">description <span class="text-zinc-600">optional</span></p>
        {#if initialised}
          <TipTapEditor
            content={source.description}
            minHeight="160px"
            onchange={(html) => (description = html)}
          />
        {/if}
      </div>

      <div class="flex items-center justify-between border-t border-zinc-800 pt-4">
        <a
          href="/mouse-clicks/{id}"
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
    <p class="text-zinc-500">// link not found</p>
  {/if}
</div>
