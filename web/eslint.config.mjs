import globals from "globals";
import pluginJs from "@eslint/js";
import perfectionist from 'eslint-plugin-perfectionist'


/** @type {import('eslint').Linter.Config[]} */


export default [
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
    {
      rules: {
        "no-unused-vars": "warn",
        "no-undef": "warn",
        "perfectionist/sort-imports": "error",

      },
      plugins: {
        perfectionist,
      },
    },
  
];