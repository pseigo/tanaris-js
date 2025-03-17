/*
 * Copyright (c) 2025 Peyton Seigo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import globals from "globals";
//import js from "@eslint/js";

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
      "src/tanaris/**/*.{js,jsx,ts,tsx}"
    ],
    languageOptions: {
      ...baseLanguageOptions,
      globals: {
        ...globals.browser,
      }
    },
    rules: {...baseRules}
  }
];
