#!/usr/bin/env bun
/**
 * Coverage helper for typeguards.
 *
 * `bun test` is configured (bunfig.toml) to emit V8 coverage on every run and
 * write an lcov report to coverage/lcov.info. This script turns that data into
 * a gate and a badge:
 *
 *   bun scripts/coverage.ts check [--threshold <n>]   fail when line coverage < n (default 90)
 *   bun scripts/coverage.ts badge                     regenerate the shields.io badge in README.md
 *
 * bun 1.3.x accepts coverageThreshold / --coverage-threshold but does not
 * enforce them, so `check` is the real enforcement point. It runs in CI via
 * the `test:coverage` script; the plain `test` script never runs it, so local
 * runs cannot fail on coverage.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process, { exit } from 'node:process';

const LCOV_PATH = join(import.meta.dir, '..', 'coverage', 'lcov.info');
const README_PATH = join(import.meta.dir, '..', 'README.md');
const CI_URL = 'https://github.com/iv-stpn/typeguards/actions/workflows/ci.yml';
const DEFAULT_THRESHOLD = 90;
const BADGE_PATTERN = /\[!\[Coverage\]\(https:\/\/img\.shields\.io\/badge\/coverage-[^)]*\)\]\([^)]*\)/;

type Summary = { files: number; lf: number; lh: number; pct: number };

function readSummary(): Summary {
  if (!existsSync(LCOV_PATH)) {
    console.error(`No coverage report at ${LCOV_PATH}. Run \`bun test\` first (bunfig.toml enables coverage).`);
    exit(1);
  }
  let files = 0;
  let lf = 0;
  let lh = 0;
  for (const line of readFileSync(LCOV_PATH, 'utf8').split('\n')) {
    if (line.startsWith('SF:')) files += 1;
    else if (line.startsWith('LF:')) lf += Number.parseInt(line.slice(3), 10);
    else if (line.startsWith('LH:')) lh += Number.parseInt(line.slice(3), 10);
  }
  if (files === 0 || lf === 0) {
    console.error(`No coverage data in ${LCOV_PATH}. Run \`bun test\` first.`);
    exit(1);
  }
  return { files, lf, lh, pct: (lh / lf) * 100 };
}

function formatPct(pct: number): string {
  const rounded = Math.round(pct);
  return pct === rounded ? String(rounded) : pct.toFixed(1);
}

type BadgeColor = '2ea44f' | 'a4c639' | 'dfb317' | 'fe7d37' | 'e05d44';

function colorFor(pct: number): BadgeColor {
  if (pct >= 90) return '2ea44f'; // bright green
  if (pct >= 75) return 'a4c639'; // yellow-green
  if (pct >= 60) return 'dfb317'; // yellow
  if (pct >= 40) return 'fe7d37'; // orange
  return 'e05d44'; // red
}

function cmdCheck(args: string[]): void {
  const flagIndex = args.indexOf('--threshold');
  const raw = flagIndex >= 0 ? args[flagIndex + 1] : undefined;
  const threshold = raw ? Number.parseFloat(raw) : DEFAULT_THRESHOLD;
  if (Number.isNaN(threshold)) {
    console.error(`Invalid threshold: ${raw}`);
    exit(1);
  }
  const { files, lf, lh, pct } = readSummary();
  console.log(`Line coverage: ${pct.toFixed(2)}% (${lh}/${lf} lines across ${files} files) — threshold ${threshold}%`);
  if (pct >= threshold) console.log('Coverage gate passed.');
  else {
    console.error('Coverage gate FAILED.');
    exit(1);
  }
}

function cmdBadge(): void {
  const { pct } = readSummary();
  const badge = `[![Coverage](https://img.shields.io/badge/coverage-${formatPct(pct)}%25-${colorFor(pct)})](${CI_URL})`;
  const readme = readFileSync(README_PATH, 'utf8');
  if (BADGE_PATTERN.test(readme)) {
    const updated = readme.replace(BADGE_PATTERN, badge);
    if (updated === readme) {
      console.log(`README badge up to date: ${badge}`);
      return;
    }
    writeFileSync(README_PATH, updated);
    console.log(`README badge updated: ${badge}`);
    return;
  }
  if (readme.includes('## Install')) {
    const updated = readme.replace('## Install', `${badge}\n\n## Install`);
    writeFileSync(README_PATH, updated);
    console.log(`README badge updated: ${badge}`);
    return;
  }
  console.error(`Could not update ${README_PATH}: no existing badge and no "## Install" anchor found.`);
  exit(1);
}

const [command, ...rest] = process.argv.slice(2);
switch (command) {
  case 'check':
    cmdCheck(rest);
    break;
  case 'badge':
    cmdBadge();
    break;
  default:
    console.error('Usage: bun scripts/coverage.ts <check [--threshold <n>] | badge>');
    exit(1);
}
