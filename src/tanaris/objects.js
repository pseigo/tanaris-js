/*!
 * tanaris-js: objects.js
 * Copyright (c) 2025 Peyton Seigo
 */

/**
 * Utilities for objects.
 *
 * @showCategories
 *
 * @module Objects
 */

/**
 * Returns `true` iff `value` is a plain object.
 *
 * A "plain object" is considered to be an object literal like `{a: 1, b: 2}`
 * or an object created with `Object.create`.
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isPlainObject(value) {
  return (
    value !== undefined &&
    value !== null &&
    typeof value === "object" &&
    value.constructor === Object
  );
}

/**
 * Returns `true` iff `value` is an object.
 *
 * An object is considered to be any value where `typeof value === "object"`,
 * except for `null` (even though `typeof null === "object"` for historical
 * reasons).
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isObject(value) {
  return value !== null && typeof value === "object";
}
