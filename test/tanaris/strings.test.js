// Copyright (c) 2025 Peyton Seigo

import { describe, test, expect } from "@jest/globals";

import { isString, capitalize } from "/tanaris/strings";
import { tableTestName, testTimeoutMs, toTable } from "/tanaris/testing/jest";

describe("calling `isString/1`", () => {
  // prettier-ignore
  const strings = toTable([
    "",
    "a",
    "Abc",
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

  describe("returns `true` for Strings", () => {
    test.each(strings)(
      tableTestName,
      (str) => {
        expect(isString(str)).toBe(true);
      },
      testTimeoutMs
    );
  });

  describe("returns `false` for non-Strings", () => {
    test.each(nonStrings)(
      tableTestName,
      (value) => {
        expect(isString(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});

describe("calling `capitalize/1` uppercases the first character of the given String", () => {
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
