<script lang="ts">
  let {
    searchQuery = $bindable(''),
    newHref,
  }: {
    slug?: string
    searchQuery: string
    newHref?: string
  } = $props()
</script>

<div class="mb-8">
  <div class="mb-5 flex items-start justify-between gap-4">
    {#if newHref}
      <a
        href={newHref}
        class="mt-1 shrink-0 border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-[#00ff88]/40 hover:text-[#00ff88]"
      >
        [ + new ]
      </a>
    {/if}
  </div>

  <div class="relative">
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 select-none text-sm">›</span
    >
    <input
      type="text"
      placeholder="search..."
      bind:value={searchQuery}
      class="w-full border border-zinc-800 bg-zinc-900 py-2 pl-8 pr-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
    />
  </div>
</div>
