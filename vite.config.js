import stylex from '@stylexjs/rollup-plugin';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

import packageJson from './package.json';

// Define the banner
const banner = `/**
 * ${packageJson.name} v${packageJson.version}
 * Copyright (c) ${new Date().getFullYear()} ${packageJson.author}
 * This software is released under the ${packageJson.license} license.
 */`;

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts', // Specifies the entry point for building the library.
      name: packageJson.name, // Sets the name of the generated library.
      fileName: format => `index.${format}.js`, // Generates the output file name based on the format.
      formats: ['cjs', 'es'], // Specifies the output formats (CommonJS and ES modules).
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)], // Defines external dependencies for Rollup bundling.
      output: {
        banner,
      },
    },
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
  },
  plugins: [
    dts(), // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
    stylex({
      classNamePrefix: `${packageJson.name.replace(/[^a-zA-Z0-9-_]/g, '')}-`, // Sets the prefix for generated class names.
      fileName: 'stylex.module.css', // Sets the name of the generated CSS file.
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
