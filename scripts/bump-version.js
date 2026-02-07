#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const packageJsonPath = path.join(root, 'package.json')
const aiFunctionPath = path.join(root, 'ai-function.sh')

function readPackageJson() {
  const raw = fs.readFileSync(packageJsonPath, 'utf8')
  return JSON.parse(raw)
}

function writePackageJson(data) {
  const content = JSON.stringify(data, null, 2) + '\n'
  fs.writeFileSync(packageJsonPath, content, 'utf8')
}

function bumpSemver(version, bump) {
  const parts = version.split('.').map(Number)
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
    throw new Error(`Invalid semver: ${version}`)
  }

  const [major, minor, patch] = parts
  if (bump === 'major') return `${major + 1}.0.0`
  if (bump === 'minor') return `${major}.${minor + 1}.0`
  if (bump === 'patch') return `${major}.${minor}.${patch + 1}`

  throw new Error(`Unknown bump: ${bump}`)
}

function updateAiFunctionVersion(version) {
  const raw = fs.readFileSync(aiFunctionPath, 'utf8')
  const updated = raw.replace(
    /^AI_VERSION="([^"]+)"/m,
    `AI_VERSION="${version}"`
  )

  if (raw === updated) {
    throw new Error('Failed to update AI_VERSION in ai-function.sh')
  }

  fs.writeFileSync(aiFunctionPath, updated, 'utf8')
}

function main() {
  const bump = process.argv[2]
  if (!bump || !['major', 'minor', 'patch'].includes(bump)) {
    console.error('Usage: node scripts/bump-version.js <major|minor|patch>')
    process.exit(1)
  }

  const pkg = readPackageJson()
  if (!pkg.version || typeof pkg.version !== 'string') {
    throw new Error('package.json missing valid version field')
  }

  const nextVersion = bumpSemver(pkg.version.trim(), bump)
  pkg.version = nextVersion
  writePackageJson(pkg)
  updateAiFunctionVersion(nextVersion)

  console.log(`Bumped version to ${nextVersion}`)
}

main()
