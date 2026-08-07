import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'is-object': 'src/is-object.ts',
    'is-non-null-object': 'src/is-non-null-object.ts',
    'is-string': 'src/is-string.ts',
    'is-number': 'src/is-number.ts',
    'is-boolean': 'src/is-boolean.ts',
    'has-key': 'src/has-key.ts',
    'is-array': 'src/is-array.ts',
    'is-non-empty-array': 'src/is-non-empty-array.ts',
    'is-empty-array': 'src/is-empty-array.ts',
    'is-in-array': 'src/is-in-array.ts',
    'assert-defined': 'src/assert-defined.ts',
    'is-api-error-response': 'src/is-api-error-response.ts',
  },
  format: ['cjs', 'esm'],
  dts: false,
  sourcemap: false,
  clean: true,
  treeshake: true,
  minify: false,
});
