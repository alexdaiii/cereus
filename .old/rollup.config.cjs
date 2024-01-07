import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import {dts} from 'rollup-plugin-dts';

import packageJson from '../package.json';

const banner = `/**
 * ${packageJson.name} v${packageJson.version}
 * Copyright (c) ${new Date().getFullYear()} ${packageJson.author.name}
 * This software is released under the ${packageJson.license} license.
 */`;

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        banner,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        banner,
      },
    ],
    plugins: [
      del({targets: 'dist/*'}),
      resolve(),
      commonjs(),
      typescript({tsconfig: './tsconfig.json'}),
      terser(),
    ],
    external: ['react', 'react-dom'],
    preserveEntrySignatures: false,
  },
  {
    input: 'src/index.ts',
    output: [{file: 'dist/types.d.ts', format: 'es'}],
    plugins: [dts()],
  },
];
