# AI Development CLI
AI_VERSION="1.0.0"

ai() {
	local cmd="$1"
	shift

	# Helper: Register current directory
	_ai_register_directory() {
		local REGISTRY="$HOME/.ai-registry"
		local CURRENT_DIR="$(pwd)"

		# Create registry if it doesn't exist
		touch "$REGISTRY"

		# Check if already registered
		if grep -Fxq "$CURRENT_DIR" "$REGISTRY" 2>/dev/null; then
			return 0
		fi

		# Add to registry
		echo "$CURRENT_DIR" >> "$REGISTRY"
	}

	# Helper: Unregister current directory
	_ai_unregister_directory() {
		local REGISTRY="$HOME/.ai-registry"
		local CURRENT_DIR="$(pwd)"

		if [ ! -f "$REGISTRY" ]; then
			return 0
		fi

		# Remove from registry
		grep -Fxv "$CURRENT_DIR" "$REGISTRY" > "$REGISTRY.tmp" && mv "$REGISTRY.tmp" "$REGISTRY"
	}

	case "$cmd" in
		init)
			bat <<'EOF'

            ╔═══════════════════════════════════════════════════════╗
            ║                                                       ║
            ║    ┌────────┐                                        ║
            ║    │        │                    ___                 ║
            ║    │   ∥    │                   /   \                ║
            ║    │   ∥    │     👋           | o o |               ║
            ║    │   ∥    │                   \___/                ║
            ║    │   ∥   /│                    |||                 ║
            ║    │   ∥  / │                   /   \                ║
            ║    │   ∥ /  │                  |  ⚙  |               ║
            ║    │   ∥/   │                   \___/                ║
            ║    │   /    │                  //   \\               ║
            ║    │  /     │                 //     \\              ║
            ║    │ /      │                                        ║
            ║    │/       │          "Hello, Developer!"          ║
            ║    └────────┘                                        ║
            ║     [DOOR]              [FRIENDLY AI ROBOT]          ║
            ║                                                       ║
            ╚═══════════════════════════════════════════════════════╝

