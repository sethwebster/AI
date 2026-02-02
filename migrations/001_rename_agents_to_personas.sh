#!/bin/bash
# Migration: 001
# Description: Rename old agent names to persona-based names
# Version: 1.0.1
# Date: 2026-02-02

migration_up() {
	local CHANGED=0

	echo "  → Migrating agent names to persona-based names..."

	# Claude Code agents
	if [ -d "$HOME/.claude/agents" ]; then
		if [ -f "$HOME/.claude/agents/neckbeard-code-reviewer.md" ]; then
			mv "$HOME/.claude/agents/neckbeard-code-reviewer.md" "$HOME/.claude/agents/sentinel.md" 2>/dev/null && ((CHANGED++))
		fi
		if [ -f "$HOME/.claude/agents/design-visionary.md" ]; then
			mv "$HOME/.claude/agents/design-visionary.md" "$HOME/.claude/agents/conversion-architect.md" 2>/dev/null && ((CHANGED++))
		fi
		if [ -f "$HOME/.claude/agents/docs-artisan.md" ]; then
			mv "$HOME/.claude/agents/docs-artisan.md" "$HOME/.claude/agents/docs-engineer.md" 2>/dev/null && ((CHANGED++))
		fi
		if [ -f "$HOME/.claude/agents/technical-docs-artist.md" ]; then
			mv "$HOME/.claude/agents/technical-docs-artist.md" "$HOME/.claude/agents/docs-architect.md" 2>/dev/null && ((CHANGED++))
		fi
		if [ -f "$HOME/.claude/agents/e6-problem-solver.md" ]; then
			mv "$HOME/.claude/agents/e6-problem-solver.md" "$HOME/.claude/agents/systems-thinker.md" 2>/dev/null && ((CHANGED++))
		fi
	fi

	# Codex skills
	local CODEX_SKILLS="${CODEX_HOME:-$HOME/.codex}/skills"
	if [ -d "$CODEX_SKILLS" ]; then
		if [ -d "$CODEX_SKILLS/neckbeard-code-reviewer" ]; then
			mv "$CODEX_SKILLS/neckbeard-code-reviewer" "$CODEX_SKILLS/sentinel" 2>/dev/null && ((CHANGED++))
		fi
		if [ -d "$CODEX_SKILLS/design-visionary" ]; then
			mv "$CODEX_SKILLS/design-visionary" "$CODEX_SKILLS/conversion-architect" 2>/dev/null && ((CHANGED++))
		fi
		if [ -d "$CODEX_SKILLS/docs-artisan" ]; then
			mv "$CODEX_SKILLS/docs-artisan" "$CODEX_SKILLS/docs-engineer" 2>/dev/null && ((CHANGED++))
		fi
		if [ -d "$CODEX_SKILLS/technical-docs-artist" ]; then
			mv "$CODEX_SKILLS/technical-docs-artist" "$CODEX_SKILLS/docs-architect" 2>/dev/null && ((CHANGED++))
		fi
		if [ -d "$CODEX_SKILLS/e6-problem-solver" ]; then
			mv "$CODEX_SKILLS/e6-problem-solver" "$CODEX_SKILLS/systems-thinker" 2>/dev/null && ((CHANGED++))
		fi
	fi

	# Update frontmatter in renamed files
	if [ -d "$HOME/.claude/agents" ]; then
		for agent in sentinel conversion-architect docs-engineer docs-architect systems-thinker; do
			local file="$HOME/.claude/agents/${agent}.md"
			if [ -f "$file" ]; then
				sed -i.bak "s/^name: .*/name: ${agent}/" "$file" 2>/dev/null && rm -f "${file}.bak"
			fi
		done
	fi

	if [ -d "$CODEX_SKILLS" ]; then
		for skill in sentinel conversion-architect docs-engineer docs-architect systems-thinker; do
			local file="$CODEX_SKILLS/${skill}/SKILL.md"
			if [ -f "$file" ]; then
				sed -i.bak "s/^name: .*/name: ${skill}/" "$file" 2>/dev/null && rm -f "${file}.bak"
			fi
		done
	fi

	if [ $CHANGED -gt 0 ]; then
		echo "  ✅ Migrated $CHANGED agent(s)"
	else
		echo "  ℹ️  No agents to migrate"
	fi
}

