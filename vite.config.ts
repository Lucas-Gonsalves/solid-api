import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    dir: 'src',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/use-cases',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          globalSetup: ['./vitest.e2e.ts'],
          setupFiles: ['./vitest.e2e.ts'],
          fileParallelism: false,
        },
      },
    ],
  },
})
