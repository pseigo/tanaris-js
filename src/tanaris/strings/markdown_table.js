/*!
 * tanaris-js: markdown_table.js
 * Copyright (c) 2025 Peyton Seigo
 */

/**
 * Markdown utilities.
 *
 * @see https://daringfireball.net/projects/markdown/
 *
 * @category Markdown
 *
 * @module MarkdownTable
 */

import { exclusiveRange } from "/tanaris/ranges.js";

const k_columnDivider = "|";

// * @param {(number | undefined)} opts.padding? - Defaults to 0.
/**
 * Returns a Markdown table from `rows`.
 *
 * The first sub-array is the header. All rows are rendered in columns
 * according to sub-array indices.
 *
 * @param {string[][]} rows - Table contents in left-to-right row order.
 * @param {object} opts
 *
 * @returns {string}
 */
export function toMarkdownTable(rows, opts) {
  if (rows.length === 0) {
    return "";
  }

  opts = { padding: 0, ...opts };

  const columnContentWidths = calculateColumnContentWidths(rows);

  let rowStrs = [rowToStr(rows[0], columnContentWidths, opts.padding)];

  if (rows.length > 1) {
    rowStrs.push(
      headerSeparatorStr(rows[0].length, columnContentWidths, opts.padding)
    );
  }

  rows.shift();
  rowStrs = [
    ...rowStrs,
    ...rows.map((row) => rowToStr(row, columnContentWidths, opts.padding)),
  ];

  const tableStr = rowStrs.reduce((acc, s) => acc + "\n" + s);
  return tableStr;
}

/**
 * Returns the width in UTF-16 code units each column should allocate for its
 * content according to the column's longest cell.
 *
 * @example `columnWidths([["A", "B"], ["a", "b"]]) //=> [1, 1]`
 * @example `columnWidths([["A", "B"], ["aaa", "b"]]) //=> [3, 1]`
 *
 * @param {string[][]} rows - Table contents in left-to-right row order, where
 *  the first element is the header.
 *
 * @returns {number[]} - integer array
 *
 * @requires All rows have the same iterable length.
 */
const calculateColumnContentWidths = (rows) =>
  rows.reduce(
    (acc, row) =>
      row.map((cell, columnIndex) => Math.max(cell.length, acc[columnIndex])),
    new Array(rows[0]?.length ?? 0).fill(0)
  );

/**
 * @param {string[]} row
 * @param {number[]} contentWidths - integer array
 * @param {number} paddingSize - integer
 *
 * @returns {string}
 */
function rowToStr(row, contentWidths, paddingSize) {
  const padding = " ".repeat(paddingSize);

  return row.reduce((acc, cell, i) => {
    const gap = " ".repeat(contentWidths[i] - cell.length);
    return acc + padding + cell + gap + padding + k_columnDivider;
  }, k_columnDivider);
}

/**
 * @param {number} numColumns - integer
 * @param {number[]} contentWidths - integer array
 * @param {number} paddingSize - integer
 *
 * @returns {string}
 */
function headerSeparatorStr(numColumns, contentWidths, paddingSize) {
  return exclusiveRange(0, numColumns)
    .map((ci) => "-".repeat(contentWidths[ci] + paddingSize * 2))
    .reduce((acc, column) => acc + column + k_columnDivider, k_columnDivider);
}
