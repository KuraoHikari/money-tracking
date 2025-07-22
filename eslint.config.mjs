import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      react: pluginReact,
      "react-hooks": reactHooks,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true,
        JSX: true,
      },
    },

    rules: {
      "no-console": "warn",
      "dot-notation": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "multiline-ternary": "off",
      "no-return-await": "off",
      "no-shadow": "off",
      "react/jsx-closing-tag-location": "off",
      "react/jsx-curly-brace-presence": "off",
      "react/jsx-filename-extension": [
        "error",
        {
          extensions: [".jsx", ".tsx"],
        },
      ],

      "react/jsx-one-expression-per-line": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-wrap-multilines": "off",
      "react/static-property-placement": "off",
      "space-before-function-paren": "off",
      "simple-import-sort/exports": "warn",

      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react"],
            ["^react-native"],
            ["^@?\\w"],
            ["@/(.*)"],
            ["^[./]"],
          ],
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "unused-imports/no-unused-imports": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "spaced-comment": [
        "error",
        "always",
        {
          line: {
            exceptions: ["-", "+"],
            markers: ["=", "!", "#region", "#endregion", "/"],
          },

          block: {
            exceptions: ["-", "+"],
            markers: ["=", "!", "#region", "#endregion", ":", "::"],
            balanced: true,
          },
        },
      ],

      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-shadow": "warn",
      "@typescript-eslint/space-before-function-paren": "off",
      "@typescript-eslint/no-require-imports": "off",
      ...reactHooks.configs.recommended.rules,
    },
  },
];
