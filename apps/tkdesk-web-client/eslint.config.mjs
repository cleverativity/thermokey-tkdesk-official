import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

import reactHooks from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'

import prettier from 'eslint-config-prettier'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['vite.config.ts', '.storybook/**/*.js', 'eslint.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
    },
    rules: {
      'require-yield': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-irregular-whitespace': 'off',
      'no-else-return': ['off'],
      'prefer-const': ['off', { ignoreReadBeforeAssign: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      'unused-imports/no-unused-imports': 'error',
      'no-unsafe-optional-chaining': 'off',
      'no-case-declarations': 'off',
      'no-useless-escape': 'off',
      'no-useless-assignment': 'off',

      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    },
  },
  prettier,

  {
    ignores: [
      'node_modules/*',
      'public/*',
      'build/*',
      'cypress/*',
      '**/.eslintrc.js',
      'amplify-codegen-temp/models/models',
    ],
  },
]
