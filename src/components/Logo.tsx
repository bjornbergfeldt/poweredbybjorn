import { Link } from 'react-router-dom';

export function Logo() {
	return (
		<Link to="/" className="flex items-center justify-center">
			<div className="relative group">
				{/* Modern BB logo inside one square */}
				<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300 flex items-center justify-center font-bold text-white dark:text-neutral-900 text-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
					<span>BB</span>
				</div>
			</div>
		</Link>
	);
}
