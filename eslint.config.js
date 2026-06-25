import astro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';
import lit from 'eslint-plugin-lit';

export default [
  ...astro.configs.recommended,
  {
    files: ['*.astro', '**/*.astro'],
    languageOptions: {
      parser: (await import('astro-eslint-parser')).default,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {},
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    plugins: { lit },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        customElements: 'readonly',
      },
    },
    rules: {
      'import/prefer-default-export': 'off',
    },
  },
];
