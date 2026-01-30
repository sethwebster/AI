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

## Purpose

Reference materials and configurations for building production AI systems.

## Structure

```
AI/
├── AGENTS.md       # Agent dev guidelines
└── README.md       # This file
```

## Usage

Consult AGENTS.md when:
- Building AI agent systems
- Making architectural decisions (create ADR first)
- Establishing code standards for new projects
- Training agents on production practices
- Reviewing code quality

## Key Principles

- Explicit over implicit
- Fail fast, fail loud
- Optimize for deletion
- Test-first development (non-negotiable)
- ADRs required for architectural decisions
- Zero tolerance for weak types, magic values, commented code
