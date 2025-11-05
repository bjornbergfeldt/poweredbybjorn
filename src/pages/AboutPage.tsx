import { Link } from 'react-router-dom';

export function AboutPage() {
	return (
		<div className="prose dark:prose-invert max-w-3xl mx-auto">
			<Link to="/" className="text-sm text-neutral-500 mb-6 inline-block">
				← Back
			</Link>
			
			<h1>About Me</h1>
			
			<div className="space-y-6">
				<p className="text-lg text-neutral-700 dark:text-neutral-300">
					Hey👋 I’m <strong>Björn Bergfeldt</strong>. I live in Sweden and work as a consultant at Sopra Steria, where I get to solve real-world problems using Power Platform, AI, and Data. I love exploring these tools not just as technologies, but as ways to make work and life a little smarter and more efficient.
				</p>
				<p className="text-lg text-neutral-700 dark:text-neutral-300">
					On this blog, I share what I’m learning, experimenting with, and my key lessons along the way.
				</p>
				
				<section>
					<h2>What I Write About</h2>
					<ul>
						<li><strong>Power Platform</strong> - Solutions, tips, and best practices, and where the platform is heading</li>
						<li><strong>AI</strong> - Generative AI, Agents, everything from Copilot Studio to Azure AI Foundry</li>
						<li><strong>Data</strong> - Foundational data concepts, data visualization and reporting mainly focused on Power BI</li>
					</ul>
				</section>
				
				<section>
					<h2>Connect</h2>
					<p>
						Feel free to reach out on{' '}
						<a 
							href="https://linkedin.com/in/bjornbergfeldt" 
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

