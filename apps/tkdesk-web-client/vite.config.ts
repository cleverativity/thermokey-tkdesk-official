import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig, loadEnv } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const enableSourceMaps = env.GENERATE_SOURCEMAP !== 'false'

  return {
    plugins: [
      react(),
      nodePolyfills({
        include: [
          'buffer',
          'crypto',
          'process',
          'querystring',
          'stream',
          'url',
        ],
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
        protocolImports: true,
      }),
      ...(env.SENTRY_AUTH_TOKEN
        ? [
            sentryVitePlugin({
              authToken: env.SENTRY_AUTH_TOKEN,
              org: env.SENTRY_ORG || 'archeido',
              project: env.SENTRY_PROJECT || 'tkcc-web-client',
              sourcemaps: {
                assets: './build/**',
              },
              telemetry: false,
            }),
          ]
        : []),
    ],
    resolve: {
      tsconfigPaths: true,
    },
    define: {
      global: 'globalThis',
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
    },
    build: {
      outDir: 'build',
      sourcemap: enableSourceMaps,
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  }
})
