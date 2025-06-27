// Copyright (c) 2025 Peyton Seigo

import { describe, test, expect } from "@jest/globals";

import { tableTestName, testTimeoutMs, toTable } from "/tanaris/testing/jest";

import {
  isBigInt,
  isFinite,
  isInfinite,
  isInteger,
  isNaN,
  isNumber,
  isNumberLike,
} from "/tanaris/numbers";

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
  -4.67,
  -2/3,
  100000.00000000001,
]);

const numbers = integers.concat(nonIntegerNumbers);

// prettier-ignore
const valuesUnrelatedToNumbers = toTable([
  "27",
  "27.27",
  "27,5",
  "123abc",
  null,
  undefined,
  false,
  true,
  Symbol("bar"),
  {},
  [],
  [1],
  [1, 2],
  new Date(),
  new Date().toString(),
]);

// prettier-ignore
const nonNumbers = toTable([
  Infinity,
  -Infinity,
  NaN,
]).concat(valuesUnrelatedToNumbers);

describe("calling `isNumberLike/1`", () => {
  describe("on a number returns `true`", () => {
    test.each(numbers)(
      tableTestName,
      (value) => {
        expect(isNumberLike(value)).toBe(true);
      },
      testTimeoutMs
    );
  });

  test("on +/- `Infinity` returns `true`", () => {
    expect(isNumberLike(Infinity)).toBe(true);
    expect(isNumberLike(-Infinity)).toBe(true);
  });

  test("on `NaN` returns `true`", () => {
    expect(isNumberLike(NaN)).toBe(true);
  });

  describe("on a value unrelated to numbers returns `false`", () => {
    test.each(valuesUnrelatedToNumbers)(
      tableTestName,
      (value) => {
        expect(isNumberLike(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});

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

describe("calling `isFinite/1`", () => {
  test("on +/- `Infinity` returns `false`", () => {
    expect(isFinite(Infinity)).toBe(false);
    expect(isFinite(-Infinity)).toBe(false);
  });

  describe("on a number returns `true`", () => {
    test.each(numbers)(
      tableTestName,
      (value) => {
        expect(isFinite(value)).toBe(true);
      },
      testTimeoutMs
    );
  });

  describe("on a non-number returns `false`", () => {
    test.each(nonNumbers)(
      tableTestName,
      (value) => {
        expect(isFinite(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});

describe("calling `isInfinite/1`", () => {
  test("on +/- `Infinity` returns `true`", () => {
    expect(isInfinite(Infinity)).toBe(true);
    expect(isInfinite(-Infinity)).toBe(true);
  });

  describe("on a number returns `false`", () => {
    test.each(numbers)(
      tableTestName,
      (value) => {
        expect(isInfinite(value)).toBe(false);
      },
      testTimeoutMs
    );
  });

  describe("on a value unrelated to numbers returns `false`", () => {
    test.each(valuesUnrelatedToNumbers)(
      tableTestName,
      (value) => {
        expect(isInfinite(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});

describe("calling `isNaN/1`", () => {
  test("on `NaN` returns `true`", () => {
    expect(isNaN(NaN)).toBe(true);
  });

  describe("on a number returns `false`", () => {
    test.each(numbers)(
      tableTestName,
      (value) => {
        expect(isNaN(value)).toBe(false);
      },
      testTimeoutMs
    );
  });

  test("on +/- `Infinity` returns `false`", () => {
    expect(isNaN(Infinity)).toBe(false);
    expect(isNaN(-Infinity)).toBe(false);
  });

  describe("on a value unrelated to numbers returns `false`", () => {
    test.each(valuesUnrelatedToNumbers)(
      tableTestName,
      (value) => {
        expect(isNaN(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});
