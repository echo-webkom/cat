export function formatRelativeTime(timestamp: string): string {
	const now = new Date();
	const date = new Date(timestamp);
	const diff = now.getTime() - date.getTime();

	const minutes = Math.floor(diff / 60000);
	const hours = Math.floor(diff / 3600000);
	const days = Math.floor(diff / 86400000);

	if (minutes < 60) return `${minutes}m ago`;
	if (hours < 24) return `${hours}h ago`;
	if (days < 7) return `${days}d ago`;

	return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatFullDate(timestamp: string): string {
	return new Date(timestamp).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

const AVATAR_COLORS = [
	'#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626',
	'#c026d3', '#2563eb', '#65a30d', '#ea580c', '#0d9488'
];

export function getAvatarColor(name: string): string {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function getInitials(name: string): string {
	return name
		.split(' ')
		.slice(0, 2)
		.map((n) => n[0])
		.join('')
		.toUpperCase();
}

export function getDomain(url: string): string {
	try {
		return new URL(url).hostname.replace('www.', '');
	} catch {
		return url;
	}
}

export function getAllTags(posts: Array<{ tags: string[] }>): string[] {
	const set = new Set<string>();
	for (const post of posts) {
		for (const tag of post.tags) set.add(tag);
	}
	return Array.from(set).sort();
}
