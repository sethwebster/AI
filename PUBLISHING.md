# Publishing to npm

This document explains how to publish the AI CLI to npm.

## Prerequisites

1. npm account (create at https://www.npmjs.com/signup)
2. Login to npm:
   ```bash
   npm login
   ```

## Publishing Process

### 1. Update Version

Update version in `package.json` following semantic versioning:
- **Patch** (1.2.0 → 1.2.1): Bug fixes
- **Minor** (1.2.0 → 1.3.0): New features (backward compatible)
- **Major** (1.2.0 → 2.0.0): Breaking changes

```bash
# Option 1: Manual edit package.json
# Option 2: Use npm version
npm version patch  # or minor, or major
```

Also update `AI_VERSION` in `ai-function.sh` to match.

### 2. Test Package Locally

Verify package contents:
```bash
npm pack --dry-run
```

Expected files:
- agents/ (all .md files)
- bin/install.js
- ai-function.sh
- install.sh
- AGENTS.md
- README.md
- LICENSE
- package.json

### 3. Publish to npm

```bash
# First publish (requires scoped package access)
npm publish --access public

# Subsequent publishes
npm publish
```

### 4. Verify Installation

Test the published package:
```bash
npx @sethwebster/ai-cli
```

### 5. Tag Release in Git

```bash
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0
```

## Package Scope

The package is published under the `@sethwebster` scope:
- Package name: `@sethwebster/ai-cli`
- Install: `npx @sethwebster/ai-cli`
- Global: `npm install -g @sethwebster/ai-cli`

## npm Scripts

- `postinstall`: Automatically runs the installer after `npm install -g`
- `ai-install`: Available as a bin command after global install

## Files Excluded from Package

See `.npmignore` for excluded files:
- landing-page/ (published separately)
- .git/
- .claude/
- Development files

## Troubleshooting

### "You do not have permission to publish"
```bash
# Login to npm
npm login

# Verify you're logged in
npm whoami

# If using a scoped package for the first time
npm publish --access public
```

### Package size too large
```bash
# Check what's being included
npm pack --dry-run

# Add more exclusions to .npmignore
```

### Version already published
```bash
# Bump version and try again
npm version patch
npm publish
```

## Versioning Strategy

Keep versions synchronized across:
1. `package.json` - npm package version
2. `ai-function.sh` - `AI_VERSION` variable
3. Git tags - `v1.2.0` format

## Release Checklist

- [ ] Update version in `package.json`
- [ ] Update `AI_VERSION` in `ai-function.sh`
- [ ] Update `CHANGELOG.md` (if exists)
- [ ] Test `npm pack --dry-run`
- [ ] Commit version changes
- [ ] Publish to npm
- [ ] Test installation: `npx @sethwebster/ai-cli`
- [ ] Tag release in git
- [ ] Push tag to GitHub
- [ ] Create GitHub release (optional)
