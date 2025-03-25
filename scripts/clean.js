// Copyright (c) 2025 Peyton Seigo

import fs from "node:fs";
import { exit } from "node:process";

const logPrefix = "[tanaris-js][scripts/clean.js]";

/** @type {string[]} */
const pathsToDelete = filterInvalidPaths(["dist", "docs"]);

cleanPaths(pathsToDelete);

/**
 * Returns a copy of `paths` without any that (a) don't exist, (b) the user
 * lacks write permissions for, or (c) are symbolic links.
 *
 * @param {string[]} paths
 *
 * @returns {string[]}
 */
function filterInvalidPaths(paths) {
  if (!isStringArray(paths)) {
    console.error(
      `${logPrefix} Internal error: Paths list is not a string array.`
    );
    exit(1);
  }

  return paths.filter((path) => {
    // (a) Path is visible?
    try {
      fs.accessSync(path, fs.constants.F_OK);
    } catch {
      return false;
    }

    // (b) Path is writable?
    try {
      fs.accessSync(path, fs.constants.F_OK | fs.constants.W_OK);
    } catch {
      console.warn(
        `${logPrefix} Don't have WRITE permission for path '${path}'. Skipping.`
      );
      return false;
    }

    // (c) Path is not a symbolic link?
    const stats = fs.lstatSync(path);

    if (stats.isSymbolicLink()) {
      console.error(
        `${logPrefix} Path '${path}' is a symbolic link! Skipping in case deletion causes unintentional damage...`
      );
      return false;
    }

    return true;
  });
}

/**
 * Recursively deletes all paths in `paths`.
 *
 * @param {string[]} paths
 */
function cleanPaths(paths) {
  for (const path of paths) {
    fs.rmSync(path, { recursive: true, force: true });
    console.log(`${logPrefix} Deleted '${path}'.`);
  }
}

// ---------------------------------------------------------------------------

// TODO: figure out how to get imports from tanaris working (transitive
//  absolute imports like `import /tanaris/strings.js` aren't resolving).
//
//  `import { isStringArray } from "tanaris/arrays.js";`

/**
 * Returns `true` iff `value` is an array containing zero or more strings.
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
function isStringArray(value) {
  return Array.isArray(value) && value.every((e) => isString(e));
}

/**
 * Returns `true` iff `value` is a string.
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isString(value) {
  return typeof value === "string";
}
