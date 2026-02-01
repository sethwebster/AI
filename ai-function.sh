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

			# Check for AGENTS.md
			if [ -f "AGENTS.md" ]; then
				echo "⚠️  AGENTS.md already exists in this directory"
				read -p "Overwrite? (y/N) " -n 1 -r
				echo ""
				if [[ ! $REPLY =~ ^[Yy]$ ]]; then
					echo "❌ Cancelled"
					return 1
				fi
			fi

			# Download AGENTS.md
			echo "📥 Downloading AGENTS.md from github.com/sethwebster/AI..."
			if curl -fsSL "https://raw.githubusercontent.com/sethwebster/AI/main/AGENTS.md" -o "AGENTS.md"; then
				echo "✅ AGENTS.md initialized successfully"
			else
				echo "❌ Failed to download AGENTS.md"
				echo "   Check network connection or repository availability"
				return 1
			fi

			# Download AGENT-WORKSPACE.md
			echo "📥 Downloading AGENT-WORKSPACE.md template..."
			if curl -fsSL "https://raw.githubusercontent.com/sethwebster/AI/main/AGENT-WORKSPACE.md" -o "AGENT-WORKSPACE.md"; then
				echo "✅ AGENT-WORKSPACE.md initialized successfully"
				echo "   ℹ️  Edit this file to add workspace-specific information"
			else
				echo "⚠️  Failed to download AGENT-WORKSPACE.md (continuing...)"
			fi

			# Handle CLAUDE.md symlink
			if [ -e "CLAUDE.md" ] && [ ! -L "CLAUDE.md" ]; then
				echo ""
				echo "⚠️  CLAUDE.md exists and is not a symlink"
				read -p "Replace with symlink to AGENTS.md? (y/N) " -n 1 -r
				echo ""
				if [[ $REPLY =~ ^[Yy]$ ]]; then
					rm "CLAUDE.md"
					ln -s "AGENTS.md" "CLAUDE.md"
					echo "🔗 Created symlink: CLAUDE.md -> AGENTS.md"
				fi
			elif [ -L "CLAUDE.md" ]; then
				echo "ℹ️  CLAUDE.md symlink already exists"
			else
				ln -s "AGENTS.md" "CLAUDE.md"
				echo "🔗 Created symlink: CLAUDE.md -> AGENTS.md"
			fi

			echo ""
			echo "📖 Review the best practices:"
			echo "   cat AGENTS.md"
			echo "   cat AGENT-WORKSPACE.md"
			echo ""
			echo "🔗 Source: https://github.com/sethwebster/AI"
			;;

		*)
			echo "AI Development Best Practices CLI"
			echo ""
			echo "Usage:"
			echo "  ai init    - Initialize directory with AGENTS.md and AGENT-WORKSPACE.md"
			echo ""
			echo "More commands coming soon..."
			return 1
			;;
	esac
}
