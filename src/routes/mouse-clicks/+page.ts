import type { MouseClick } from '$lib/types.js';
import mouseClicksData from '$lib/data/mouse-clicks.json';

export function load() {
	return { posts: mouseClicksData as MouseClick[] };
}
