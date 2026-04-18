<script lang="ts">
	import { env } from '$env/dynamic/public';

	const loginUrl = `${env.PUBLIC_UNO_BASE_URL}/auth/feide?site=cat`;
</script>

<div class="mx-auto max-w-sm px-4 py-16">
	<div class="mb-8 text-center">
		<span class="text-[#00ff88] font-bold text-2xl select-none">~/</span>
		<h1 class="text-2xl font-bold tracking-tight text-white inline">logg inn</h1>
	</div>

	<form class="space-y-4" onsubmit={(e) => e.preventDefault()}>
		<a
			href={loginUrl}
			class="w-full block rounded bg-[#00ff88] px-3 py-2 text-center text-sm font-semibold text-black transition-opacity hover:opacity-90"
		>
			logg inn
		</a>
	</form>
</div>
