// Copyright (c) 2025 Peyton Seigo

import { describe, test, expect } from "@jest/globals";

import { testTimeoutMs } from "/tanaris/testing/jest.js";

import { timeDifference } from "/tanaris/date_times.js";

// prettier-ignore
const datesAndExpectedTimeDifferences = [
  makeDatesAndExpectedTimeDifferencesItem(
    (() => {
      const now = new Date();
      return { start: now, end: now };
    })(),
    {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }
  ),
  makeDatesAndExpectedTimeDifferencesItem(
    (() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const later = new Date(today);
      later.setHours(0, 0, 0, 10);

      return { start: today, end: later };
    })(),
    {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 10,
    }
  ),
  makeDatesAndExpectedTimeDifferencesItem(
    (() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const later = new Date(today);
      later.setHours(4, 3, 2, 1);

      return { start: today, end: later };
    })(),
    {
      hours: 4,
      minutes: 3,
      seconds: 2,
      milliseconds: 1,
    }
  ),
  makeDatesAndExpectedTimeDifferencesItem(
    (() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      tomorrow.setHours(23, 59, 59, 999);

      return { start: today, end: tomorrow };
    })(),
    {
      hours: 47,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    }
  ),
];

function makeDatesAndExpectedTimeDifferencesItem({ start, end }, expected) {
  return [start, end, expected];
}

describe("calling `hmsDifference/1` (v2)", () => {
  test.each(datesAndExpectedTimeDifferences)(
    "[%#] between %s and %s to be `%o`",
    (start, end, expected) => {
      /* @type {TimeDuration} */
      const difference = timeDifference(start, end);

      for (const [unit, value] of Object.entries(expected)) {
        expect(Object.hasOwn(difference, unit)).toBe(true);
        expect(difference[unit]).toBe(value);
      }
    },
    testTimeoutMs
  );
});
