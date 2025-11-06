import React from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '@/content';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import { Calendar, Tags } from 'lucide-react';
import BackButton from '@/components/BackButton';
import type { Components } from 'react-markdown';
import { visit } from 'unist-util-visit';
import type { Root, Paragraph, Image } from 'mdast';
import { author } from '@/config/author';

// Format date as yyyy-mm-dd
function formatDate(date: string): string {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

// Helper function to fix image paths for GitHub Pages base path
function fixImagePath(src: string | undefined): string {
	if (!src) return '';
	const base = import.meta.env.BASE_URL;
	// If it's already an absolute URL (http/https) or data URI, return as is
	if (src.startsWith('http') || src.startsWith('data:')) {
		return src;
	}
	// If it starts with /, prepend base path
	if (src.startsWith('/')) {
		return `${base}${src.slice(1)}`;
	}
	// Otherwise, assume it's relative and needs base path
	return `${base}${src}`;
}

// Remark plugin to unwrap images from paragraphs
function remarkUnwrapImages() {
	return (tree: Root) => {
		visit(tree, 'paragraph', (node: Paragraph, index: number | undefined, parent: any) => {
			if (
				parent &&
				index !== undefined &&
				node.children.length === 1 &&
				node.children[0].type === 'image'
			) {
				// Replace paragraph containing only an image with the image itself
				parent.children[index] = node.children[0] as Image;
			}
		});
	};
}

// Custom components for markdown rendering
const markdownComponents: Components = {
	img: ({ src, alt, ...props }) => {
		const imageSrc = fixImagePath(src);
		
		return (
			<figure className="my-8">
				<img
					src={imageSrc}
					alt={alt || ''}
					className="w-full rounded-lg shadow-sm"
					loading="lazy"
					{...props}
				/>
				{alt && (
					<figcaption className="mt-2 text-sm text-center text-neutral-600 dark:text-neutral-400 italic">
						{alt}
					</figcaption>
				)}
			</figure>
		);
	},
};

export function BlogPostPage() {
	const { slug } = useParams();
	const post = slug ? getPostBySlug(slug) : undefined;

	if (!post) {
		return (
			<div className="prose dark:prose-invert max-w-none">
				<h1>Post not found</h1>
				<p>
					<BackButton to="/" label="Back to articles" />
				</p>
			</div>
		);
	}

	return (
		<article className="prose dark:prose-invert max-w-3xl mx-auto">
			<p className="mb-6">
				<BackButton to="/" label="Back" />
			</p>
			
			<header className="mb-8 space-y-4">
				{post.image && (
					<img
						src={fixImagePath(post.image)}
						alt={post.title}
						className="w-full h-64 object-cover rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm mb-6"
						loading="eager"
					/>
				)}
				
				<h1 className="!mt-0">{post.title}</h1>
				
				{post.description && (
					<p className="text-lg text-neutral-700 dark:text-neutral-300 !mt-4 !mb-4">
						{post.description}
					</p>
				)}
				
				<div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
					<div className="flex items-center gap-2">
						<img
							src={fixImagePath(author.image)}
							alt={author.name}
							className="w-8 h-8 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
						/>
						<span className="text-neutral-600 dark:text-neutral-400">{author.name}</span>
					</div>
					
					<time dateTime={post.date} className="flex items-center gap-1">
						<Calendar className="w-4 h-4" />
						{formatDate(post.date)}
					</time>
					
					{post.tags && post.tags.length > 0 && (
						<div className="flex items-center gap-2 flex-wrap">
							<Tags className="w-4 h-4" />
							<div className="flex gap-2 flex-wrap">
								{post.tags.map((tag, idx) => (
									<span 
										key={idx}
										className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</header>
			
			<div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
				<ReactMarkdown
					rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }], rehypePrism]}
					remarkPlugins={[remarkGfm, remarkUnwrapImages]}
					components={markdownComponents}
				>
					{post.content}
				</ReactMarkdown>
			</div>
		</article>
	);
}

