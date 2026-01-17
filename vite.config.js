import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        // Run the React plugin first so it can handle JSX/TSX transforms
        // and inject its preamble before other plugins process the files.
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        tailwindcss(),

    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});

