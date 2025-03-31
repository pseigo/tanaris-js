// Copyright (c) 2025 Peyton Seigo

import { describe, test, expect } from "@jest/globals";

import { tableTestName, testTimeoutMs, toTable } from "/tanaris/testing/jest";

import { isObject, isPlainObject } from "/tanaris/objects";

function NonPlainObject() {
  this.a = 1;
  this.b = 2;
}

// prettier-ignore
const plainObjects = toTable([
  {},
  { a: 1 },
  { a: 1, b: 2 },
  Object.create({}),
  Object.create({ a: 1, b: 2 }),
]);

// prettier-ignore
const nonPlainObjects = toTable([
  new NonPlainObject(),
  [],
  new Map(),
]);

const objects = plainObjects.concat(nonPlainObjects);

// prettier-ignore
const nonObjects = toTable([
  undefined,
  null,
  true,
  false,
  1,
  -0,
  1.1,
  NaN,
  Infinity,
 -Infinity,
  BigInt(1),
  Symbol("bar"),
]);

describe("calling `isPlainObject/1`", () => {
  describe("on a plain object returns `true`", () => {
    test.each(plainObjects)(
      tableTestName,
      (plainObject) => {
        expect(isPlainObject(plainObject)).toBe(true);
      },
      testTimeoutMs
    );
  });

  describe("on a non-plain object returns `false`", () => {
    test.each(nonPlainObjects)(
      tableTestName,
      (nonPlainObject) => {
        expect(isPlainObject(nonPlainObject)).toBe(false);
      },
      testTimeoutMs
    );
  });

  describe("on a non-object returns `false`", () => {
    test.each(nonObjects)(
      tableTestName,
      (value) => {
        expect(isPlainObject(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});

describe("calling `isObject/1`", () => {
  describe("on an object returns `true`", () => {
    test.each(objects)(
      tableTestName,
      (object) => {
        expect(isObject(object)).toBe(true);
      },
      testTimeoutMs
    );
  });

  describe("on a non-object returns `false`", () => {
    test.each(nonObjects)(
      tableTestName,
      (value) => {
        expect(isObject(value)).toBe(false);
      },
      testTimeoutMs
    );
  });
});
