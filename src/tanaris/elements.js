/*!
 * tanaris-js: elements.js
 * Copyright (c) 2025 Peyton Seigo
 */

/**
 * Utilities for HTML elements.
 *
 * @showCategories
 *
 * @module Elements
 */

import { isObject } from "/tanaris/objects.js";

/**
 * Returns `true` iff `value` is an `HTMLElement` or derives from it.
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
export function isHtmlElement(value) {
  return isObject(value) && value instanceof HTMLElement;
}
