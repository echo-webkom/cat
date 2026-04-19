<script lang="ts">
  let {
    title,
    slug,
    subtitle,
    searchQuery = $bindable(''),
    newHref,
  }: {
    title: string
    slug?: string
    subtitle: string
    searchQuery: string
    newHref?: string
  } = $props()
</script>

<div class="mb-8">
  <div class="mb-5 flex items-start justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-white">
        <span class="select-none text-[#00ff88]">$</span>
        <span class="mx-2 text-zinc-500">ls</span>{slug}
      </h1>
      <p class="mt-1 font-sans text-sm text-zinc-400">{subtitle}</p>
    </div>

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
