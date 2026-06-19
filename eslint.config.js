import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  // 1. REGRA DE OURO: Ignorar pastas de terceiros e relatórios
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "mochawesome-report/**"
    ]
  },
  // 2. Configurações Globais unificadas com as regras recomendadas
  {
    files: ["**/*.js"],
    languageOptions: { 
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.mocha
      }
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Traz as regras recomendadas de forma segura
      "no-unused-vars": "warn",              // Transforma erros em avisos (não quebra o build)
      "no-undef": "warn"                     // Transforma variáveis indefinidas em avisos
    }
  }
];