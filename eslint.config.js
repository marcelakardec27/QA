import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  // 1. REGRA DE OURO: Ignorar pastas de terceiros e builds
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "mochawesome-report/**"
    ]
  },
  // 2. Configurações de ambiente e estilo
  {
    languageOptions: { 
      globals: {
        ...globals.node,
        ...globals.mocha // Adiciona suporte global aos blocos 'describe' e 'it' do Mocha
      }
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  }
];