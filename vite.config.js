import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({                          // ← 1st: Laravel sets up entry points
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            refresh: true,
        }),
        react(),                           // ← 2nd: React preamble injects correctly
        tailwindcss(),                     // ← 3rd: Tailwind processes CSS
    ],
    server: {
        watch: {
            ignored: ["**/storage/framework/views/**"],
        },
    },
});