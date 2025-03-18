// Copyright (c) 2025 Peyton Seigo

import { describe, test, expect } from "@jest/globals";

import { isStringArray, wrap, intersperse } from "/tanaris/arrays";
import { tableTestName, testTimeoutMs, toTable } from "/tanaris/testing/jest";

describe("calling `isStringArray/1`", () => {
  // prettier-ignore
  const stringArrays = toTable([
    [],
    [""],
    ["", ""],
    ["a"],
    ["a", "b", "c"],
    ["Lorem ipsum dolor sit amet"],

    // Open to changing this behaviour if it doesn't make sense.
    [, ],
    [, , , ],
    [, "a", , ],
  ]);

  // prettier-ignore
  const nonStringArrays = toTable([
    [97],
    [65],
    [0],
    [-1],
    [1.1],
    [NaN],
    [Infinity],
    [-Infinity],
    [BigInt(1)],
    [null],
    [undefined],
    [true],
    [Symbol("bar")],
    [{}],
    [[]],

    ["a", 97],
    ["a", 65],
    ["a", 0],
    ["a", -1],
    ["a", 1.1],
    ["a", NaN],
    ["a", Infinity],
    ["a", -Infinity],
    ["a", BigInt(1)],
    ["a", null],
    ["a", undefined],
    ["a", true],
    ["a", Symbol("bar")],
    ["a", {}],
    ["a", []],

    [null, "b", null],
    [undefined, "b", undefined],
  ]);

  // prettier-ignore
  const nonArrays = toTable([
    "abc",
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
    {},
    true,
    Symbol("bar"),
  ]);

  describe("returns `true` for arrays with String elements", () => {
    test.each(stringArrays)(
      tableTestName,
      (array) => {
        expect(isStringArray(array)).toBe(true);
      },
      testTimeoutMs
    );
  });

  describe("returns `false` for arrays with non-String elements", () => {
    test.each(nonStringArrays)(
      tableTestName,
      (array) => {
        expect(isStringArray(array)).toBe(false);
      },
      testTimeoutMs
    );
  });

  describe("returns `false` for non-arrays", () => {
    test.each(nonArrays)(
      tableTestName,
      (value) => {
        expect(isStringArray(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});

describe("calling `wrap/1`", () => {
  // prettier-ignore
  const nonArrays = toTable([
    "abc",
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
  ]);

  // prettier-ignore
  const arrays = toTable([
    ...nonArrays.map((e) => [e]),
    [],
    [, ],
    [, , , ],
    [1, 2, 3],
    [[]],
    [[[]]],
  ]);

  describe("wraps non-Arrays in an Array", () => {
    test.each(nonArrays)(
      tableTestName,
      (nonArray) => {
        expect(wrap(nonArray)).toStrictEqual([nonArray]);
      },
      testTimeoutMs
    );
  });

  describe("returns Arrays as-is (like the 'identity' function)", () => {
    test.each(arrays)(
      tableTestName,
      (array) => {
        expect(wrap(array)).toStrictEqual(array);
      },
      testTimeoutMs
    );
  });
});

describe("calling `intersperse/2`", () => {
  // prettier-ignore
  const argsWithExpectedResults = toTable([
    {
      array: [],
      element: "",
      expected: []
    },
    {
      array: ["a"],
      element: "",
      expected: ["a"]
    },
    {
      array: ["a", "b"],
      element: "",
      expected: ["a", "", "b"]
    },
    {
      array: ["a", "b"],
      element: ", ",
      expected: ["a", ", ", "b"]
    },
    {
      array: [123, { bar: 456 }, Infinity, []],
      element: -1,
      expected: [123, -1, { bar: 456 }, -1, Infinity, -1, []]
    },
  ]);

  describe("inserts the given value between each Array element", () => {
    test.each(argsWithExpectedResults)(
      tableTestName,
      ({ array, element, expected }) => {
        expect(intersperse(array, element)).toStrictEqual(expected);
      },
      testTimeoutMs
    );
  });
});
