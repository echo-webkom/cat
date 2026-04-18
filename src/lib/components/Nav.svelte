<script lang="ts">
	import { page } from '$app/stores';
	import { getAvatarColor, getInitials } from '$lib/utils.js';

	const feeds = [
		{ href: '/cat-food', label: 'Cat Food' },
		{ href: '/dog-posts', label: 'Dog Posts' },
		{ href: '/mouse-clicks', label: 'Mouse Clicks' }
	];

	function isActive(href: string) {
		return $page.url.pathname.startsWith(href);
	}

	const mockUser = { name: 'Magnus Lie', role: 'Student' };

	let menuOpen = $state(false);

	function signOut() {
		menuOpen = false;
	}
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

<nav class="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
	<div class="mx-auto grid max-w-2xl grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6">
		<a href="/cat-food" class="flex items-center gap-2 py-4 pr-6 shrink-0">
			<span class="text-xl font-black tracking-tight text-white">cat</span>
			<span class="hidden rounded bg-zinc-800 px-1.5 py-0.5 text-xs font-semibold text-zinc-400 sm:inline">β</span>
		</a>

		<div class="flex items-center justify-center overflow-x-auto scrollbar-none">
			<div class="flex items-center gap-0.5 sm:gap-1">
				{#each feeds as feed}
					<a
						href={feed.href}
						class="relative whitespace-nowrap px-3 py-4 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:content-[''] {isActive(feed.href)
							? 'text-white after:bg-white'
							: 'text-zinc-500 hover:text-zinc-300 after:scale-x-0'}"
					>
						{feed.label}
					</a>
				{/each}
			</div>
		</div>

		<div class="relative z-40 pl-6">
			<button
				type="button"
				class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80"
				style="background-color: {getAvatarColor(mockUser.name)}"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label="User menu"
			>
				{getInitials(mockUser.name)}
			</button>

			{#if menuOpen}
				<div class="absolute right-0 top-full mt-1.5 w-52 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/50">
					<div class="border-b border-zinc-800 px-4 py-3">
						<p class="text-sm font-medium text-white">{mockUser.name}</p>
						<p class="text-xs text-zinc-400">{mockUser.role}</p>
					</div>
					<div class="p-1">
						<button
							type="button"
							class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
							onclick={signOut}
						>
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
							Sign out
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</nav>