EOF
			echo "🤖 Initializing directory with AI development best practices..."
			echo ""

			local REPO_CLONE="$HOME/.ai-repo-local-clone"
			local REPO_URL="https://github.com/sethwebster/AI.git"

			# Always fetch fresh copy
			if [ -d "$REPO_CLONE" ]; then
				echo "📥 Updating local repo at $REPO_CLONE..."
				rm -rf "$REPO_CLONE"
			else
				echo "📥 Cloning repo to $REPO_CLONE..."
			fi

			git clone --depth 1 "$REPO_URL" "$REPO_CLONE"
			rm -rf "$REPO_CLONE/.git"

			# Create symlinks for AGENTS.md
			if [ -e "AGENTS.md" ] && [ ! -L "AGENTS.md" ]; then
				echo ""
				echo "⚠️  AGENTS.md exists and is not a symlink"
				printf "Replace with symlink? (y/N) "
				read -r REPLY < /dev/tty
				echo ""
				if [[ $REPLY =~ ^[Yy]$ ]]; then
					rm "AGENTS.md"
					ln -s "$REPO_CLONE/AGENTS.md" "AGENTS.md"
					echo "🔗 Created symlink: AGENTS.md -> $REPO_CLONE/AGENTS.md"
				fi
			elif [ -L "AGENTS.md" ]; then
				echo "ℹ️  AGENTS.md symlink already exists"
			else
				ln -s "$REPO_CLONE/AGENTS.md" "AGENTS.md"
				echo "🔗 Created symlink: AGENTS.md -> $REPO_CLONE/AGENTS.md"
			fi

			# Create symlink for CLAUDE.md
			if [ -e "CLAUDE.md" ] && [ ! -L "CLAUDE.md" ]; then
				echo ""
				echo "⚠️  CLAUDE.md exists and is not a symlink"
				printf "Replace with symlink? (y/N) "
				read -r REPLY < /dev/tty
				echo ""
				if [[ $REPLY =~ ^[Yy]$ ]]; then
					rm "CLAUDE.md"
					ln -s "$REPO_CLONE/CLAUDE.md" "CLAUDE.md"
					echo "🔗 Created symlink: CLAUDE.md -> $REPO_CLONE/CLAUDE.md"
				fi
			elif [ -L "CLAUDE.md" ]; then
				echo "ℹ️  CLAUDE.md symlink already exists"
			else
				ln -s "$REPO_CLONE/CLAUDE.md" "CLAUDE.md"
				echo "🔗 Created symlink: CLAUDE.md -> $REPO_CLONE/CLAUDE.md"
			fi

			# Copy AGENT-WORKSPACE.md if it doesn't exist
			if [ ! -e "AGENT-WORKSPACE.md" ]; then
				echo "📄 Copying AGENT-WORKSPACE.md template..."
				cp "$REPO_CLONE/AGENT-WORKSPACE.md" "AGENT-WORKSPACE.md"
				echo "✅ AGENT-WORKSPACE.md initialized"
				echo "   ℹ️  Edit this file to add workspace-specific information"
			else
				echo "ℹ️  AGENT-WORKSPACE.md already exists, skipping"
			fi

			# Register this directory
			_ai_register_directory

			echo ""
			echo "📖 Review the best practices:"
			echo "   cat AGENTS.md"
			echo "   cat AGENT-WORKSPACE.md"
			echo ""
			echo "🤖 Available agents (5 specialized agents):"
			echo "   cat $REPO_CLONE/agents/README.md"
			echo ""
			echo "💡 To install agents into Claude Code or Codex:"
			echo "   ai install agents"
			echo ""
			echo "🔗 Source: https://github.com/sethwebster/AI"
			;;

		update)
			local REPO_CLONE="$HOME/.ai-repo-local-clone"
			local REPO_URL="https://github.com/sethwebster/AI.git"

			if [ ! -d "$REPO_CLONE" ]; then
				echo "❌ Local repo not found at $REPO_CLONE"
				echo "   Run 'ai init' first to set up the local repo"
				return 1
			fi

			echo "🔄 Updating AI development best practices..."
			rm -rf "$REPO_CLONE"

			if ! git clone --depth 1 "$REPO_URL" "$REPO_CLONE"; then
				echo "❌ Failed to clone repo"
				return 1
			fi

			rm -rf "$REPO_CLONE/.git"

			echo "✅ Successfully updated local repo"
			echo "   Symlinked files (AGENTS.md, CLAUDE.md) now reflect latest changes"

			# Detect shell
			local SHELL_NAME=$(basename "$SHELL")
			case "$SHELL_NAME" in
				bash)
					local SHELL_RC="$HOME/.bashrc"
					;;
				zsh)
					local SHELL_RC="$HOME/.zshrc"
					;;
				*)
					echo "⚠️  Unknown shell: $SHELL_NAME, skipping function update"
					return 0
					;;
			esac

			# Resolve symlink if needed
			if [ -L "$SHELL_RC" ]; then
				local ACTUAL_RC=$(readlink "$SHELL_RC")
				if [[ "$ACTUAL_RC" != /* ]]; then
					ACTUAL_RC="$(dirname "$SHELL_RC")/$ACTUAL_RC"
				fi
				SHELL_RC="$ACTUAL_RC"
			fi

			# Check if ai function is installed
			if ! grep -q "# AI Development CLI" "$SHELL_RC" 2>/dev/null; then
				echo "⚠️  AI function not found in $SHELL_RC"
				echo "   Skipping function update"
				return 0
			fi

			echo ""
			echo "🔄 Updating ai function in $SHELL_RC..."

			# Remove old function using temp file
			sed '/# AI Development CLI/,/^}$/d' "$SHELL_RC" > /tmp/shell_rc_temp
			chmod --reference="$SHELL_RC" /tmp/shell_rc_temp 2>/dev/null || chmod 644 /tmp/shell_rc_temp
			cat /tmp/shell_rc_temp > "$SHELL_RC"
			rm /tmp/shell_rc_temp

			# Add new function
			cat "$REPO_CLONE/ai-function.sh" >> "$SHELL_RC"

			echo "✅ AI function updated"
			echo ""
			echo "⚠️  Reload your shell to use the updated function:"
			echo "   source $SHELL_RC"
			;;

		update-all)
			local REGISTRY="$HOME/.ai-registry"

			if [ ! -f "$REGISTRY" ]; then
				echo "❌ No registered directories found"
				echo "   Run 'ai init' in a directory first"
				return 1
			fi

			local TOTAL=$(wc -l < "$REGISTRY" | tr -d ' ')
			if [ "$TOTAL" -eq 0 ]; then
				echo "❌ No registered directories found"
				return 1
			fi

			echo "🔄 Updating all $TOTAL registered directories..."
			echo ""

			local SUCCESS=0
			local FAILED=0
			local CURRENT_DIR="$(pwd)"

			while IFS= read -r dir; do
				if [ ! -d "$dir" ]; then
					echo "⚠️  Skipping (not found): $dir"
					((FAILED++))
					continue
				fi

				echo "📁 $dir"
				(cd "$dir" && ai update 2>&1 | sed 's/^/   /')

				if [ $? -eq 0 ]; then
					((SUCCESS++))
				else
					((FAILED++))
				fi
				echo ""
			done < "$REGISTRY"

			cd "$CURRENT_DIR"

			echo "✅ Update complete: $SUCCESS succeeded, $FAILED failed"
			;;

		list)
			local REGISTRY="$HOME/.ai-registry"

			if [ ! -f "$REGISTRY" ] || [ ! -s "$REGISTRY" ]; then
				echo "No registered directories"
				return 0
			fi

			echo "Registered directories:"
			echo ""
			cat "$REGISTRY" | while IFS= read -r dir; do
				if [ -d "$dir" ]; then
					echo "  ✓ $dir"
				else
					echo "  ✗ $dir (not found)"
				fi
			done
			;;

		forget)
			local CURRENT_DIR="$(pwd)"
			_ai_unregister_directory
			echo "✅ Removed $CURRENT_DIR from registry"
			;;

		version|--version|-v)
			echo "AI Development CLI v${AI_VERSION}"
			echo "Source: https://github.com/sethwebster/AI"
			;;

		install)
			local target="$1"

			if [ "$target" != "agents" ]; then
				echo "❌ Unknown install target: $target"
				echo "   Available: agents"
				return 1
			fi

			local REPO_CLONE="$HOME/.ai-repo-local-clone"

			if [ ! -d "$REPO_CLONE/agents" ]; then
				echo "❌ Agents not found in local repo"
				echo "   Run 'ai init' first"
				return 1
			fi

			echo "🤖 Agent Installation"
			echo ""
			echo "Detecting AI coding tools..."
			echo ""

			local DETECTED_TOOLS=()

			# Detect Claude Code
			if command -v claude &> /dev/null || [ -d "$HOME/.claude" ]; then
				DETECTED_TOOLS+=("claude")
				echo "  ✅ Claude Code detected"
			fi

			# Detect Codex
			if command -v codex &> /dev/null; then
				DETECTED_TOOLS+=("codex")
				echo "  ✅ Codex detected"
			fi

			if [ ${#DETECTED_TOOLS[@]} -eq 0 ]; then
				echo "  ⚠️  No AI coding tools detected"
				echo ""
				echo "Supported tools:"
				echo "  - Claude Code (https://claude.com/claude-code)"
				echo "  - Codex"
				return 1
			fi

			echo ""
			echo "Available agents in $REPO_CLONE/agents:"
			echo ""
			echo "  1. Sentinel (Morgan) - neckbeard-code-reviewer"
			echo "  2. Conversion Architect (Avery) - design-visionary"
			echo "  3. Docs Engineer (Sam) - docs-artisan"
			echo "  4. Docs Architect (Emerson) - technical-docs-artist"
			echo "  5. Systems Thinker (Jan) - e6-problem-solver"
			echo ""
			printf "Select agents (space-separated numbers or 'all'): "
			read -r SELECTION < /dev/tty
			echo ""

			# Define agents
			local -a AGENTS=(
				"neckbeard-code-reviewer:Sentinel (Morgan)"
				"design-visionary:Conversion Architect (Avery)"
				"docs-artisan:Docs Engineer (Sam)"
				"technical-docs-artist:Docs Architect (Emerson)"
				"e6-problem-solver:Systems Thinker (Jan)"
			)

			local -a SELECTED_AGENTS=()

			# Parse selection
			if [[ "$SELECTION" == "all" ]]; then
				SELECTED_AGENTS=("${AGENTS[@]}")
			else
				for num in $SELECTION; do
					case $num in
						1) SELECTED_AGENTS+=("${AGENTS[0]}") ;;
						2) SELECTED_AGENTS+=("${AGENTS[1]}") ;;
						3) SELECTED_AGENTS+=("${AGENTS[2]}") ;;
						4) SELECTED_AGENTS+=("${AGENTS[3]}") ;;
						5) SELECTED_AGENTS+=("${AGENTS[4]}") ;;
						*) echo "  ⚠️  Invalid selection: $num" ;;
					esac
				done
			fi

			if [ ${#SELECTED_AGENTS[@]} -eq 0 ]; then
				echo "❌ No agents selected"
				return 1
			fi

			echo "Installing agents for detected tools..."
			echo ""

			# Install for each detected tool
			for tool in "${DETECTED_TOOLS[@]}"; do
				case "$tool" in
					claude)
						echo "📦 Installing for Claude Code..."
						echo ""
						echo "Choose installation location:"
						echo "  1. Project-level (.claude/agents/) - Team sharing"
						echo "  2. User-level (~/.claude/agents/) - Personal only"
						printf "Selection (1/2): "
						read -r LOCATION < /dev/tty
						echo ""

						local AGENT_DIR
						if [ "$LOCATION" = "1" ]; then
							AGENT_DIR=".claude/agents"
							echo "Installing to .claude/agents/ (project-level)..."
						else
							AGENT_DIR="$HOME/.claude/agents"
							echo "Installing to ~/.claude/agents/ (user-level)..."
						fi

						mkdir -p "$AGENT_DIR"

						# Install selected agents
						for agent_info in "${SELECTED_AGENTS[@]}"; do
							local agent_type="${agent_info%%:*}"
							local agent_name="${agent_info##*:}"
							local source_file="$REPO_CLONE/agents/${agent_type}.md"
							local dest_file="$AGENT_DIR/${agent_type}.md"

							if [ -f "$source_file" ]; then
								# Extract frontmatter from source
								local description=$(grep -A 1 "^## Role" "$source_file" | tail -1)

								# Create Claude agent file with frontmatter
								cat > "$dest_file" <<EOF
---
name: ${agent_type}
description: ${description}
tools: Read, Write, Edit, Glob, Grep, Bash, LSP
model: sonnet
---

EOF
								# Append the rest of the markdown (skip first 5 lines: title, blank, agent type, persona, blank)
								tail -n +6 "$source_file" >> "$dest_file"

								echo "  ✅ $agent_name"
							else
								echo "  ❌ $agent_name (source not found)"
							fi
						done
						;;
					codex)
						echo "📦 Installing for Codex..."
						echo ""
						echo "Choose installation scope:"
						echo "  1. Project-scoped (.codex/skills/) - This repo only"
						echo "  2. User-scoped (~/.codex/skills/) - All repos"
						printf "Selection (1/2): "
						read -r SCOPE < /dev/tty
						echo ""

						local SKILLS_DIR
						if [ "$SCOPE" = "1" ]; then
							SKILLS_DIR=".codex/skills"
							echo "Installing to .codex/skills/ (project-scoped)..."
						else
							SKILLS_DIR="${CODEX_HOME:-$HOME/.codex}/skills"
							echo "Installing to ${SKILLS_DIR} (user-scoped)..."
						fi

						mkdir -p "$SKILLS_DIR"

						# Install selected agents as Codex skills
						for agent_info in "${SELECTED_AGENTS[@]}"; do
							local agent_type="${agent_info%%:*}"
							local agent_name="${agent_info##*:}"
							local source_file="$REPO_CLONE/agents/${agent_type}.md"
							local skill_dir="$SKILLS_DIR/${agent_type}"
							local dest_file="$skill_dir/SKILL.md"

							if [ -f "$source_file" ]; then
								mkdir -p "$skill_dir"

								# Extract description (Role section)
								local description=$(grep -A 1 "^## Role" "$source_file" | tail -1)

								# Create Codex SKILL.md with frontmatter
								cat > "$dest_file" <<EOF
---
name: ${agent_type}
description: ${description}
---

EOF
								# Append the rest of the markdown (skip first 5 lines)
								tail -n +6 "$source_file" >> "$dest_file"

								echo "  ✅ $agent_name"
							else
								echo "  ❌ $agent_name (source not found)"
							fi
						done
						;;
				esac
			done

			echo ""
			echo "✅ Agent installation complete"
			echo ""
			echo "📖 Learn more: cat $REPO_CLONE/agents/README.md"
			echo ""

			# Tool-specific restart instructions
			for tool in "${DETECTED_TOOLS[@]}"; do
				case "$tool" in
					claude)
						echo "🔄 Restart Claude Code to load the new agents"
						;;
					codex)
						echo "🔄 Restart Codex or start a new session to load the new skills"
						;;
				esac
			done
			;;

		*)
			echo "AI Development Best Practices CLI v${AI_VERSION}"
			echo ""
			echo "Usage:"
			echo "  ai init           - Initialize directory with AI dev best practices"
			echo "  ai install agents - Install agent definitions into Claude/Codex"
			echo "  ai update         - Update local repo and ai function"
			echo "  ai update-all     - Update all registered directories"
			echo "  ai list           - List registered directories"
			echo "  ai forget         - Remove current directory from registry"
			echo "  ai version        - Show version information"
			echo ""
			echo "Source: https://github.com/sethwebster/AI"
			return 1
			;;
	esac
}
