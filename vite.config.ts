import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { name } from "./package.json";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tsconfigPaths()],
  base: command === "build" ? `/${name}` : "/",
}));
