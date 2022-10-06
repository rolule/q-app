import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * This is a custom plugin that replaces %VITE_VARIABLE% with .env variables in index.html
 * @param env the env object returned by vite.loadEnv
 * @see https://github.com/vitejs/vite/issues/3105#issuecomment-939703781
 * @returns
 */
const htmlPlugin = (env: ReturnType<typeof loadEnv>) => ({
  name: 'html-transform',
  transformIndexHtml: (html: string) =>
    html.replace(/%(.*?)%/g, (match, p1) => env[p1]),
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.');

  // log environment variables to console
  console.log(`Environment variables`);
  Object.entries(env).forEach(([key, value]) =>
    console.log(`- ${key}=${value}`),
  );
  console.log();

  return {
    plugins: [htmlPlugin(env), react(), tsconfigPaths()],
    build: {
      outDir: 'build/',
    },
  };
});
