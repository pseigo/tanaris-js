/*!
 * tanaris-js: numbers.js
 * Copyright (c) 2025 Peyton Seigo
 */

/**
 * Utilities for numbers.
 *
 * @showCategories
 *
 * @module Numbers
 */

/**
 * Returns `true` iff `value` is a number or `BigInt`.
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isNumber(value) {
  return typeof value === "number" || isBigInt(value);
}

/**
 * Returns `true` iff `value` is an integer or `BigInt`.
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isInteger(value) {
  return Number.isInteger(value) || isBigInt(value);
}

/**
 * Returns `true` iff `value` is a `BigInt`.
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isBigInt(value) {
  return typeof value === "bigint";
}
