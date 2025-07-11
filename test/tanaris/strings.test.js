// Copyright (c) 2025 Peyton Seigo

import { describe, test, expect } from "@jest/globals";

import { tableTestName, testTimeoutMs, toTable } from "/tanaris/testing/jest";

import { exclusiveRange } from "/tanaris/ranges";
import {
  capitalize,
  isString,
  randomLowerAlphaNumericString,
} from "/tanaris/strings";

describe("calling `isString/1`", () => {
  // prettier-ignore
  const strings = toTable([
    "",
    "a",
    "Abc",
    "étude",
    "Ö",
  ]);

  // prettier-ignore
  const nonStrings = toTable([
    97,
    65,
    0,
    -1,
    1.1,
    NaN,
    Infinity,
    -Infinity,
    BigInt(1),
    null,
    undefined,
    true,
    Symbol("bar"),
    {},
    [],
  ]);

  describe("on a String returns `true`", () => {
    test.each(strings)(
      tableTestName,
      (str) => {
        expect(isString(str)).toBe(true);
      },
      testTimeoutMs
    );
  });

  describe("on a non-String returns `false`", () => {
    test.each(nonStrings)(
      tableTestName,
      (value) => {
        expect(isString(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});

describe("calling `capitalize/1` on a String uppercases its first character", () => {
  // prettier-ignore
  const stringsAndExpectedResults = toTable([
    { str: "", expected: "" },
    { str: "a", expected: "A" },
    { str: "ç", expected: "Ç" },
    { str: "hello", expected: "Hello" },
    { str: " hello", expected: " hello" },
    { str: "hello, world!", expected: "Hello, world!" },
    { str: "lorem ipsum dolor", expected: "Lorem ipsum dolor" },
    { str: "étude", expected: "Étude" },
    { str: "müde", expected: "Müde" },
  ]);

  test.each(stringsAndExpectedResults)(
    tableTestName,
    ({ str, expected }) => {
      expect(capitalize(str)).toBe(expected);
    },
    testTimeoutMs
  );
});

// prettier-ignore
const randomLowerAlphaNumericStrings = toTable(
  exclusiveRange(0, 9)
    .map((_) => randomLowerAlphaNumericString())
    .toArray()
);

describe("calling `randomLowerAlphaNumericString/0` returns a lowercase alphanumeric String", () => {
  test.each(randomLowerAlphaNumericStrings)(
    tableTestName,
    (str) => {
      expect(isString(str)).toBe(true);

      const pattern = /^([a-z]|[0-9])+$/g;
      expect(pattern.test(str)).toBe(true);
    },
    testTimeoutMs
  );
});
