import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite serves the app; this plugin supports JSX and React development refresh.
export default defineConfig({ plugins: [react()] });
