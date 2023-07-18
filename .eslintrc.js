module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'unused-imports'],
  rules: {
    'max-len': [0, 120, 2, { ignoreUrls: true }],
    'unused-imports/no-unused-imports': 'error',

    'import/prefer-default-export': 'warn',

    'import/extensions': 'off',
    'arrow-body-style': 'off',
    'no-unused-vars': 'off',

    'import/no-unresolved': 'off',
    'object-curly-newline': 'off',
    'max-classes-per-file': 'off',
    'comma-dangle': 'off',
    'no-return-await': 'off',

    indent: 'off',
    'implicit-arrow-linebreak': 'off',
    camelcase: 'off',

    'no-shadow': 'off',
    quotes: 'warn',
    'function-paren-newline': 'warn',
    'func-call-spacing': 'warn',
    'no-spaced-func': 'warn',
  },
  overrides: [
    {
      files: ['src/endpoint/4_models/*.ts'],
      rules: {
        camelcase: 'off',
        // 'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['src/endpoint/2_controllers/*.ts'],
      rules: {
        'consistent-return': 'off',
      },
    },
    {
      files: [
        'src/follow-paris-common/**/*.ts',
        'src/endpoint/3_services/**/*.ts',
        'src/endpoint/2_controllers/**/*.ts',
        'src/tools/**/*.ts',
      ],
      rules: {
        camelcase: 'off',
        'operator-linebreak': 'off',
        'import/prefer-default-export': 'off',
        'dot-notation': 'off',
        // 'import/prefer-default-export': 'off',
      },
    },
  ],
};
