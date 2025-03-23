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

  describe("on an Array only containing String elements returns `true`", () => {
    test.each(stringArrays)(
      tableTestName,
      (array) => {
        expect(isStringArray(array)).toBe(true);
      },
      testTimeoutMs
    );
  });

  describe("on an Array containing at least one non-String element returns `false`", () => {
    test.each(nonStringArrays)(
      tableTestName,
      (array) => {
        expect(isStringArray(array)).toBe(false);
      },
      testTimeoutMs
    );
  });

  describe("on a non-Array returns `false`", () => {
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

  describe("on an Array returns it as-is (like the 'identity' function)", () => {
    test.each(arrays)(
      tableTestName,
      (array) => {
        expect(wrap(array)).toStrictEqual(array);
      },
      testTimeoutMs
    );
  });

  describe("on a non-Array returns a 1-element Array containing that value", () => {
    test.each(nonArrays)(
      tableTestName,
      (nonArray) => {
        expect(wrap(nonArray)).toStrictEqual([nonArray]);
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
      array: ["a", "b", "c"],
      element: ", ",
      expected: ["a", ", ", "b", ", ", "c"]
    },
    {
      array: [123, { bar: 456 }, Infinity, []],
      element: -1,
      expected: [123, -1, { bar: 456 }, -1, Infinity, -1, []]
    },
  ]);

  describe("inserts a given value between each element in a shallow copy of the given Array", () => {
    test.each(argsWithExpectedResults)(
      tableTestName,
      ({ array, element, expected }) => {
        expect(intersperse(array, element)).toStrictEqual(expected);

        array.forEach((originalElement) => {
          expect(expected).toContainEqual(originalElement);
        });
      },
      testTimeoutMs
    );
  });
});
