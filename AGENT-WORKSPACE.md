# Agent Workspace Instructions

**This file contains workspace-specific context and information for AI agents working in this repository.**

## Quick Start

When you start working in this workspace:

1. Read the general guidelines in [AGENTS.md](./AGENTS.md)
2. Read this file for workspace-specific context
3. Check for any active ADRs in `adr/` directory
4. Review recent commits to understand current work

## Workspace Context

### Repository Information

- **Repository**: [Your project name]
- **Primary Language**: [e.g., TypeScript, Elixir, Python]
- **Framework**: [e.g., Next.js, Phoenix, Django]
- **Package Manager**: [e.g., npm, bun, mix, pip]

### Key Directories

```
.
├── src/              # Source code
├── tests/            # Test files
├── docs/             # Documentation
├── adr/              # Architecture Decision Records
└── .changeset/       # Changesets for versioning
```

### Development Commands

```bash
# Install dependencies
[command]

# Run development server
[command]

# Run tests
[command]

# Run linter
[command]

# Build production
[command]
```

## ⚠️ CRITICAL: Migration Requirements

**UNBREACHABLE CONSTRAINT**: When making changes that affect installed agents or configurations, you MUST create a migration before committing/pushing.

### Migration Rules

Every migration MUST implement:
1. **`migration_up()`** - Apply the change (idempotent)
2. **`migration_down()`** - Reverse the change (idempotent)
3. **Idempotence** - Running up/down multiple times has same effect as once

### Migration Workflow

1. Make your changes to the codebase
2. Create migration file: `migrations/XXX_description.sh`
3. Implement `migration_up()` and `migration_down()`
4. Test both directions:
   ```bash
   ai migrate up
   ai migrate down
   ai migrate up
   ```
5. Verify idempotence (run each direction twice)
6. Only then commit and push

### Migration File Template

```bash
#!/bin/bash
# Migration: XXX
# Description: Brief description
# Version: X.Y.Z
# Date: YYYY-MM-DD

migration_up() {
	# Check before acting (idempotent)
	if [ condition ]; then
		# Apply change
	fi
}

migration_down() {
	# Check before acting (idempotent)
	if [ condition ]; then
		# Reverse change
	fi
}
```

### When to Create Migrations

- Renaming installed agents/skills
- Moving configuration files
- Changing file/directory structures users have
- Updating installed agent frontmatter
- Any change that affects user installations

### When NOT to Create Migrations

- Adding new features (users opt-in via `ai install agents`)
- Documentation updates
- Internal refactoring that doesn't affect installations

---

## Project-Specific Guidelines

### Tech Stack

- **Frontend**: [Framework/library]
- **Backend**: [Framework/library]
- **Database**: [Database]
- **Caching**: [Redis/other]
- **Testing**: [Testing framework]

### Environment Setup

Required environment variables:
- `DATABASE_URL` - Database connection string
- `REDIS_URL` - Redis connection string
- [Add others as needed]

### Testing Strategy

- Unit tests: [Location and conventions]
- Integration tests: [Location and conventions]
- E2E tests: [Location and conventions]

### Deployment

- **Staging**: [URL or process]
- **Production**: [URL or process]
- **CI/CD**: [Platform - GitHub Actions, etc.]

## Current Work

### Active Features

[List current features being developed]

### Known Issues

[List known bugs or technical debt]

### Upcoming Work

[List planned features or refactoring]

## Important Patterns

### [Pattern 1]

[Describe project-specific pattern]

### [Pattern 2]

[Describe project-specific pattern]

## Troubleshooting

### Common Issues

**Issue**: [Common problem]
**Solution**: [How to fix it]

---

**Note**: Keep this file updated as the project evolves. This is your workspace's living documentation.
