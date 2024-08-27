import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import commonjs from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [vue()],
  // plugins: [vue(),commonjs()],
  resolve: {
    alias: {
      '@': '/src', // Alias for the src directory
    },
  },
  assetsInclude: ['**/*.JPG'],
});
