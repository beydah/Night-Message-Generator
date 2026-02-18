import { defineConfig } from 'vite'

export default defineConfig({
    // config options
    server: {
        open: true,
        cors: false // Disable permissive CORS to prevent cross-origin attacks
    }
})
