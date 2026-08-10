import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// El backend ocupa el puerto 3000, así que el cliente se mueve al 3001.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
});
