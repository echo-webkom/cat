<script lang="ts">
	import type { CatFoodPost } from '$lib/types.js';
	import { formatRelativeTime } from '$lib/utils.js';
	import Avatar from './Avatar.svelte';
	import LikeButton from './LikeButton.svelte';

	let { post }: { post: CatFoodPost } = $props();
</script>

<a
	href="/cat-food/{post.id}"
	class="group flex flex-col overflow-hidden border border-zinc-800 bg-zinc-900 transition-colors hover:border-[#00ff88]/30"
>
	<div class="h-44 w-full overflow-hidden bg-zinc-800">
		<img
			src={post.headerImage}
			alt={post.title}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			loading="lazy"
		/>
	</div>

	<div class="flex flex-1 flex-col justify-between gap-3 p-5">
		<div>
			<h3 class="line-clamp-2 text-xl font-bold leading-snug text-white">
				{post.title}
			</h3>
			<p class="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-zinc-400">{post.tagline}</p>
		</div>

		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Avatar name={post.author.name} size="sm" />
				<span class="text-xs text-zinc-400">{post.author.name} // {formatRelativeTime(post.timestamp)}</span>
			</div>
			<LikeButton postId={post.id} initialLikes={post.likes} />
		</div>
	</div>
</a>
