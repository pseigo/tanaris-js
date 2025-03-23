// Copyright (c) 2025 Peyton Seigo

const entryPoints = [
  "src/index.js",
  "src/tanaris/arrays.js",
  "src/tanaris/strings.js",
];

/**
 * Options for esbuild's build APIs like `build/1`, `context/1`, etc.
 *
 * @see https://esbuild.github.io/api/#build
 */
export const buildContextOptions = {
  entryPoints: entryPoints,
  bundle: true,
  outdir: "dist",
  target: "es2020",
  platform: "browser",
  legalComments: "eof",
};
