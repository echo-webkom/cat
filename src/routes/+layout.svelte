<script lang="ts">
  import './layout.css'
  import Nav from '$lib/components/Nav.svelte'
  import { setContext } from 'svelte'

  let { children, data } = $props()

  const userState = $state({
    // svelte-ignore state_referenced_locally
    current: data.user,
  })

  $effect.pre(() => {
    userState.current = data.user
  })

  setContext('user', userState)
</script>

<svelte:head>
  <title>Cat</title>
  <meta name="description" content="The community platform for IT students" />
</svelte:head>

<Nav />

<main class="py-8">
  {@render children()}
</main>
