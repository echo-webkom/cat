<script lang="ts">
	import { page } from '$app/state';
	import { getContext } from 'svelte';
	import type { User } from '$lib/types';
	import { getAvatarColor, getInitials } from '$lib/utils.js';
    import { enhance } from '$app/forms';

	const feeds = [
		{ href: '/cat-food', label: 'Cat Food' },
		{ href: '/dog-posts', label: 'Dog Posts' },
		{ href: '/mouse-clicks', label: 'Mouse Clicks' }
	];

	function isActive(href: string) {
		return page.url.pathname.startsWith(href);
	}

	const user = getContext<{ current: User | null}>('user');

	let menuOpen = $state(false);
</script>

{#if menuOpen}
	<button
		type="button"
		class="fixed inset-0 z-30"
		onclick={() => (menuOpen = false)}
		tabindex="-1"
		aria-label="Close menu"
	></button>
{/if}

<nav class="sticky top-0 z-50 bg-[#0a0a0a]">
	<div class="mx-auto grid max-w-3xl grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6">
		<a href="/cat-food" class="flex items-center gap-0 py-4 pr-6 shrink-0">
			<span class="text-[#00ff88] font-bold text-base select-none">~/</span>
			<span class="text-lg font-bold tracking-tight text-white">cat</span>
		</a>

		<div class="flex items-center justify-center overflow-x-auto scrollbar-none">
			<div class="flex items-center">
				{#each feeds as feed}
					<a
						href={feed.href}
						class="relative whitespace-nowrap px-3 py-4 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:content-[''] after:transition-transform {isActive(feed.href)
							? 'text-[#00ff88] after:bg-[#00ff88]'
							: 'text-zinc-500 hover:text-zinc-300 after:scale-x-0'}"
					>
						{feed.label}
					</a>
				{/each}
			</div>
		</div>

		<div class="relative z-40 pl-6">
			{#if user.current}
				<button
					type="button"
					class="flex h-8 w-8 items-center justify-center text-xs font-bold text-white transition-opacity hover:opacity-80"
					style="background-color: {getAvatarColor(user.current.name)}"
					onclick={() => (menuOpen = !menuOpen)}
					aria-label="User menu"
				>
					{getInitials(user.current.name)}
				</button>

				{#if menuOpen}
					<div class="absolute right-0 top-full mt-1.5 w-52 overflow-hidden border border-zinc-700 bg-[#0d0d0d] shadow-2xl shadow-black/80">
						<div class="border-b border-zinc-800 px-4 py-3">
							<p class="text-sm font-medium text-white">{user.current.name}</p>
							<p class="text-xs text-zinc-500">{user.current.email}</p>
						</div>
						<div class="p-1">
							<a
								href="/min-profil"
								class="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
								onclick={() => (menuOpen = false)}
							>
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								min profil
							</a>
							<form action="/auth/logg-ut" method="POST" use:enhance>
								<button
									type="submit"
									class="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
								>
									<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
									</svg>
									logg ut
								</button>
							</form>
						</div>
					</div>
				{/if}
			{:else}
				<a
					href="/auth/logg-inn"
					class="text-sm text-zinc-500 transition-colors hover:text-[#00ff88]"
				>
					logg inn
				</a>
			{/if}
		</div>
	</div>
</nav>
