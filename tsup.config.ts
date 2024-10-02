import { defineConfig } from "tsup"

export default defineConfig({
  outDir: 'dist',
  target: ['esnext'],
  dts: true,
	entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
	bundle: true,
	splitting: false,
	clean: true
})