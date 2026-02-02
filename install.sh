#!/bin/bash
set -e

echo "🤖 Installing AI Development CLI..."
echo ""

# Detect shell
SHELL_NAME=$(basename "$SHELL")
case "$SHELL_NAME" in
    bash)
        SHELL_RC="$HOME/.bashrc"
        ;;
    zsh)
        SHELL_RC="$HOME/.zshrc"
        ;;
    fish)
        echo "❌ Fish shell not yet supported"
        echo "   Please add the function manually from:"
        echo "   https://github.com/sethwebster/AI/blob/main/ai-function.sh"
        exit 1
        ;;
    *)
        echo "⚠️  Unknown shell: $SHELL_NAME"
        echo "   Defaulting to ~/.bashrc"
        SHELL_RC="$HOME/.bashrc"
        ;;
esac

echo "📥 Downloading ai function for $SHELL_NAME..."

# Download the function
if curl -fsSL "https://raw.githubusercontent.com/sethwebster/AI/main/ai-function.sh" > /tmp/ai-function.sh; then
    echo "✅ Downloaded successfully"
else
    echo "❌ Failed to download ai function"
    exit 1
fi

# Check if already installed
if grep -q "# AI Development CLI" "$SHELL_RC" 2>/dev/null; then
    echo ""
    echo "⚠️  AI function already installed in $SHELL_RC"
    printf "Reinstall? (y/N) "
    read -r REPLY < /dev/tty
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Installation cancelled"
        rm /tmp/ai-function.sh
        exit 0
    fi

    # Remove old installation
    echo "🗑️  Removing old installation..."
    sed -i.bak '/# AI Development CLI/,/^}$/d' "$SHELL_RC"
fi

echo "📝 Adding ai function to $SHELL_RC..."
cat /tmp/ai-function.sh >> "$SHELL_RC"
rm /tmp/ai-function.sh

echo ""
echo "✅ Installation complete!"
echo ""
echo "To use the AI CLI:"
echo "  1. Reload your shell: source $SHELL_RC"
echo "  2. Run: ai init"
echo ""
echo "Or open a new terminal and run: ai init"
echo ""
echo "To update later: ai update"
