# Claude Code Agents

This directory contains definitions and usage guides for specialized Claude Code agents available through the Task tool.

## Available Agents

### [Sentinel](./neckbeard-code-reviewer.md) (Morgan)
**Type:** `neckbeard-code-reviewer`

Uber Tech Lead & system steward providing senior oversight across code, architecture, and design; flags long-term risks, enforces engineering values, and intervenes when decisions threaten system coherence.

**Best for:**
- Security vulnerability detection
- Architecture review
- Edge case identification
- Race condition analysis

---

### [Conversion Architect](./design-visionary.md) (Avery)
**Type:** `design-visionary`

Conversion-optimized design strategist focused on user behavior, growth leverage, UX clarity, and commercially effective design decisions.

**Best for:**
- Landing pages
- Product pages
- Mobile app UI
- Design systems
- Animation strategy

---

### [Docs Engineer](./docs-artisan.md) (Sam)
**Type:** `docs-artisan`

Implementation-grade documentation focused on accuracy, clarity, completeness, and developer usability; eliminates ambiguity and ensures docs are shippable.

**Best for:**
- API documentation
- User guides
- README files
- Architecture docs
- Tutorials

---

### [Docs Architect](./technical-docs-artist.md) (Emerson)
**Type:** `technical-docs-artist`

High-polish, narrative-driven technical documentation with strong structure, voice, and presentation quality suitable for public, award-level docs.

**Best for:**
- Standout API docs
- Beautiful READMEs
- Engaging technical content
- Visual documentation
- Creative layouts

---

### [Systems Thinker](./e6-problem-solver.md) (Jan)
**Type:** `e6-problem-solver`

Deep, multi-layer systems problem solver that reasons across constraints, abstractions, and edge cases to arrive at durable, principled solutions.

**Best for:**
- Architectural decisions
- Race conditions
- Performance optimization
- System design
- Complex feature design

---

## How to Use

### Basic Invocation
```typescript
// Using the Task tool in Claude Code
{
  subagent_type: "agent-name",
  description: "Short description (3-5 words)",
  prompt: "Detailed prompt with full context"
}
```

### Quick Reference

| Agent | Persona | When to Use | Key Strength |
|-------|---------|------------|--------------|
| Sentinel | Morgan | After implementation | Security & architecture |
| Conversion Architect | Avery | UI/UX design needed | Conversion & growth |
| Docs Engineer | Sam | Documentation needed | Clear, functional docs |
| Docs Architect | Emerson | Standout docs needed | Beautiful presentation |
| Systems Thinker | Jan | Complex problems | Multi-layer analysis |

## Best Practices

1. **Use the right agent** - Each has a specific purpose
2. **Provide context** - More context = better results
3. **Be specific** - Clear prompts get better responses
4. **Combine agents** - Use multiple agents for complex tasks
5. **Proactive usage** - Use docs agents after features, code reviewer after implementation

## Examples

### After Feature Implementation
```typescript
// 1. Review the code
{
  subagent_type: "neckbeard-code-reviewer",
  description: "Review auth implementation",
  prompt: "Review JWT authentication in src/auth/ for security issues"
}

// 2. Document it
{
  subagent_type: "docs-artisan",
  description: "Document auth system",
  prompt: "Create documentation for JWT auth system including setup, usage, and security considerations"
}
```

### New Landing Page
```typescript
// 1. Design it
{
  subagent_type: "design-visionary",
  description: "Design SaaS landing page",
  prompt: "Create design system for SaaS landing page targeting technical decision-makers"
}

// 2. Beautiful docs
{
  subagent_type: "technical-docs-artist",
  description: "Document design system",
  prompt: "Create beautiful documentation for the design system including color palette, typography, spacing, and components"
}
```

### Complex Problem
```typescript
// 1. Solve it
{
  subagent_type: "e6-problem-solver",
  description: "Fix double-booking race condition",
  prompt: "Users can double-book slots. PostgreSQL database. Help design solution preventing double-booking."
}

// 2. Review solution
{
  subagent_type: "neckbeard-code-reviewer",
  description: "Review booking fix",
  prompt: "Review the double-booking prevention implementation for race conditions and edge cases"
}
```

## Agent Comparison

### Documentation Agents

**Docs Engineer (Sam) vs Docs Architect (Emerson)**

| Aspect | Docs Engineer | Docs Architect |
|--------|--------------|----------------|
| Style | Professional, clear | Creative, beautiful |
| Use Case | Standard docs | Standout docs |
| Focus | Functionality | Presentation + functionality |

**When to use each:**
- Standard API docs, guides, READMEs → **Docs Engineer (Sam)**
- Marketing/public docs, flagship projects → **Docs Architect (Emerson)**

### Problem-Solving Agents

**General vs Systems Thinker (Jan)**

| Aspect | General Agent | Systems Thinker |
|--------|--------------|-----------------|
| Complexity | Simple to moderate | Complex, ambiguous |
| Approach | Direct implementation | Multi-layer analysis |
| Use Case | Clear requirements | Unclear/multiple approaches |

**When to use each:**
- Well-defined tasks → **general agent**
- Architectural decisions, complex problems → **Systems Thinker (Jan)**

## Contributing

To add a new agent definition:

1. Create `agents/agent-name.md`
2. Include: purpose, when to deploy, expertise, examples, how to invoke
3. Update this README with a summary
4. Keep format consistent with existing agents

## Resources

- [Claude Code Documentation](https://github.com/anthropics/claude-code)
- [Agent Best Practices](../CLAUDE.md)
- [Workspace Guide](../AGENT-WORKSPACE.md)
