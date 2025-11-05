import { Route, Routes, useLocation } from 'react-router-dom';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { useEffect, useState } from 'react';
import { Moon, Sun, Linkedin } from 'lucide-react';
import { Logo } from './components/Logo';

function useDarkMode(): [boolean, () => void] {
	const [enabled, setEnabled] = useState(() => {
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	});
	useEffect(() => {
		const root = document.documentElement;
		if (enabled) root.classList.add('dark'); else root.classList.remove('dark');
	}, [enabled]);
	return [enabled, () => setEnabled(v => !v)];
}

export default function App() {
	const [dark, toggleDark] = useDarkMode();
	const location = useLocation();
	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, [location.pathname]);

	return (
		<div className="min-h-screen">
			<header className="border-b border-neutral-200 dark:border-neutral-800 sticky top-0 backdrop-blur bg-white/70 dark:bg-neutral-950/60">
				<div className="container flex items-center justify-between py-4">
					<Logo />
					<div className="flex items-center gap-3">
					<a className="btn" href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
						<Linkedin className="w-5 h-5" />
					</a>
					<button className="btn" onClick={toggleDark} aria-label="Toggle dark mode">
						{dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
					</button>
					</div>
				</div>
			</header>
			<main className="container py-8">
				<Routes>
					<Route path="/" element={<BlogListPage />} />
					<Route path="/post/:slug" element={<BlogPostPage />} />
					<Route path="*" element={<div>Not Found</div>} />
				</Routes>
			</main>
			<footer className="container py-10 text-sm text-neutral-500">
				© {new Date().getFullYear()} | Björn Bergfeldt
			</footer>
		</div>
	);
}

