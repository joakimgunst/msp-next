import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier/recommended';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  {
    ignores: ['.next'],
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
  prettier,
];
