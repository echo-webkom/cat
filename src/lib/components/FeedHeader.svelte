<script lang="ts">
	let {
		title,
		subtitle,
		searchQuery = $bindable('')
	}: {
		title: string;
		subtitle: string;
		searchQuery: string;
	} = $props();
</script>

<div class="mb-8">
	<div class="mb-5">
		<h1 class="text-3xl font-bold text-white">{title}</h1>
		<p class="mt-1 text-sm text-zinc-400">{subtitle}</p>
	</div>

	<div class="relative">
		<svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" stroke-linecap="round" />
		</svg>
		<input
			type="text"
			placeholder="Search posts..."
			bind:value={searchQuery}
			class="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2 pl-9 pr-4 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500"
		/>
	</div>
</div>
