<script lang="ts">
	import { getAvatarColor, getInitials } from '$lib/utils.js';

	let { name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' } = $props();

	const sizeClasses = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base' };
</script>

<div
	class="flex shrink-0 items-center justify-center rounded-full font-semibold text-white {sizeClasses[size]}"
	style="background-color: {getAvatarColor(name)}"
	title={name}
>
	{getInitials(name)}
</div>
