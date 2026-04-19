<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import type { CatFoodPost } from '$lib/types.js'
  import { postStore } from '$lib/store.svelte.js'
  import catFoodData from '$lib/data/cat-food.json'
  import TipTapEditor from '$lib/components/TipTapEditor.svelte'

  const id = $derived($page.params.id!)

  const source = $derived(
    (postStore.getOverride(id) ??
      postStore.findById(id) ??
      (catFoodData as CatFoodPost[]).find((p) => p.id === id)) as CatFoodPost | undefined,
  )

  let title = $state('')
  let tagline = $state('')
  let headerImage = $state('')
  let body = $state('')
  let initialised = $state(false)

  $effect(() => {
    if (source && !initialised) {
      title = source.title
      tagline = source.tagline
      headerImage = source.headerImage
      body = source.body
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
      headerImage: headerImage.trim() || source.headerImage,
      body,
    })

    goto(`/cat-food/${id}`)
  }
</script>

<svelte:head>
  <title>Edit Post — Cat</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 sm:px-6">
  <div class="mb-6 flex items-center justify-between">
    <a href="/cat-food/{id}" class="text-sm text-zinc-400 transition-colors hover:text-white">
      ← back
    </a>
  </div>

  <h1 class="mb-8 text-3xl font-bold text-white">
    <span class="mr-1 select-none text-zinc-600">#</span>edit post
  </h1>

  {#if source}
    <form onsubmit={submit} class="flex flex-col gap-5">
      <div class="flex flex-col gap-1.5">
        <label for="cf-edit-title" class="text-xs text-zinc-400"
          >title <span class="text-zinc-600">*</span></label
        >
        <input
          id="cf-edit-title"
          type="text"
          bind:value={title}
          required
          class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="cf-edit-tagline" class="text-xs text-zinc-400"
          >tagline <span class="text-zinc-600">*</span></label
        >
        <input
          id="cf-edit-tagline"
          type="text"
          bind:value={tagline}
          required
          class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="cf-edit-image" class="text-xs text-zinc-400">header image url</label>
        <input
          id="cf-edit-image"
          type="url"
          bind:value={headerImage}
          class="border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <p class="text-xs text-zinc-400">body <span class="text-zinc-600">*</span></p>
        {#if initialised}
          <TipTapEditor
            content={source.body}
            minHeight="300px"
            onchange={(html) => (body = html)}
          />
        {/if}
      </div>

      <div class="flex items-center justify-between border-t border-zinc-800 pt-4">
        <a
          href="/cat-food/{id}"
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
