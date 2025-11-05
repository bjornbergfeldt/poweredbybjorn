import { Link } from 'react-router-dom';
import { allPosts } from '@/content';
import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { author } from '@/config/author';

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
	const words = content.split(/\s+/).length;
	return Math.ceil(words / 200);
}

export function BlogListPage() {
	const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

	// Get all unique tags from all posts
	const allTags = useMemo(() => {
		const tagSet = new Set<string>();
		allPosts.forEach(post => {
			post.tags?.forEach(tag => tagSet.add(tag));
		});
		return Array.from(tagSet).sort();
	}, []);

	// Filter posts based on selected tags
	const filteredPosts = useMemo(() => {
		if (selectedTags.size === 0) return allPosts;
		return allPosts.filter(post => 
			post.tags?.some(tag => selectedTags.has(tag))
		);
	}, [selectedTags]);

	const toggleTag = (tag: string) => {
		setSelectedTags(prev => {
			const next = new Set(prev);
			if (next.has(tag)) {
				next.delete(tag);
			} else {
				next.add(tag);
			}
			return next;
		});
	};

	const clearFilters = () => {
		setSelectedTags(new Set());
	};

	return (
		<div className="space-y-8">
			<div className="flex flex-col items-center text-center space-y-6 py-8">
				<img
					src={author.image}
					alt={author.name}
					className="w-24 h-24 rounded-full object-cover shadow-sm"
				/>
				<div className="space-y-4">
					<h1 className="text-3xl md:text-4xl font-bold leading-relaxed pb-2 bg-gradient-to-br from-[#0E6BC8] from-30% via-[#9763D2] to-[#9763D2] dark:from-[#0E6BC8] dark:from-30% dark:via-[#9763D2] dark:to-[#9763D2] bg-clip-text text-transparent">
						Powered by Björn
					</h1>
					<p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
						Power Platform, AI, and Data — modern insights and practical guides.
					</p>
				</div>
			</div>

			{allTags.length > 0 && (
				<div className="space-y-4">
					<div className="flex items-center gap-2 flex-wrap">
						{allTags.map(tag => {
							const isSelected = selectedTags.has(tag);
							return (
								<button
									key={tag}
									onClick={() => toggleTag(tag)}
									className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
										isSelected
											? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
											: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
									}`}
								>
									{tag}
								</button>
							);
						})}
					</div>
					{selectedTags.size > 0 && (
						<button
							onClick={clearFilters}
							className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
						>
							<X className="w-4 h-4" />
							Clear filters ({selectedTags.size})
						</button>
					)}
				</div>
			)}

			{filteredPosts.length === 0 ? (
				<div className="text-sm text-neutral-500">No articles match the selected tags.</div>
			) : (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredPosts.map(post => {
						const readingTime = calculateReadingTime(post.content);
						const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						});
						
						return (
							<li key={post.slug} className="flex w-full">
								<Link to={`/post/${post.slug}`} className="w-full">
									<article className="card overflow-hidden hover:shadow-lg transition-shadow h-full w-full flex flex-col p-0">
										{post.image && (
											<div className="w-full h-64 overflow-hidden mb-4">
												<img
													src={post.image}
													alt={post.title}
													className="w-full h-full object-cover"
													loading="lazy"
												/>
											</div>
										)}
										<div className="px-5 pb-5 space-y-3 flex-1 flex flex-col">
											<div className="text-sm text-purple-600 dark:text-purple-400">
												<time dateTime={post.date}>{formattedDate}</time>
												<span className="mx-1">·</span>
												<span>{readingTime} min read</span>
											</div>
											
											<h2 className="text-xl font-bold text-purple-900 dark:text-purple-100 hover:text-purple-700 dark:hover:text-purple-200 transition-colors">
												{post.title}
											</h2>
											
											{post.description && (
												<p className="text-neutral-700 dark:text-neutral-300 leading-relaxed flex-1">
													{post.description}
												</p>
											)}
											
											<div className="flex items-center gap-2 pt-2 mt-auto">
												<img
													src={author.image}
													alt={author.name}
													className="w-8 h-8 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
												/>
												<span className="text-sm text-neutral-600 dark:text-neutral-400">{author.name}</span>
											</div>
										</div>
									</article>
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

