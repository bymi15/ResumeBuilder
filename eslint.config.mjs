import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    ignorePatterns: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/scripts/**",
      "src/types/database.types.ts",
    ],
  }),
];

export default eslintConfig;
