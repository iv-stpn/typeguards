/**
 * TypeDoc compatibility hook for TypeScript 7.
 *
 * TypeScript 7 is the native (Go-based) compiler and its npm package no longer exposes the
 * classic JS compiler API (`ts.createProgram`, `ts.SyntaxKind`, ...) that TypeDoc requires.
 * TypeScript 7 still vendors the full classic compiler as the `@typescript/typescript6`
 * package (used by its `tsc6` compatibility binary). This hook redirects every
 * `import ... from "typescript"` inside the docs process to that classic compiler.
 *
 * Loaded via `node --import ./scripts/typedoc-ts6-hook.mjs` before the TypeDoc CLI starts.
 */
import { createRequire, registerHooks } from 'node:module';

const require = createRequire(import.meta.url);

let ts6Path;
try {
  ts6Path = require.resolve('@typescript/typescript6/lib/typescript.js');
} catch {
  // Fall through: if the classic compiler is unavailable, let resolution proceed
  // normally so TypeDoc fails with its own, more meaningful error.
  ts6Path = null;
}

if (ts6Path) {
  registerHooks({
    resolve(specifier, context, nextResolve) {
      if (specifier === 'typescript') {
        return { url: `file://${ts6Path}`, shortCircuit: true };
      }
      return nextResolve(specifier, context);
    },
  });
}
