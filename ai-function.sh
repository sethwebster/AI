# AI Development CLI
ai() {
	local cmd="$1"
	shift
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
				(cd "$REPO_CLONE" && git pull --depth 1) || {
					echo "⚠️  Failed to update repo, trying fresh clone..."
					rm -rf "$REPO_CLONE"
					git clone --depth 1 "$REPO_URL" "$REPO_CLONE"
				}
			else
				echo "📥 Cloning repo to $REPO_CLONE..."
				git clone --depth 1 "$REPO_URL" "$REPO_CLONE"
			fi

			# Create symlinks for AGENTS.md
			if [ -e "AGENTS.md" ] && [ ! -L "AGENTS.md" ]; then
				echo ""
				echo "⚠️  AGENTS.md exists and is not a symlink"
				read -p "Replace with symlink? (y/N) " -n 1 -r
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
				read -p "Replace with symlink? (y/N) " -n 1 -r
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

			echo ""
			echo "📖 Review the best practices:"
			echo "   cat AGENTS.md"
			echo "   cat AGENT-WORKSPACE.md"
			echo ""
			echo "🔗 Source: https://github.com/sethwebster/AI"
			;;

		update)
			local REPO_CLONE="$HOME/.ai-repo-local-clone"

			if [ ! -d "$REPO_CLONE" ]; then
				echo "❌ Local repo not found at $REPO_CLONE"
				echo "   Run 'ai init' first to set up the local repo"
				return 1
			fi

			echo "🔄 Updating AI development best practices..."
			(cd "$REPO_CLONE" && git pull --depth 1)

			if [ $? -ne 0 ]; then
				echo "❌ Failed to update repo"
				return 1
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
			sed -i.bak '/# AI Development CLI/,/^}$/d' "$SHELL_RC"

			# Add new function
			cat "$REPO_CLONE/ai-function.sh" >> "$SHELL_RC"

			echo "✅ AI function updated"
			echo ""
			echo "⚠️  Reload your shell to use the updated function:"
			echo "   source $SHELL_RC"
			;;

		*)
			echo "AI Development Best Practices CLI"
			echo ""
			echo "Usage:"
			echo "  ai init    - Initialize directory with AGENTS.md and AGENT-WORKSPACE.md"
			echo "  ai update  - Update local repo with latest changes"
			echo ""
			return 1
			;;
	esac
}
