# AI

Enterprise-grade reference materials for AI-assisted development teams.

This repository is your onboarding bridge, command center, and guardrail layer for building and running AI agent workflows with consistent quality and speed.

## What you get

- **Guidance-first operations**: AGENTS + workspace templates keep every directory aligned.
- **Reliable bootstrap**: `ai init` wires in shared conventions in one step.
- **Fleet-wide updates**: Registry tooling updates every initialized directory together.
- **Production posture**: Explicit architecture, testing, and review expectations baked in.

## Start here (recommended)

1. Install the CLI
2. Initialize your project directory
3. Run updates as your agent network evolves

### 1) Install

Install with `npx` (no global dependencies required):

```bash
npx @sethwebster/ai-cli
```

Or install globally:

```bash
npm install -g @sethwebster/ai-cli
```

Then reload your shell and initialize:

```bash
source ~/.zshrc  # or source ~/.bashrc
ai init
```

### 2) Alternative install paths

If you prefer script-based setup:

```bash
curl -fsSL https://raw.githubusercontent.com/sethwebster/AI/main/install.sh | bash
```

Or install only the shell function manually:

```bash
curl -fsSL https://raw.githubusercontent.com/sethwebster/AI/main/ai-function.sh >> ~/.zshrc
source ~/.zshrc
ai init
```

## Project structure

```text
AI/
├── agents/              # Agent definitions
├── bin/
│   └── install.js       # npm installer script
├── landing-page/        # Documentation website
├── migrations/          # Migration system
├── AGENTS.md            # Universal development guardrails
├── AGENT-WORKSPACE.md   # Workspace-specific template
├── ai-function.sh       # Shell function definition
├── install.sh           # Installer script
├── package.json         # npm package config
└── README.md            # This file
```

## CLI command map

```bash
ai init        # Prepare current directory with AGENTS + workspace template
ai update      # Pull latest AI repo changes into local clone
ai reload      # Reload shell profile so ai function updates take effect immediately
ai update-all  # Update all directories registered for management
ai list        # Show all registered directories
ai forget      # Remove current directory from registry
```

## What `ai init` actually does

1. Updates `~/.ai-repo-local-clone` (shallow clone) to keep references current.
2. Creates stable symlinks in the target directory:
   - `AGENTS.md` → `~/.ai-repo-local-clone/AGENTS.md`
   - `CLAUDE.md` → `~/.ai-repo-local-clone/CLAUDE.md`
3. Copies `AGENT-WORKSPACE.md` from template (only when missing).
4. Registers the directory in `~/.ai-registry` for bulk operations.

That is why `ai update` remains your safest path for synced guidance updates.

## Registry model

The registry is a plain-text file at `~/.ai-registry` with one directory per line.

- **`ai list`**  
  Enumerates active managed directories and marks missing paths.
- **`ai reload`**  
  Reloads your shell profile (`~/.zshrc`/`~/.bashrc`) so local `ai` function updates apply right away.
- **`ai update-all`**  
  Applies updates across all tracked directories in one run.
- **`ai forget`**  
  Removes the current directory from the registry without deleting local files.

## Who should read what first

### For AI agents

Read in this order:

1. `AGENTS.md` – universal safety, quality, and architecture expectations.
2. `AGENT-WORKSPACE.md` – project-specific patterns and current context.

### For developers

Use `AGENTS.md` when you are:

- Designing new AI agent systems.
- Making architecture decisions (ADRs included).
- Defining quality standards or review policy.
- Onboarding teams to production-style AI workflows.

Then use `AGENT-WORKSPACE.md` to capture:

- Local setup and command conventions.
- Active work tracking.
- Project-specific operating rules.

## Website deployment (Next.js)

The documentation site is in `landing-page/`.

### Production target

- Domain: `ai.sethwebster.com`
- Platform: Vercel (recommended)
- CI: `.github/workflows/deploy-landing-page.yml`

### Quick deployment

```bash
cd landing-page
npm install
npm run deploy:prod
```

### Required Vercel config

- Set project root directory to `landing-page/` in Vercel
- Add `ai.sethwebster.com` in Vercel domain settings
- Add GitHub secrets:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`

## Key principles to keep in view

- Explicit over implicit.
- Fail fast, fail loud.
- Optimize for deletion.
- Test-first development mindset.
- ADR discipline for architectural decisions.
- Strict typing and disciplined error boundaries.

## Why this matters

Without a stable baseline, AI projects drift into inconsistent quality, hidden assumptions, and avoidable rework.  
This repository keeps teams moving in the same direction: faster iteration, better decision records, and fewer downstream surprises.
