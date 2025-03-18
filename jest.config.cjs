// Copyright (c) 2025 Peyton Seigo

/** @type {import("jest").Config} */
const config = {
  testEnvironment: "jsdom",
	roots: [
		"<rootDir>/src/",
		"<rootDir>/test/",
	],
  moduleDirectories: [
    "node_modules",
    "test"
  ],
  moduleFileExtensions: ["js", "cjs", "mjs", "ts", "json", "node"],
	moduleNameMapper: {
		"/tanaris/(.*)": "<rootDir>/src/tanaris/$1",
		"/test/(.*)": "<rootDir>/test/$1",
	},
  coverageProvider: "babel",
  coverageDirectory: ".coverage"
}

module.exports = config;
