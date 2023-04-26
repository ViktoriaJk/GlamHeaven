import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import dotenv from 'dotenv';
dotenv.config({
  debug: true,
  //override: true,
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
