import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Buffer } from 'buffer';
import App from './App';
import './styles.css';

// Polyfill Buffer for gray-matter
(window as any).Buffer = Buffer;
(globalThis as any).Buffer = Buffer;

// Get base path from Vite config (for GitHub Pages deployment)
const base = import.meta.env.BASE_URL;

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<BrowserRouter basename={base}>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);

