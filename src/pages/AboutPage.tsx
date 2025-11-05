import { Link } from 'react-router-dom';

export function AboutPage() {
	return (
		<div className="prose dark:prose-invert max-w-none">
			<Link to="/" className="text-sm text-neutral-500 mb-6 inline-block">
				← Back to articles
			</Link>
			
			<h1>About Me</h1>
			
			<div className="space-y-6">
				<p className="text-lg text-neutral-700 dark:text-neutral-300">
					Welcome! I'm Björn Bergfeldt, and I write about Power Platform, AI, and Data.
				</p>
				
				<section>
					<h2>What I Write About</h2>
					<ul>
						<li><strong>Power Platform</strong> - Solutions, tips, and best practices</li>
						<li><strong>AI</strong> - Integration patterns and practical applications</li>
						<li><strong>Data</strong> - Engineering, analytics, and insights</li>
					</ul>
				</section>
				
				<section>
					<h2>Connect</h2>
					<p>
						Feel free to reach out on{' '}
						<a 
							href="https://linkedin.com/in/yourprofile" 
							target="_blank" 
							rel="noreferrer"
							className="text-neutral-900 dark:text-neutral-100 underline"
						>
							LinkedIn
						</a>
						.
					</p>
				</section>
			</div>
		</div>
	);
}

