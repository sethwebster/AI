# Claude Code Agents

This directory contains definitions and usage guides for specialized Claude Code agents available through the Task tool.

## Available Agents

### [Neckbeard Code Reviewer](./neckbeard-code-reviewer.md)
**Type:** `neckbeard-code-reviewer`

Rigorous, uncompromising code review focused on security, maintainability, DRY principles, and architectural elegance. Deploy after completing code chunks, features, or refactors.

**Best for:**
- Security vulnerability detection
- Architecture review
- Edge case identification
- Race condition analysis

---

### [Design Visionary](./design-visionary.md)
**Type:** `design-visionary`

Creates emotionally resonant, conversion-optimized designs that balance cutting-edge trends with tasteful execution.

**Best for:**
- Landing pages
- Product pages
- Mobile app UI
- Design systems
- Animation strategy

---

### [Docs Artisan](./docs-artisan.md)
**Type:** `docs-artisan`

Creates, updates, and improves documentation for features, APIs, components, and systems. Use proactively after implementing new features.

**Best for:**
- API documentation
- User guides
- README files
- Architecture docs
- Tutorials

---

### [Technical Docs Artist](./technical-docs-artist.md)
**Type:** `technical-docs-artist`

Creates award-worthy technical documentation with exceptional presentation while maintaining technical precision. Elevates documentation beyond functional to beautiful.

**Best for:**
- Standout API docs
- Beautiful READMEs
- Engaging technical content
- Visual documentation
- Creative layouts

---

### [E6 Problem Solver](./e6-problem-solver.md)
**Type:** `e6-problem-solver`

Senior staff engineer-level collaborative problem-solving for complex, ambiguous architectural challenges.

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

| Agent | When to Use | Key Strength |
|-------|------------|--------------|
| neckbeard-code-reviewer | After implementation | Security & architecture |
| design-visionary | UI/UX design needed | Conversion & emotion |
| docs-artisan | Documentation needed | Clear, functional docs |
| technical-docs-artist | Standout docs needed | Beautiful presentation |
| e6-problem-solver | Complex problems | Collaborative analysis |

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

**docs-artisan vs technical-docs-artist**

| Aspect | docs-artisan | technical-docs-artist |
|--------|--------------|----------------------|
| Style | Professional, clear | Creative, beautiful |
| Use Case | Standard docs | Standout docs |
| Focus | Functionality | Presentation + functionality |

**When to use each:**
- Standard API docs, guides, READMEs → **docs-artisan**
- Marketing/public docs, flagship projects → **technical-docs-artist**

### Problem-Solving Agents

**General vs e6-problem-solver**

| Aspect | General Agent | e6-problem-solver |
|--------|--------------|-------------------|
| Complexity | Simple to moderate | Complex, ambiguous |
| Approach | Direct implementation | Collaborative analysis |
| Use Case | Clear requirements | Unclear/multiple approaches |

**When to use each:**
- Well-defined tasks → **general agent**
- Architectural decisions, complex problems → **e6-problem-solver**

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
