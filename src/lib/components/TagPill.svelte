<script lang="ts">
  let {
    tag,
    active = false,
    onclick,
  }: { tag: string; active?: boolean; onclick?: () => void } = $props()
</script>

<button
  type="button"
  class="rounded-full px-3 py-1 text-xs font-medium transition-colors {active
    ? 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/50'
    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'}"
  {onclick}
>
  {tag}
</button>
