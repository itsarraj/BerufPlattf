import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), reactRouter(), tsconfigPaths()],
  server: {
    port: 9000,
  },
  assetsInclude: ['**/*.ttf', '**/*.otf'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
      '~': path.resolve(__dirname, 'app'),
    },
  },
  // esbuild: {
  //   target: 'es2022',
  // },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     target: 'es2022',
  //   },
  // },

})
