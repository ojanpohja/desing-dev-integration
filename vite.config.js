import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    base: './', // relative asset URLs -> safest for GitHub Pages
});
