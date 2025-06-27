// Copyright (c) 2025 Peyton Seigo

import { describe, test, expect } from "@jest/globals";

import {
  tableTestName,
  testTimeoutMs,
  toTable,
} from "/tanaris/testing/jest.js";

import { toMarkdownTable } from "/tanaris/strings/markdown_table";

describe("calling `toMarkdownTable/1`", () => {
  // prettier-ignore
  const expectedTablesForRows = toTable([
    {
      rows: [],
      opts: undefined,
      expectedTable: ""
    },
    {
      rows: [
        ["Title"],
        ["Row 1"],
        ["Row 2"],
        ["Row 3"]
      ],
      opts: undefined,
      expectedTable: "|Title|\n|-----|\n|Row 1|\n|Row 2|\n|Row 3|"
    },
    {
      rows: [
        ["Title"],
        ["Row 1"],
        ["Row 2"],
        ["Row 3"]
      ],
      opts: { padding: 1 },
      expectedTable: "| Title |\n|-------|\n| Row 1 |\n| Row 2 |\n| Row 3 |"
    },
    {
      rows: [
        ["Title 1", "Title 2", "Title 3"],
        ["Row 1.1", "Row 2.1", "Row 3.1"],
        ["Row 1.2", "Row 2.2", "Row 3.2"],
        ["Row 1.3", "Row 2.3", "Row 3.3"]
      ],
      opts: undefined,
      expectedTable: "|Title 1|Title 2|Title 3|\n|-------|-------|-------|\n|Row 1.1|Row 2.1|Row 3.1|\n|Row 1.2|Row 2.2|Row 3.2|\n|Row 1.3|Row 2.3|Row 3.3|"
    },
    {
      rows: [
        ["Title 1", "Title 2", "Title 3"],
        ["Row 1.1", "Row 2.1", "Row 3.1"],
        ["Row 1.2", "Row 2.2", "Row 3.2"],
        ["Row 1.3", "Row 2.3", "Row 3.3"]
      ],
      opts: { padding: 2 },
      expectedTable: "|  Title 1  |  Title 2  |  Title 3  |\n|-----------|-----------|-----------|\n|  Row 1.1  |  Row 2.1  |  Row 3.1  |\n|  Row 1.2  |  Row 2.2  |  Row 3.2  |\n|  Row 1.3  |  Row 2.3  |  Row 3.3  |"
    },
  ]);

  describe("renders tables correctly", () => {
    test.each(expectedTablesForRows)(
      tableTestName,
      ({ rows, opts, expectedTable }) => {
        expect(toMarkdownTable(rows, opts)).toBe(expectedTable);
      },
      testTimeoutMs
    );
  });
});
