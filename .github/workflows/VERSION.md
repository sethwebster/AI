# Version Management

This project uses semantic versioning and automated npm publishing via GitHub Actions.

## Versioning

Follow semantic versioning (semver):
- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.2.0 → 1.3.0): New features (backward compatible)
- **Patch** (1.2.0 → 1.2.1): Bug fixes

## Release Process

### 1. Update Version

Update both files:

```bash
# Update package.json version
npm version patch  # or minor, or major

# Update AI_VERSION in ai-function.sh
# Edit line: AI_VERSION="1.2.1"
```

### 2. Commit Version Bump

```bash
git add package.json ai-function.sh
git commit -m "chore: bump version to 1.2.1"
```

### 3. Create and Push Tag

```bash
git tag -a v1.2.1 -m "Release v1.2.1"
git push origin main
git push origin v1.2.1
```

### 4. Automated Actions

When you push a semver tag (e.g., `v1.2.1`), GitHub Actions automatically:

1. **Publishes to npm** (`.github/workflows/publish-npm.yml`)
   - Verifies package.json version matches tag
   - Publishes to npm with provenance
   - Verifies publication succeeded

2. **Creates GitHub Release** (`.github/workflows/release.yml`)
   - Generates changelog from commits
   - Creates release with installation instructions
   - Lists all included agents
   - Marks pre-releases (e.g., `v1.2.1-beta.1`)

## Pre-releases

For beta/alpha releases:

```bash
npm version prerelease --preid=beta
# Creates: 1.2.1-beta.0

git tag -a v1.2.1-beta.0 -m "Beta release"
git push origin v1.2.1-beta.0
```

GitHub will automatically mark it as a pre-release.

## Workflow Files

- `.github/workflows/publish-npm.yml` - npm publishing
- `.github/workflows/release.yml` - GitHub releases

## Secrets Required

- `NPM_TOKEN` - npm access token (automation type, publish permission)
  - Set in GitHub: Settings → Secrets and variables → Actions
  - Or use: `gh secret set NPM_TOKEN`

## Troubleshooting

### Version mismatch error

If you get "Version mismatch" in the workflow:

```bash
# Check versions
cat package.json | grep version
grep AI_VERSION ai-function.sh

# Fix and recommit
git tag -d v1.2.1  # Delete local tag
git push --delete origin v1.2.1  # Delete remote tag
# Fix versions, commit, and retag
```

### npm publish failed

Check:
1. NPM_TOKEN is set in GitHub secrets
2. Token has publish permission
3. Token is not expired
4. You're not republishing the same version

### Rollback a release

```bash
# Unpublish from npm (within 72 hours)
npm unpublish @sethwebster/ai-cli@1.2.1

# Delete GitHub release
gh release delete v1.2.1

# Delete tag
git tag -d v1.2.1
git push --delete origin v1.2.1
```

## Manual Override

To publish manually without workflows:

```bash
npm publish --access public
gh release create v1.2.1 --generate-notes
```
