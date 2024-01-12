module.exports = {
  // Specify the environments where the code will run
  env: {
    jest: true, // Enable Jest for testing
    browser: true, // Enable browser environment
  },

  // Stop ESLint from searching for configuration in parent folders
  root: true,

  // Specify the parser for TypeScript (using @typescript-eslint/parser)
  parser: '@typescript-eslint/parser', // Leverages TS ESTree to lint TypeScript

  // Add additional rules and configuration options
  plugins: ['@typescript-eslint', 'unused-imports' , '@next/next'],

  // Extend various ESLint configurations and plugins
  extends: [
    'eslint:recommended', // ESLint recommended rules
    'plugin:react/recommended', // React recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
    'plugin:@typescript-eslint/eslint-recommended', // ESLint overrides for TypeScript
    'prettier', // Prettier rules
    'plugin:prettier/recommended', // Prettier plugin integration
    'plugin:react-hooks/recommended', // Recommended rules for React hooks
    'plugin:storybook/recommended', // Recommended rules for Storybook
    'plugin:@next/next/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': 'warn',
    "@typescript-eslint/no-explicit-any": "warn",
    "no-restricted-globals": ["warn", "window", "document", "navigator"],

  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
