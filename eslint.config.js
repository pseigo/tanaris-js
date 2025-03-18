// Copyright (c) 2025 Peyton Seigo

import globals from "globals";
//import js from "@eslint/js";
import jest from "eslint-plugin-jest";

const baseLanguageOptions = {
  sourceType: "module",
  ecmaVersion: 2020,
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true
    }
  }
};

const baseRules = {
  "no-unused-vars": ["warn", {
    "argsIgnorePattern": "^_",
    "varsIgnorePattern": "^_"
  }],
  "no-undef": "warn",
};

export default [
  {
    name: "tanaris-config",
    files: [
      "*.config.{js,cjs}",
    ],
    languageOptions: {
      ...baseLanguageOptions,
      globals: {
        ...globals.node
      }
    },
    rules: {...baseRules}
  },
  {
    name: "tanaris-src",
    files: [
      "src/**/*.{js,ts}"
    ],
    languageOptions: {
      ...baseLanguageOptions,
      globals: {
        ...globals.browser,
      }
    },
    rules: {...baseRules}
  },
  {
    name: "tanaris-test",
    files: [
      "test/**/*.{js,ts}"
    ],
    ignores: [],
    languageOptions: {
      ...baseLanguageOptions,
      globals: {
        ...globals.jest,
        ...globals.node
      }
    },
    plugins: {
      jest
    },
    settings: {},
    rules: {
      ...baseRules,

      // [start] Jest
      // - see: https://github.com/jest-community/eslint-plugin-jest/blob/main/README.md#rules
      // Recommended:
      "jest/expect-expect": "warn",
      "jest/no-alias-methods": "warn",
      "jest/no-conditional-expect": "warn",
      "jest/no-deprecated-functions": "warn",
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "warn",
      "jest/no-test-prefixes": "error",
      "jest/no-done-callback": "error",
      "jest/no-export": "error",
      "jest/no-identical-title": "error",
      "jest/no-interpolation-in-snapshots": "error",
      "jest/no-jasmine-globals": "error",
      "jest/no-mocks-import": "error",
      "jest/no-standalone-expect": "error",
      "jest/prefer-to-be": "warn",
      "jest/prefer-to-contain": "warn",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-describe-callback": "error",
      "jest/valid-title": ["error", {ignoreTypeOfTestName: true}],
      "jest/valid-expect": "error",
      "jest/valid-expect-in-promise": "error",
      // Our rules:
      "jest/no-confusing-set-timeout": "warn",
      "jest/no-duplicate-hooks": "warn",
      "jest/no-test-return-statement": "error",
      "jest/prefer-called-with": "warn",
      "jest/prefer-comparison-matcher": "warn",
      "jest/prefer-each": "warn",
      "jest/prefer-equality-matcher": "warn",
      "jest/prefer-expect-resolves": "warn",
      "jest/prefer-mock-promise-shorthand": "warn",
      "jest/prefer-strict-equal": "warn",
      "jest/prefer-todo": "warn"
      // [end] Jest
    }
  }
];
