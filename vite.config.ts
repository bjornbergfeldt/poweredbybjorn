import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// If deploying to GitHub Pages, set base to "/<repo>/". We'll keep it configurable via env.
const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
	plugins: [react()],
	base,
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	define: {
		'global': 'globalThis',
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis',
			},
		},
	},
});

