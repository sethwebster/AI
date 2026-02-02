# AI CLI Migrations

This directory contains migration scripts that run automatically during `ai update` to handle breaking changes and updates to user installations.

## Overview

The migration system ensures smooth upgrades when the AI CLI changes in ways that affect:
- Installed agents/skills
- Configuration file locations
- Directory structures
- Agent/skill naming conventions

## Migration Rules

**Every migration MUST implement three things:**

1. **`migration_up()`** - Applies the change
2. **`migration_down()`** - Reverses the change
3. **Idempotence** - Both functions can be run multiple times safely

## File Naming Convention

```
XXX_description.sh
```

- `XXX` - Zero-padded sequential number (001, 002, 003, etc.)
- `description` - Brief snake_case description
- `.sh` - Shell script extension

**Examples:**
- `001_rename_agents_to_personas.sh`
- `002_move_config_to_home.sh`
- `003_update_frontmatter_format.sh`

## Migration Template

```bash
#!/bin/bash
# Migration: XXX
# Description: Brief description of what this migration does
# Version: X.Y.Z (AI CLI version that introduced this)
# Date: YYYY-MM-DD

migration_up() {
	local CHANGED=0

	echo "  → Applying migration..."

	# Check if change needed (idempotent)
	if [ -f "old-file" ]; then
		mv "old-file" "new-file"
		((CHANGED++))
	fi

	if [ $CHANGED -gt 0 ]; then
		echo "  ✅ Applied $CHANGED change(s)"
	else
		echo "  ℹ️  Nothing to migrate"
	fi
}

migration_down() {
	local CHANGED=0

	echo "  → Rolling back migration..."

	# Check if rollback needed (idempotent)
	if [ -f "new-file" ]; then
		mv "new-file" "old-file"
		((CHANGED++))
	fi

	if [ $CHANGED -gt 0 ]; then
		echo "  ✅ Rolled back $CHANGED change(s)"
	else
		echo "  ℹ️  Nothing to roll back"
	fi
}
```

## Idempotence Requirements

Both `migration_up()` and `migration_down()` must be safe to run multiple times:

```bash
# Running twice should be safe
migration_up
migration_up  # No error, no duplicate changes

migration_down
migration_down  # No error, no duplicate rollbacks
```

### Achieving Idempotence

✅ **Check before acting:**
```bash
if [ -f "old-file" ]; then
	mv "old-file" "new-file"
fi
```

❌ **Don't assume state:**
```bash
mv "old-file" "new-file"  # Fails if already renamed!
```

## Testing Migrations

Before committing a new migration:

1. **Test forward migration:**
   ```bash
   ai migrate up
   ai migrate up  # Should be idempotent
   ```

2. **Test rollback:**
   ```bash
   ai migrate down
   ai migrate down  # Should be idempotent
   ```

3. **Test full cycle:**
   ```bash
   ai migrate up
   ai migrate down
   ai migrate up  # Should work perfectly
   ```

## Migration State Tracking

The AI CLI tracks applied migrations in `~/.ai-migration-state`:

```
001_rename_agents_to_personas
002_move_config_to_home
```

- One migration ID per line
- Used to determine which migrations need to run
- Managed automatically by `ai migrate`

## Commands

### Apply Pending Migrations
```bash
ai migrate
ai migrate up
```

### Rollback Last Migration
```bash
ai migrate down
```

### Check Migration Status
```bash
ai migrate status
```

Output shows:
- ✅ Applied migrations
- ⏸️ Pending migrations

## Automatic Migration

Migrations run automatically during `ai update`:

1. User runs `ai update`
2. Repo cloned/updated
3. Shell function updated
4. **Migrations run automatically**
5. User gets latest version with all changes applied

## When to Create Migrations

Create a migration when changes affect user installations:

### Requires Migration ✅
- Renaming installed agents/skills
- Moving configuration file locations
- Changing directory structures
- Updating agent/skill file formats
- Changing frontmatter schema

### No Migration Needed ❌
- Adding new features (opt-in via `ai install agents`)
- Documentation updates
- Internal refactoring
- Bug fixes that don't change file locations/formats

## Example: Renaming an Agent

**Before:**
- Users have `~/.claude/agents/old-name.md`

**After:**
- Users should have `~/.claude/agents/new-name.md`

**Migration:**
```bash
migration_up() {
	if [ -f "$HOME/.claude/agents/old-name.md" ]; then
		mv "$HOME/.claude/agents/old-name.md" \
		   "$HOME/.claude/agents/new-name.md"

		# Update frontmatter
		sed -i 's/^name: old-name/name: new-name/' \
			"$HOME/.claude/agents/new-name.md"

		echo "  ✅ Renamed agent"
	else
		echo "  ℹ️  Nothing to migrate"
	fi
}

migration_down() {
	if [ -f "$HOME/.claude/agents/new-name.md" ]; then
		mv "$HOME/.claude/agents/new-name.md" \
		   "$HOME/.claude/agents/old-name.md"

		sed -i 's/^name: new-name/name: old-name/' \
			"$HOME/.claude/agents/old-name.md"

		echo "  ✅ Rolled back rename"
	else
		echo "  ℹ️  Nothing to roll back"
	fi
}
```

## UNBREACHABLE CONSTRAINT

**From AGENT-WORKSPACE.md:**

> When making changes that affect installed agents or configurations, you MUST create a migration before committing/pushing.

This ensures users can upgrade smoothly without manual intervention or breaking their installations.

## Version Bumping

When adding a migration:

1. Create migration file
2. Test thoroughly
3. Bump `AI_VERSION` in `ai-function.sh`:
   - Patch: Bug fixes, minor migrations
   - Minor: New features, significant migrations
   - Major: Breaking changes (rare)
4. Commit with migration

## Migration Workflow for Agents

See [AGENT-WORKSPACE.md](../AGENT-WORKSPACE.md) for the complete agent workflow including migration requirements.
