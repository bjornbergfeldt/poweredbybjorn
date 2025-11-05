/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BASE_PATH?: string;
	readonly BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
	readonly glob: <T = unknown>(
		pattern: string,
		options?: {
			eager?: boolean;
			as?: string;
			import?: string;
		}
	) => Record<string, T>;
}

