#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const packageJsonPath = path.join(root, 'package.json')
const aiFunctionPath = path.join(root, 'ai-function.sh')

function readPackageVersion() {
  const raw = fs.readFileSync(packageJsonPath, 'utf8')
  const data = JSON.parse(raw)
  if (!data.version || typeof data.version !== 'string') {
    throw new Error('package.json missing valid version field')
  }
  return data.version.trim()
}

function readAiFunctionVersion() {
  const raw = fs.readFileSync(aiFunctionPath, 'utf8')
  const match = raw.match(/^AI_VERSION="([^"]+)"/m)
  if (!match) {
    throw new Error('ai-function.sh missing AI_VERSION')
  }
  return match[1].trim()
}

function main() {
  const packageVersion = readPackageVersion()
  const aiVersion = readAiFunctionVersion()

  if (packageVersion !== aiVersion) {
    console.error('Version mismatch detected')
    console.error(`package.json: ${packageVersion}`)
    console.error(`ai-function.sh: ${aiVersion}`)
    process.exit(1)
  }

  console.log(`Versions match: ${packageVersion}`)
}

main()
