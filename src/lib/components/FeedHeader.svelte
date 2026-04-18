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
		<h1 class="text-3xl font-bold text-white">
			<span class="text-zinc-600 select-none mr-1">#</span>{title}
		</h1>
		<p class="mt-1 font-sans text-sm text-zinc-400">{subtitle}</p>
	</div>

	<div class="relative">
		<span class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 select-none text-sm">›</span>
		<input
			type="text"
			placeholder="search..."
			bind:value={searchQuery}
			class="w-full border border-zinc-800 bg-zinc-900 py-2 pl-8 pr-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-[#00ff88]/40"
		/>
	</div>
</div>
