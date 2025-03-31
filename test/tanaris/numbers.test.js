// Copyright (c) 2025 Peyton Seigo

import { describe, test, expect } from "@jest/globals";

import { tableTestName, testTimeoutMs, toTable } from "/tanaris/testing/jest";

import { isBigInt, isInteger, isNumber } from "/tanaris/numbers";

// prettier-ignore
const bigInts = toTable([
  BigInt(-1),
  BigInt(0),
  BigInt(7),
]);

// prettier-ignore
const nonBigIntIntegers = toTable([
  97,
  65,
  0,
  -1,
]);

// prettier-ignore
const integers = nonBigIntIntegers.concat(bigInts);

// prettier-ignore
const nonIntegerNumbers = toTable([
  1.1,
  NaN,
  Infinity,
  -Infinity,
]);

const numbers = integers.concat(nonIntegerNumbers);

// prettier-ignore
const nonNumbers = toTable([
  null,
  undefined,
  true,
  Symbol("bar"),
  {},
  []
]);

describe("calling `isNumber/1`", () => {
  describe("on a number returns `true`", () => {
    test.each(numbers)(
      tableTestName,
      (number) => {
        expect(isNumber(number)).toBe(true);
      },
      testTimeoutMs
    );
  });

  describe("on a non-number returns `false`", () => {
    test.each(nonNumbers)(
      tableTestName,
      (value) => {
        expect(isNumber(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});

describe("calling `isInteger/1`", () => {
  describe("on an integer returns `true`", () => {
    test.each(integers)(
      tableTestName,
      (integer) => {
        expect(isInteger(integer)).toBe(true);
      },
      testTimeoutMs
    );
  });

  describe("on a non-integer number returns `false`", () => {
    test.each(nonIntegerNumbers)(
      tableTestName,
      (nonIntegerNumber) => {
        expect(isInteger(nonIntegerNumber)).toBe(false);
      },
      testTimeoutMs
    );
  });

  describe("on a non-number returns `false`", () => {
    test.each(nonNumbers)(
      tableTestName,
      (value) => {
        expect(isNumber(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});

describe("calling `isBigInt/1`", () => {
  describe("on a `BigInt` returns `true`", () => {
    test.each(bigInts)(
      tableTestName,
      (bigInt) => {
        expect(isBigInt(bigInt)).toBe(true);
      },
      testTimeoutMs
    );
  });

  describe("on a non-BigInt integer returns `false`", () => {
    test.each(nonBigIntIntegers)(
      tableTestName,
      (nonBigIntInteger) => {
        expect(isBigInt(nonBigIntInteger)).toBe(false);
      },
      testTimeoutMs
    );
  });

  describe("on a non-integer number returns `false`", () => {
    test.each(nonIntegerNumbers)(
      tableTestName,
      (nonIntegerNumber) => {
        expect(isInteger(nonIntegerNumber)).toBe(false);
      },
      testTimeoutMs
    );
  });

  describe("on a non-number returns `false`", () => {
    test.each(nonNumbers)(
      tableTestName,
      (value) => {
        expect(isNumber(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});
