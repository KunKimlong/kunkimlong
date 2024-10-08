import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue(),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': '/src', // Alias for the src directory
    },
  },
  assetsInclude: ['**/*.JPG'],
});
