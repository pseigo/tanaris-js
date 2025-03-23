/*!
 * tanaris-js: strings.js
 * Copyright (c) 2025 Peyton Seigo
 */

/**
 * Returns `true` iff `value` is a string.
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
 * @param {String} str
 *
 * @returns {String}
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @returns {String}
 */
export function randomLowerAlphaNumericString() {
  return Math.random().toString(36).slice(2);
}
