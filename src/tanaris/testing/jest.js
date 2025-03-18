/*
 * Copyright (c) 2025 Peyton Seigo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

// TODO: TypeScript type
/**
 * A 2D array for use with Jest's table APIs.
 *
 * @typedef {[[any]]} JestTable
 *
 * @see https://jestjs.io/docs/api#testeachtablename-fn-timeout
 * @see https://jestjs.io/docs/api#each
 */

export const tableTestName = "[%#] %O";
export const testTimeoutMs = 50;

/**
 * Encloses each element in `xs` in an array for passing into Jest's
 * `test.each`. If some `x` is already `[...]`, it will become `[[...]]`.
 *
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
 * @see https://jestjs.io/docs/api#testeachtablename-fn-timeout
 * @see https://jestjs.io/docs/api#each
 *
 * @param {[any]} xs
 *
 * @returns {JestTable}
 */
export function toTable(xs) {
  return xs.map((x) => [x]);
}
