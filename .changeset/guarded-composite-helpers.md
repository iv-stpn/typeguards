---
"@iv-stpn/typeguards": patch
---

Add guarded composite type helpers: `isArrayOf(value, itemGuard)` narrows to `T[]` when every element passes the item guard (rejects sparse arrays), `isObjectOf(value, shape)` narrows to the shape's type when every own property passes its guard (extra keys allowed), and `isUnionOf(value, ...guards)` narrows to the union of the guarded types when any guard passes. Each is exported from the package root and as its own subpath (`@iv-stpn/typeguards/is-array-of`, `@iv-stpn/typeguards/is-object-of`, `@iv-stpn/typeguards/is-union-of`).
