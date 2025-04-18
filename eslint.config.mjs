// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        tsconfigRootDir: new URL('.', import.meta.url).pathname, // Use `import.meta.url` for path
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // If you really need to allow `any`, otherwise consider using `warn` or `error`
      '@typescript-eslint/no-floating-promises': 'warn', // Adjust to 'error' if you want stricter linting
      '@typescript-eslint/no-unsafe-argument': 'warn', // Same as above
    },
  },
);
