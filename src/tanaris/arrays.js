/*!
 * tanaris-js: arrays.js
 * Copyright (c) 2025 Peyton Seigo
 */

import { isString } from "/tanaris/strings.js";

/**
 * Returns `true` iff `value` is an array containing zero or more strings.
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isStringArray(value) {
  return Array.isArray(value) && value.every((e) => isString(e));
}

/**
 * Wraps the argument in an array if it is not already an array.
 *
 * @example `wrap(1) // => [1]`
 * @example `wrap([1]) // => [1]`
 *
 * @param {(Exclude<any, Array> | Array)} elementOrArray
 *
 * @returns {Array}
 */
export function wrap(elementOrArray) {
  if (Array.isArray(elementOrArray)) {
    return elementOrArray;
  }

  return [elementOrArray];
}

/**
 * Returns a new array containing all the elements from `array`, but `withElement` in between each one.
 *
 * @example
 * ```js
 * import { intersperse } from "tanaris/arrays";
 *
 * const nums = [1, 2, 3];
 * const interspersed = intersperse(nums, ", ");
 * const prettyStr = interspersed.reduce((acc, e) => acc + e, "");
 *
 * console.log(interspersed); //=> [1, ", ", 2, ", ", 3]
 * console.log(prettyStr);    //=> "1, 2, 3"
 * ```
 *
 * @param {Array} array
 * @param {any} withElement
 *
 * @returns {Array}
 */
export function intersperse(array, withElement) {
  const interspersedArray = [];

  for (let i = 0; i < array.length; i++) {
    interspersedArray.push(array[i]);
    interspersedArray.push(withElement);
  }

  if (interspersedArray.length !== 0) {
    interspersedArray.pop();
  }

  return interspersedArray;
}
