// Copyright © 2024 Navarrotech

import { defineConfig } from 'vite'

// Plugins
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr' // https://www.npmjs.com/package/vite-plugin-svgr

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // React language SWC
    react(),
    // Svgs:
    svgr()
  ]
})
