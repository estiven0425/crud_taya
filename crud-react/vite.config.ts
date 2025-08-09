import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "/src/assets/styles/variable" as *;
        @use "/src/assets/styles/mixin" as *;
        @use "/src/assets/styles/function" as *;
      `,
      },
    },
  },
});
