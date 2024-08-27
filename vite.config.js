import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import commonjs from '@originjs/vite-plugin-commonjs';
import legacy from '@vitejs/plugin-legacy'; // Ensure this is imported correctly

export default defineConfig({
  plugins: [vue(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  // plugins: [vue(),commonjs()],
  resolve: {
    alias: {
      '@': '/src', // Alias for the src directory
    },
  },
  assetsInclude: ['**/*.JPG'],
});
