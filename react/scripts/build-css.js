#!/usr/bin/env node
/**
 * build-css.js — flattens src/styles.css's @import chain into one
 * self-contained dist/styles.css.
 *
 * src/styles.css imports docs/shared/tokens.css and docs/shared/components.css
 * by relative path so it stays live against the docs workstream during
 * development. Those paths point outside this package's published files
 * (only "dist" is published — see package.json's "files" field), so a
 * published dist/styles.css must have the imports resolved and inlined,
 * not just copied as-is.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import postcss from 'postcss';
import postcssImport from 'postcss-import';

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = resolve(__dirname, '../src/styles.css');
const outDir = resolve(__dirname, '../dist');
const outFile = resolve(outDir, 'styles.css');

const css = readFileSync(input, 'utf8');
const result = await postcss([postcssImport()]).process(css, { from: input, to: outFile });

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, result.css, 'utf8');

console.log(`✓ dist/styles.css   (${(result.css.length / 1024).toFixed(1)} KB, @import chain flattened)`);
