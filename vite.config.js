import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid';
import wasm from 'vite-plugin-wasm'

export default defineConfig({
	plugins: [
		solidPlugin(),
		wasm()
	],
	base: "/parking-lot",
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
		outDir: 'docs',
		emptyOutDir: true,
		rollupOptions: {
			input: "SidePanel.html"
		}
	}
})
