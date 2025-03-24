/*!
 * tanaris-js: strings.js
 * Copyright (c) 2025 Peyton Seigo
 */

/**
 * Utilities for strings.
 *
 * @showCategories
 *
 * @module Strings
 */

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

/**
 * Returns a copy of `str` with the first character uppercased.
 *
 * @example
 * ```js
 * import { capitalize } from "tanaris/strings";
 * console.log(capitalize("hello")); //=> "Hello"
 * console.log(capitalize(""));      //=> ""
 * ```
 *
 * @category Transformers
 *
 * @param {string} str
 *
 * @returns {string}
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generates a short, random, alphanumeric string.
 *
 * @category Generators
 *
 * @returns {string}
 */
export function randomLowerAlphaNumericString() {
  return Math.random().toString(36).slice(2);
}
