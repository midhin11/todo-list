import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module", // 👈 THIS is the fix
      globals: {
        ...js.environments.browser.globals,
      },
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
  },
]);