import baseConfig, { restrictEnvAccess } from "@mooked/eslint-config/base";
import nextjsConfig from "@mooked/eslint-config/nextjs";
import reactConfig from "@mooked/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