migration_down() {
	local CHANGED=0

	echo "  → Rolling back agent names to technical names..."

	# Claude Code agents
	if [ -d "$HOME/.claude/agents" ]; then
		if [ -f "$HOME/.claude/agents/sentinel.md" ]; then
			mv "$HOME/.claude/agents/sentinel.md" "$HOME/.claude/agents/neckbeard-code-reviewer.md" 2>/dev/null && ((CHANGED++))
		fi
		if [ -f "$HOME/.claude/agents/conversion-architect.md" ]; then
			mv "$HOME/.claude/agents/conversion-architect.md" "$HOME/.claude/agents/design-visionary.md" 2>/dev/null && ((CHANGED++))
		fi
		if [ -f "$HOME/.claude/agents/docs-engineer.md" ]; then
			mv "$HOME/.claude/agents/docs-engineer.md" "$HOME/.claude/agents/docs-artisan.md" 2>/dev/null && ((CHANGED++))
		fi
		if [ -f "$HOME/.claude/agents/docs-architect.md" ]; then
			mv "$HOME/.claude/agents/docs-architect.md" "$HOME/.claude/agents/technical-docs-artist.md" 2>/dev/null && ((CHANGED++))
		fi
		if [ -f "$HOME/.claude/agents/systems-thinker.md" ]; then
			mv "$HOME/.claude/agents/systems-thinker.md" "$HOME/.claude/agents/e6-problem-solver.md" 2>/dev/null && ((CHANGED++))
		fi
	fi

	# Codex skills
	local CODEX_SKILLS="${CODEX_HOME:-$HOME/.codex}/skills"
	if [ -d "$CODEX_SKILLS" ]; then
		if [ -d "$CODEX_SKILLS/sentinel" ]; then
			mv "$CODEX_SKILLS/sentinel" "$CODEX_SKILLS/neckbeard-code-reviewer" 2>/dev/null && ((CHANGED++))
		fi
		if [ -d "$CODEX_SKILLS/conversion-architect" ]; then
			mv "$CODEX_SKILLS/conversion-architect" "$CODEX_SKILLS/design-visionary" 2>/dev/null && ((CHANGED++))
		fi
		if [ -d "$CODEX_SKILLS/docs-engineer" ]; then
			mv "$CODEX_SKILLS/docs-engineer" "$CODEX_SKILLS/docs-artisan" 2>/dev/null && ((CHANGED++))
		fi
		if [ -d "$CODEX_SKILLS/docs-architect" ]; then
			mv "$CODEX_SKILLS/docs-architect" "$CODEX_SKILLS/technical-docs-artist" 2>/dev/null && ((CHANGED++))
		fi
		if [ -d "$CODEX_SKILLS/systems-thinker" ]; then
			mv "$CODEX_SKILLS/systems-thinker" "$CODEX_SKILLS/e6-problem-solver" 2>/dev/null && ((CHANGED++))
		fi
	fi

	# Update frontmatter in renamed files
	if [ -d "$HOME/.claude/agents" ]; then
		for agent in neckbeard-code-reviewer design-visionary docs-artisan technical-docs-artist e6-problem-solver; do
			local file="$HOME/.claude/agents/${agent}.md"
			if [ -f "$file" ]; then
				sed -i.bak "s/^name: .*/name: ${agent}/" "$file" 2>/dev/null && rm -f "${file}.bak"
			fi
		done
	fi

	if [ -d "$CODEX_SKILLS" ]; then
		for skill in neckbeard-code-reviewer design-visionary docs-artisan technical-docs-artist e6-problem-solver; do
			local file="$CODEX_SKILLS/${skill}/SKILL.md"
			if [ -f "$file" ]; then
				sed -i.bak "s/^name: .*/name: ${skill}/" "$file" 2>/dev/null && rm -f "${file}.bak"
			fi
		done
	fi

	if [ $CHANGED -gt 0 ]; then
		echo "  ✅ Rolled back $CHANGED agent(s)"
	else
		echo "  ℹ️  No agents to roll back"
	fi
}
