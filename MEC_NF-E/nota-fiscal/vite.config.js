import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // necessário para o Electron carregar dist/index.html via file://
  server: { port: 5173, strictPort: true },
});
