# AI Development CLI
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

			# Clone or update the repo
			if [ -d "$REPO_CLONE" ]; then
				echo "📥 Updating local repo at $REPO_CLONE..."
				if ! (cd "$REPO_CLONE" && git pull --depth 1); then
					echo ""
					echo "⚠️  Local clone is out of sync with remote"
					echo "   This will delete $REPO_CLONE and re-clone fresh"
					printf "Force reset? (y/N) "
					read -r REPLY < /dev/tty
					echo ""
					if [[ ! $REPLY =~ ^[Yy]$ ]]; then
						echo "❌ Cancelled - local clone unchanged"
						return 1
					fi
					rm -rf "$REPO_CLONE"
					git clone --depth 1 "$REPO_URL" "$REPO_CLONE"
				fi
			else
				echo "📥 Cloning repo to $REPO_CLONE..."
				git clone --depth 1 "$REPO_URL" "$REPO_CLONE"
			fi

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

			# Prompt to install agents
			echo "🤖 Would you like to install agent definitions?"
			printf "Install agents? (Y/n) "
			read -r INSTALL_AGENTS < /dev/tty
			echo ""

			if [[ ! "$INSTALL_AGENTS" =~ ^[Nn]$ ]]; then
				ai install agents
			else
				echo "ℹ️  You can install agents later with: ai install agents"
			fi

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
			if ! (cd "$REPO_CLONE" && git pull --depth 1); then
				echo ""
				echo "⚠️  Local clone is out of sync with remote"
				echo "   This will delete $REPO_CLONE and re-clone fresh"
				printf "Force reset? (y/N) "
				read -r REPLY < /dev/tty
				echo ""
				if [[ ! $REPLY =~ ^[Yy]$ ]]; then
					echo "❌ Cancelled - local clone unchanged"
					return 1
				fi
				rm -rf "$REPO_CLONE"
				if ! git clone --depth 1 "$REPO_URL" "$REPO_CLONE"; then
					echo "❌ Failed to clone repo"
					return 1
				fi
			fi

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

			# Check if ai function is installed
			if ! grep -q "# AI Development CLI" "$SHELL_RC" 2>/dev/null; then
				echo "⚠️  AI function not found in $SHELL_RC"
				echo "   Skipping function update"
				return 0
			fi

			echo ""
			echo "🔄 Updating ai function in $SHELL_RC..."

			# Remove old function
			sed '/# AI Development CLI/,/^}$/d' "$SHELL_RC" > "$SHELL_RC.tmp" && mv "$SHELL_RC.tmp" "$SHELL_RC"

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

		install)
			local target="$1"

			if [ "$target" != "agents" ]; then
				echo "❌ Unknown install target: $target"
				echo "   Available: agents"
				return 1
			fi

			local REPO_CLONE="$HOME/.ai-repo-local-clone"

			if [ ! -d "$REPO_CLONE" ]; then
				echo "❌ Local repo not found"
				echo "   Run 'ai init' first"
				return 1
			fi

			if [ ! -d "$REPO_CLONE/agents" ]; then
				echo "❌ Agents not found in local repo"
				return 1
			fi

			echo "🤖 Agent Installation"
			echo ""
			echo "Select agents to install (space-separated numbers or 'all'):"
			echo ""
			echo "  0. All agents"
			echo "  1. Sentinel (Morgan) - Code review & architecture"
			echo "  2. Conversion Architect (Avery) - Design & UX"
			echo "  3. Docs Engineer (Sam) - Functional documentation"
			echo "  4. Docs Architect (Emerson) - Award-worthy docs"
			echo "  5. Systems Thinker (Jan) - Complex problem solving"
			echo ""
			printf "Selection: "
			read -r SELECTION < /dev/tty
			echo ""

			# Create agents directory
			mkdir -p agents

			# Define agents
			local -a AGENT_FILES=(
				"neckbeard-code-reviewer.md:Sentinel (Morgan)"
				"design-visionary.md:Conversion Architect (Avery)"
				"docs-artisan.md:Docs Engineer (Sam)"
				"technical-docs-artist.md:Docs Architect (Emerson)"
				"e6-problem-solver.md:Systems Thinker (Jan)"
			)

			local INSTALLED=0

			# Handle "all" or "0"
			if [[ "$SELECTION" == "all" ]] || [[ "$SELECTION" =~ (^|[[:space:]])0([[:space:]]|$) ]]; then
				echo "📦 Installing all agents..."
				echo ""
				for agent_info in "${AGENT_FILES[@]}"; do
					local file="${agent_info%%:*}"
					local name="${agent_info##*:}"
					cp "$REPO_CLONE/agents/$file" "agents/$file"
					echo "  ✅ $name"
					((INSTALLED++))
				done
				# Also copy README
				cp "$REPO_CLONE/agents/README.md" "agents/README.md"
				echo "  ✅ README"
			else
				# Handle individual selections
				for num in $SELECTION; do
					case $num in
						1)
							cp "$REPO_CLONE/agents/neckbeard-code-reviewer.md" "agents/"
							echo "  ✅ Sentinel (Morgan)"
							((INSTALLED++))
							;;
						2)
							cp "$REPO_CLONE/agents/design-visionary.md" "agents/"
							echo "  ✅ Conversion Architect (Avery)"
							((INSTALLED++))
							;;
						3)
							cp "$REPO_CLONE/agents/docs-artisan.md" "agents/"
							echo "  ✅ Docs Engineer (Sam)"
							((INSTALLED++))
							;;
						4)
							cp "$REPO_CLONE/agents/technical-docs-artist.md" "agents/"
							echo "  ✅ Docs Architect (Emerson)"
							((INSTALLED++))
							;;
						5)
							cp "$REPO_CLONE/agents/e6-problem-solver.md" "agents/"
							echo "  ✅ Systems Thinker (Jan)"
							((INSTALLED++))
							;;
						*)
							if [ "$num" != "0" ]; then
								echo "  ⚠️  Invalid selection: $num"
							fi
							;;
					esac
				done

				# Copy README if any agents were installed
				if [ $INSTALLED -gt 0 ]; then
					cp "$REPO_CLONE/agents/README.md" "agents/README.md"
					echo "  ✅ README"
				fi
			fi

			echo ""
			if [ $INSTALLED -gt 0 ]; then
				echo "✅ Installed $INSTALLED agent(s) to ./agents/"
				echo ""
				echo "📖 Learn more: cat agents/README.md"
			else
				echo "❌ No agents installed"
				return 1
			fi
			;;

		*)
			echo "AI Development Best Practices CLI"
			echo ""
			echo "Usage:"
			echo "  ai init           - Initialize directory with AI dev best practices"
			echo "  ai install agents - Install agent definitions"
			echo "  ai update         - Update local repo and ai function"
			echo "  ai update-all     - Update all registered directories"
			echo "  ai list           - List registered directories"
			echo "  ai forget         - Remove current directory from registry"
			echo ""
			echo "Source: https://github.com/sethwebster/AI"
			return 1
			;;
	esac
}
