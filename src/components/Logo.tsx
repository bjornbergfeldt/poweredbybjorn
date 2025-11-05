import { Link } from 'react-router-dom';

export function Logo() {
	return (
		<Link to="/" className="flex items-center justify-center">
			<div className="relative group">
				{/* Modern BB logo inside one square */}
				<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0E6BC8] from-30% via-[#9763D2] to-[#9763D2] flex items-center justify-center font-bold text-white text-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
					<span>BB</span>
				</div>
			</div>
		</Link>
	);
}
