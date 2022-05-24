import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import shebang from 'rollup-plugin-preserve-shebang';
import prettier from 'rollup-plugin-prettier';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
  plugins: [typescript(), json(), shebang(), prettier()],
});
