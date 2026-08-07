/**
 * TypeScript 7 ships only a version stub as its JS API, so tsup's `dts` step
 * (rollup-plugin-dts) cannot run against it. We emit declarations with the
 * bundled compatibility compiler instead (`tsc --emitDeclarationOnly`), which
 * produces ESM-flavoured `.d.ts` files. This script duplicates them as `.d.cts`
 * so the `require` conditions in the exports map resolve to CJS-flavoured
 * declarations. The API surface is identical in both module systems.
 */
import { cpSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(import.meta.dir, '..', 'dist');
let copied = 0;
for (const entry of readdirSync(dist)) {
  if (!entry.endsWith('.d.ts')) continue;
  cpSync(join(dist, entry), join(dist, entry.replace(/\.d\.ts$/, '.d.cts')));
  copied += 1;
}
console.log(`gen-cjs-types: copied ${copied} .d.ts → .d.cts`);
