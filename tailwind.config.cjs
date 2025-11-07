/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{ts,tsx}"
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
			},
			backgroundColor: {
				dark: '#111827', // A slightly lighter dark background (equivalent to gray-900)
			},
		}
	},
	plugins: [
		require('@tailwindcss/typography')
	]
};

