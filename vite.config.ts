import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: "node_modules/flag-icons/flags/4x3/*.svg",
                    dest: "node_modules/flag-icons/flags/4x3/",
                },
            ],
        }),
    ],
});
