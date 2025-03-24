// Copyright (c) 2025 Peyton Seigo

import * as esbuild from "esbuild";

import { buildContextOptions } from "./common/esbuild.js";

const context = await esbuild.context(buildContextOptions);
await context.watch();
