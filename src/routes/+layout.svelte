<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Cat</title>
	<meta name="description" content="The community platform for IT students" />
</svelte:head>

<Nav />

<main class="py-8">
	{@render children()}
</main>
