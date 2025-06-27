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
 * Returns `true` iff `value` is a finite number, +/- `Infinity`, or `NaN`.
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isNumberLike(value) {
  return typeof value === "number" || isBigInt(value);
}

/**
 * Returns `true` iff `value` is a finite number.
 *
 * ## Special cases
 *
 * ### Includes
 *
 * - `BigInt`
 *
 * ### Excludes
 *
 * - `NaN`
 * - +/- `Infinity`
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isNumber(value) {
  return (
    (typeof value === "number" && Number.isFinite(value)) || isBigInt(value)
  );
}

/**
 * Returns `true` iff `value` is an integer, or a floating point number that
 * can be represented as an integer.
 *
 * ## Special cases
 *
 * ### Includes
 *
 * - `BigInt`
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#description
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

/**
 * Returns `true` iff `value` is finite. That is, a number or integer
 * (including `BigInt`s) that's not `NaN` or +/= `Infinity`.
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isFinite(value) {
  return Number.isFinite(value) || isBigInt(value);
}

/**
 * Returns `true` iff `value` is +/= `Infinity`.
 *
 * ## Special cases
 *
 * ### Excludes
 *
 * - `NaN`
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isInfinite(value) {
  return value === Infinity || value === -Infinity;
}

/**
 * Returns `true` iff `value` is equivalent to `NaN`.
 *
 * Always use this function for comparisons involving `NaN` instead of `==` or
 * `===`, because those operators always return false if one of the operands is
 * `NaN`.
 *
 * Non number-like values will always return `false`, even if those values
 * ordinarily become `NaN` when coerced to a number.
 *
 * Equivalent to built-in `Number.isNaN(value)`.
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
 */
export function isNaN(value) {
  return Number.isNaN(value);
}
