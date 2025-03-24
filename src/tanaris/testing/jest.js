/*!
 * tanaris-js: testing/jest.js
 * Copyright (c) 2025 Peyton Seigo
 */

/**
 * Utilities for automated testing with Jest.
 *
 * @module Jest
 *
 * @see https://github.com/jestjs/jest
 * @see https://jestjs.io/
 */

/**
 * @typedef {any[][]} JestTable - A 2D array for use with Jest's table APIs.
 * See {@link toTable} for more context.
 *
 * @see https://jestjs.io/docs/api#testeachtablename-fn-timeout
 * @see https://jestjs.io/docs/api#each
 */

/**
 * A standard name for Jest table test blocks. Looks best with input data that
 * doesn't overflow to the next line when pretty-printed.
 *
 * @example
 * ```js
 * // test/tanaris/strings.test.js (excerpt)
 *
 * import { describe, test, expect } from "@jest/globals";
 * import { tableTestName, testTimeoutMs, toTable } from "tanaris/testing/jest";
 * import { capitalize } from "tanaris/strings";
 *
 * describe("calling `capitalize/1` on a String uppercases its first character", () => {
 *   // prettier-ignore
 *   const stringsAndExpectedResults = toTable([
 *     { str: "", expected: "" },
 *     { str: "a", expected: "A" },
 *     { str: "hello", expected: "Hello" },
 *   ]);
 *
 *   test.each(stringsAndExpectedResults)(
 *     tableTestName,
 *     ({ str, expected }) => {
 *       expect(capitalize(str)).toBe(expected);
 *     },
 *     testTimeoutMs
 *   );
 * });
 * ```
 * ```txt
 * $ npm run test
 * PASS  test/tanaris/strings.test.js
 *  calling `capitalize/1` on a String uppercases its first character
 *    ✓ [0] { str: '', expected: '' }
 *    ✓ [1] { str: 'a', expected: 'A' }
 *    ✓ [2] { str: 'hello', expected: 'Hello' }
 * ```
 *
 * @see https://jestjs.io/docs/api#testeachtablename-fn-timeout
 */
export const tableTestName = "[%#] %O";

/**
 * A standard timeout for Jest table tests. Jest's default is 5000ms (as of
 * v29.7) which seems a bit long for most small unit tests, so this is a bit
 * shorter.
 *
 * @see {@link tableTestName} for example usage.
 * @see https://jestjs.io/docs/api#testeachtablename-fn-timeout
 */
export const testTimeoutMs = 50;

/**
 * Encloses each element in `xs` in an array for passing into Jest's
 * `test.each`. If some `x` is already `[...]`, it will become `[[...]]`.
 *
 * @remarks
 * ## Rationale
 *
 * From the Jest (v29.7) API docs for `test.each`:
 *
 * > If you pass in a 1D array of primitives, internally it will be mapped to a
 * > table i.e. `[1, 2, 3] -> [[1], [2], [3]]`
 * >
 * > -- https://github.com/jestjs/jest/blob/bacb7de30d053cd87181294b0c8a8576632a8b02/website/versioned_docs/version-29.7/GlobalAPI.md#testeachtablename-fn-timeout
 *
 * If your test inputs sometimes have a mix of arrays and non-arrays and you
 * try to pass in `["a", "b" ["c"]]` sometimes and `[["a"], "b", "c"]` other
 * times, Jest might wrap all of your elements in an array to make them table
 * rows, but on the other hand it might instead see one of your elements is an
 * array, assume that means it's already formatted as a row, and then assume
 * the rest of your elements are formatted as rows even if they aren't; this
 * results in... surprising behaviour.
 *
 * A solution? Wrap all of your elements in arrays yourself so you don't have
 * to rely on Jest's guess. But `[[1], 2, 3]` is cleaner and easier to read
 * than `[[[1]], [2], [3]]`. That's where `toTable` comes in:
 * `toTable([[1], 2, 3])` returns `[[[1]], [2], [3]]`.
 *
 * Consider using `toTable` any time you have a mix of arrays and non-arrays in
 * your `test.each` inputs for consistent behaviour from Jest.
 *
 * @see {@link tableTestName} for example usage.
 * @see https://jestjs.io/docs/api#testeachtablename-fn-timeout
 * @see https://jestjs.io/docs/api#each
 *
 * @param {any[]} xs
 *
 * @returns {JestTable}
 */
export function toTable(xs) {
  return xs.map((x) => [x]);
}
