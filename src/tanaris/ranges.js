/*!
 * tanaris-js: ranges.js
 * Copyright (c) 2025 Peyton Seigo
 */

/**
 * Range-like generators. See examples in function documentation.
 *
 * @showCategories
 *
 * @module Ranges
 */

/**
 * Returns an iterable range for `[lowerBound, upperbound]`.
 *
 * @example
 * ```js
 * inclusiveRange(0, 0).toArray() //=> [0]
 * inclusiveRange(0, 2).toArray() //=> [0, 1, 2]
 * inclusiveRange(-2, 0).toArray() //=> [-2, -1, 0]
 * inclusiveRange(10, 15).toArray() //=> [10, 11, 12, 13, 14, 15]
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
 *
 * @param {number} lowerBound - integer
 * @param {number} upperBound - integer
 *
 * @returns {IteratorObject<number>}
 *
 * @requires `upperBound >= lowerBound`
 * @throws {RangeError} if `upperBound < lowerBound`
 *
 * @throws {TypeError} if `lowerBound` or `upperBound` is not an integer
 */
export function inclusiveRange(lowerBound, upperBound) {
  return createRange(lowerBound, upperBound, upperBound - lowerBound + 1);
}

/**
 * Returns an iterable range for `[lowerBound, upperbound)`.
 *
 * @example
 * ```js
 * exclusiveRange(0, 0).toArray() //=> []
 * exclusiveRange(0, 2).toArray() //=> [0, 1]
 * exclusiveRange(-2, 0).toArray() //=> [-2, -1]
 * exclusiveRange(10, 15).toArray() //=> [10, 11, 12, 13, 14]
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
 *
 * @param {number} lowerBound - integer
 * @param {number} upperBound - integer
 *
 * @returns {IteratorObject<number>}
 *
 * @requires `upperBound >= lowerBound`
 * @throws {RangeError} if `upperBound < lowerBound`
 *
 * @throws {TypeError} if `lowerBound` or `upperBound` is not an integer
 */
export function exclusiveRange(lowerBound, upperBound) {
  return createRange(lowerBound, upperBound, upperBound - lowerBound);
}

/**
 * @param {number} lowerBound - integer
 * @param {number} upperBound - integer
 *
 * @returns {IteratorObject<number>}
 */
function createRange(lowerBound, upperBound, size) {
  if (!Number.isInteger(lowerBound)) {
    throw new TypeError(
      `\`lowerBound\` (\`${lowerBound}\`) must be an integer`
    );
  }
  if (!Number.isInteger(upperBound)) {
    throw new TypeError(
      `\`upperBound\` (\`${upperBound}\`) must be an integer`
    );
  }
  if (upperBound < lowerBound) {
    throw new RangeError(
      `\`upperBound\` (${upperBound}) must be greater than or equal to \`lowerBound\` (${lowerBound})`
    );
  }

  return new Array(size).keys().map((e) => e + lowerBound);
}
