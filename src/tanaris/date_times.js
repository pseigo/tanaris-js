/*!
 * tanaris-js: date_times.js
 * Copyright (c) 2025 Peyton Seigo
 */

/**
 * Utilities for date-times.
 *
 * @showCategories
 *
 * @module DateTimes
 */

import { isNumber } from "/tanaris/numbers";
import { isPlainObject } from "/tanaris/objects";

/**
 * @typedef {{
 *   hours: number,
 *   minutes: number,
 *   seconds: number,
 *   milliseconds: number
 * }} TimeDurationLike
 *
 * A duration with hours, minutes, seconds, and milliseconds.
 */

/**
 * A time duration with hours, minutes, seconds, and milliseconds.
 *
 * @class TimeDuration
 * @category Structs
 */
export class TimeDuration extends Object {
  /**
   * Creates a new `TimeDuration`.
   *
   * @param {object} params
   * @param {number} params.hours
   * @param {number} params.minutes
   * @param {number} params.seconds
   * @param {number} params.milliseconds
   */
  constructor({ hours, minutes, seconds, milliseconds }) {
    super();
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.milliseconds = milliseconds;
  }

  /**
   * Returns the total number of milliseconds represented by `this`.
   *
   * @override
   *
   * @returns {number}
   */
  valueOf() {
    return (
      this.milliseconds +
      this.seconds * 60 +
      this.minutes * 3600 +
      this.hours * 216000
    );
  }
}

/**
 * Returns `true` iff `value` matches the structure of a {@link TimeDuration}.
 *
 * @category Predicates
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isTimeDuration(value) {
  if (!isPlainObject(value)) {
    return false;
  }

  const requiredKeys = ["hours", "minutes", "seconds", "milliseconds"];

  return requiredKeys.every((key) => {
    const keyValue = value[key];
    return keyValue != null && isNumber(keyValue);
  });
}

/**
 * Returns `true` iff `left` and `right` are equivalent.
 *
 * @category Predicates
 *
 * @param {TimeDuration} left
 * @param {TimeDuration} right
 *
 * @returns {boolean}
 */
export function timeDurationsAreEqual(left, right) {
  return Object.keys(left).every((unit) => {
    left[unit] === right[unit];
  });
}

// TODO: take timezone by param to make potential timezone bugs explicit
/**
 * Returns `true` iff `left` and `right` are on the same day.
 *
 * @category Predicates
 *
 * @param {Date} left
 * @param {Date} right
 *
 * @returns {boolean}
 */
export function areOnSameDay(left, right) {
  return (
    left.getDate() === right.getDate() &&
    left.getMonth() === right.getMonth() &&
    left.getFullYear() === right.getFullYear()
  );
}

/**
 * Returns the duration between `end` and `start`.
 *
 * @category Arithmetic
 *
 * @param {Date} start
 * @param {Date} end
 *
 * @returns {TimeDuration}
 */
export function timeDifference(start, end) {
  const totalMilliseconds = end.getTime() - start.getTime();
  const totalSeconds = totalMilliseconds / 1000;

  const fractionalHours = totalSeconds / 60 / 60;
  const hours = Math.floor(fractionalHours);

  const fractionalMinutes = (fractionalHours - hours) * 60;
  const minutes = Math.floor(fractionalMinutes);

  const fractionalSeconds = (fractionalMinutes - minutes) * 60;
  const seconds = Math.floor(fractionalSeconds);

  const milliseconds = totalMilliseconds % 1000;

  const difference = new TimeDuration({
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds,
  });

  return difference;
}
