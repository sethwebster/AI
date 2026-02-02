# Claude Code Agents

This directory contains definitions and usage guides for specialized Claude Code agents available through the Task tool.

## Available Agents

### [Sentinel](./sentinel.md) (Morgan)
**Type:** `sentinel`

Uber Tech Lead & system steward providing senior oversight across code, architecture, and design; flags long-term risks, enforces engineering values, and intervenes when decisions threaten system coherence.

**Best for:**
- Security vulnerability detection
- Architecture review
- Edge case identification
- Race condition analysis

---

### [Product/UX Designer](./product-ux-designer.md) (Avery)
**Type:** `product-ux-designer`

World-class product and UX designer focused on user-centered design, interface excellence, visual hierarchy, and shipping beautiful products that users love.

**Best for:**
- Product interfaces
- Design systems
- User flows
- Mobile app UI
- Landing pages

---

### [Docs Engineer](./docs-engineer.md) (Sam)
**Type:** `docs-engineer`

Implementation-grade documentation focused on accuracy, clarity, completeness, and developer usability; eliminates ambiguity and ensures docs are shippable.

**Best for:**
- API documentation
- User guides
- README files
- Architecture docs
- Tutorials

---

### [Docs Architect](./docs-architect.md) (Emerson)
**Type:** `docs-architect`

High-polish, narrative-driven technical documentation with strong structure, voice, and presentation quality suitable for public, award-level docs.

**Best for:**
- Standout API docs
- Beautiful READMEs
- Engaging technical content
- Visual documentation
- Creative layouts

---

### [Systems Thinker](./systems-thinker.md) (Jan)
**Type:** `systems-thinker`

Deep, multi-layer systems problem solver that reasons across constraints, abstractions, and edge cases to arrive at durable, principled solutions.

**Best for:**
- Architectural decisions
- Race conditions
- Performance optimization
- System design
- Complex feature design

---

### [Compiler Expert](./compiler-expert.md) (Kai)
**Type:** `compiler-expert`

Deep compiler and language implementation specialist with expertise in parsing, optimization, code generation, and runtime systems.

**Best for:**
- Compiler/interpreter implementation
- Parser design
- Type systems
- Code optimization
- AST transformations
- Static analysis

---

### [Systems Engineer](./systems-engineer.md) (Riley)
**Type:** `systems-engineer`

Infrastructure and distributed systems specialist focused on scalability, reliability, observability, and operational excellence at scale.

**Best for:**
- Kubernetes/Docker orchestration
- CI/CD pipelines
- Monitoring and observability
- Database scaling
- Infrastructure as Code
- Production incidents

---

### [Hardware Engineer](./hardware-engineer.md) (Quinn)
**Type:** `hardware-engineer`

Hardware and embedded systems specialist with expertise in circuit design, firmware development, hardware-software interfaces, and low-level optimization.

**Best for:**
- Firmware development
- Circuit design
- IoT devices
- Embedded systems
- Communication protocols (I2C, SPI, UART)
- Hardware debugging

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
| Product/UX Designer | Avery | UI/UX design needed | Interface excellence |
| Docs Engineer | Sam | Documentation needed | Clear, functional docs |
| Docs Architect | Emerson | Standout docs needed | Beautiful presentation |
| Systems Thinker | Jan | Complex problems | Multi-layer analysis |
| Compiler Expert | Kai | Compiler/language work | Parsing & optimization |
| Systems Engineer | Riley | Infrastructure/ops | Scalability & reliability |
| Hardware Engineer | Quinn | Embedded/IoT | Firmware & circuits |

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
  subagent_type: "sentinel",
  description: "Review auth implementation",
  prompt: "Review JWT authentication in src/auth/ for security issues"
}

// 2. Document it
{
  subagent_type: "docs-engineer",
  description: "Document auth system",
  prompt: "Create documentation for JWT auth system including setup, usage, and security considerations"
}
```

### New Landing Page
```typescript
// 1. Design it
{
  subagent_type: "product-ux-designer",
  description: "Design SaaS landing page",
  prompt: "Create design system for SaaS landing page targeting technical decision-makers"
}

// 2. Beautiful docs
{
  subagent_type: "docs-architect",
  description: "Document design system",
  prompt: "Create beautiful documentation for the design system including color palette, typography, spacing, and components"
}
```

### Complex Problem
```typescript
// 1. Solve it
{
  subagent_type: "systems-thinker",
  description: "Fix double-booking race condition",
  prompt: "Users can double-book slots. PostgreSQL database. Help design solution preventing double-booking."
}

// 2. Review solution
{
  subagent_type: "sentinel",
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
