# Changesets

This folder is managed by [changesets](https://github.com/changesets/changesets).

Run `bun run changeset` after any user-facing change, pick a bump type
(patch/minor/major), and describe the change. The release workflow turns
accumulated changesets into a "Version Packages" PR; merging that PR publishes
the new version to npm.
