// Copyright (c) 2025 Peyton Seigo

const entryPoints = [
  "src/tanaris.js",
  "src/tanaris/arrays.js",
  "src/tanaris/date_times.js",
  "src/tanaris/numbers.js",
  "src/tanaris/objects.js",
  "src/tanaris/ranges.js",
  "src/tanaris/strings.js",
  "src/tanaris/strings/markdown_table.js",
  "src/tanaris/testing.js",
  "src/tanaris/testing/jest.js",
];

/**
 * Options for esbuild's build APIs like `build/1`, `context/1`, etc.
 *
 * @see https://esbuild.github.io/api/#build
 *
 * @type {import("esbuild").BuildOptions}
 */
export const buildContextOptions = {
  entryPoints: entryPoints,
  bundle: true,
  outdir: "dist",
  format: "esm",
  target: "es2020",
  platform: "browser",
  legalComments: "eof",
};
