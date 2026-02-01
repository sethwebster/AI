# AI

Personal tools, configs, and guidelines for AI development.

## Contents

- **[AGENTS.md](./AGENTS.md)** - Enterprise-grade agent development guide
  - Code quality standards
  - Architecture patterns
  - Testing requirements
  - Security best practices
  - Performance optimization
  - ADR workflow for architectural decisions
- **[AGENT-WORKSPACE.md](./AGENT-WORKSPACE.md)** - Workspace-specific template
  - Project context and setup
  - Development commands
  - Current work tracking
  - Project-specific patterns

## Purpose

Reference materials and configurations for building production AI systems.

## Installation

### Quick Install (Recommended)

Install the `ai` CLI tool with one command:

```bash
curl -fsSL https://raw.githubusercontent.com/sethwebster/AI/main/install.sh | bash
```

Then reload your shell and initialize your project:

```bash
source ~/.zshrc  # or ~/.bashrc for bash
ai init
```

### Manual Installation

Add the function to your shell config:

```bash
# Download the function
curl -fsSL https://raw.githubusercontent.com/sethwebster/AI/main/ai-function.sh >> ~/.zshrc

# Reload your shell
source ~/.zshrc

# Initialize a project
ai init
```

## Structure

```
AI/
├── AGENTS.md            # Agent dev guidelines
├── AGENT-WORKSPACE.md   # Workspace template
├── ai-function.sh       # Shell function definition
├── install.sh           # Installer script
└── README.md            # This file
```

## Usage

### AI CLI

```bash
ai init    # Initialize directory with AGENTS.md and AGENT-WORKSPACE.md
```

### For AI Agents

**Read in this order:**
1. **[AGENTS.md](./AGENTS.md)** - Universal best practices
2. **[AGENT-WORKSPACE.md](./AGENT-WORKSPACE.md)** - Workspace-specific context

### For Developers

Consult AGENTS.md when:
- Building AI agent systems
- Making architectural decisions (create ADR first)
- Establishing code standards for new projects
- Training agents on production practices
- Reviewing code quality

Use AGENT-WORKSPACE.md to:
- Document project-specific patterns
- Track current work and context
- Define development commands
- Provide workspace setup instructions

## Key Principles

- Explicit over implicit
- Fail fast, fail loud
- Optimize for deletion
- Test-first development (non-negotiable)
- ADRs required for architectural decisions
- Zero tolerance for weak types, magic values, commented code
