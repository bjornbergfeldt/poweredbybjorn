// Content loader using Vite's import.meta.glob
// Polyfill Buffer before importing gray-matter
import { Buffer } from 'buffer';
if (typeof globalThis.Buffer === 'undefined') {
	(globalThis as any).Buffer = Buffer;
}
if (typeof (globalThis as any).window !== 'undefined' && typeof (globalThis as any).window.Buffer === 'undefined') {
	((globalThis as any).window as any).Buffer = Buffer;
}

import matter from 'gray-matter';

export type PostMeta = {
	title: string;
	description?: string;
	date: string; // ISO date
	tags?: string[];
	slug: string;
	image?: string;
};

export type Post = PostMeta & { content: string };

const postFiles = import.meta.glob('./posts/**/*.md', { as: 'raw', eager: true });

function parseSlugFromPath(path: string): string {
	// Example: ./posts/2025-01-hello-world.md -> 2025-01-hello-world
	const base = path.split('/').pop() || path;
	return base.replace(/\.md$/, '');
}

export const allPosts: Post[] = Object.entries(postFiles)
	.map(([path, raw]) => {
		const { data, content } = matter(String(raw));
		const slug = data.slug || parseSlugFromPath(path);
		return {
			title: data.title ?? slug,
			description: data.description ?? undefined,
			date: data.date ?? new Date().toISOString(),
			tags: data.tags ?? [],
			image: data.image ?? undefined,
			slug,
			content,
		} as Post;
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPostBySlug(slug: string): Post | undefined {
	return allPosts.find(p => p.slug === slug);
}

