# Agent Development Guide

**AGENTS: READ THIS FILE FIRST, THEN READ [AGENT-WORKSPACE.md](./AGENT-WORKSPACE.md) FOR WORKSPACE-SPECIFIC INFORMATION.**

## Available Agents

- `sentinel` — Tech lead reviewer for security, architecture, and edge cases
- `product-ux-designer` — Product/UX design and interface excellence
- `docs-engineer` — Implementation-grade documentation
- `docs-architect` — Narrative, high-polish documentation
- `systems-thinker` — Complex systems reasoning and architectural design
- `compiler-expert` — Parsers, compilers, ASTs, and optimization
- `systems-engineer` — Infrastructure, reliability, and operations
- `hardware-engineer` — Embedded systems and hardware/firmware

See `agents/README.md` for full descriptions.

## Core Principles

1. **Explicit over implicit** — no magic values, hidden assumptions, or undeclared dependencies; state changes traceable
2. **Fail fast, fail loud** — validate at boundaries, no silent failures, no catch-just-to-log
3. **Optimize for deletion** — delete > comment out > keep; inline until third use; remove dead code immediately
4. **Trust nothing, verify everything** — hostile input, failing APIs, DB constraints as last defense
5. **Critical thinking over agreement** — challenge assumptions, question solutions, disagree constructively

## No Sycophancy

Agents must engage critically, not reflexively agree or praise.

**Forbidden**: "You're absolutely right!", "Great idea!", "Perfect!", "Excellent point!", immediate agreement without analysis.

**Required**: Verify before agreeing. Explore alternatives. Identify problems proactively. Stress-test ideas. Analyze trade-offs.

**When agreeing is appropriate**: you've verified the approach, considered alternatives, can articulate specific reasons it's sound, and have identified/accepted the trade-offs. Phrase analytically: "That works because X, and the trade-off of Y is acceptable here."

**Disagreement must be**: specific, constructive, technical (not personal), evidence-based.

Example:
```
Developer: "We should cache this API call"
Agent: "What's the current latency? How often does the data change? If it's
user-specific data that changes frequently, caching might cause inconsistencies."
```

## Agent Orchestration

### Parallel Execution
Spawn parallel agents for independent tasks. Agents communicate via files, not shared state.

- Status: `agents/{agent-name}/status.md`
- Results: `agents/{agent-name}/results.json` or `results.md`
- Errors: `agents/{agent-name}/errors.log`

Monitor by reading status files. Aggregate results when all agents complete.

### Agent Naming
Every spawned agent MUST have a memorable, themed name. Never "Agent 1" or "Worker A".

Pick one theme per session: Colors (Chartreuse, Vermillion), Simpsons (Homer, Bart), Cities (Tokyo, Cairo), Planets (Mercury, Mars), Mythology (Athena, Apollo), Elements (Helium, Neon).

### Agent Learnings (REQUIRED)
All agents MUST maintain `./agent/LEARNINGS.md` — cumulative knowledge about user and workspace.

**Capture**: user preferences, workspace conventions, architecture insights, pitfalls, domain knowledge.
**Don't capture**: session-specific tasks, info already in README/CLAUDE.md, speculative conclusions, secrets.
**Update**: immediately on new preferences; after architecture discussions; keep under 500 lines.

## Feature Development

### User Stories First (Non-Negotiable)
Every feature starts with a user story. No implementation without understanding the experience first.

```
As a [user type] I want to [action] so that [benefit]
Acceptance Criteria: [specific, testable]
```

Before code, answer: Who? What? Where? When? How (step-by-step)? Why?

Never skip — even bug fixes ("As a user, I expect X but experience Y"), refactors ("As a developer, I can't maintain X because Y"), and infra work need a human experience framing.

**Anti-pattern — implementation-first thinking**:
- "Let's add a Redis cache" → Why? What user problem does this solve?
- "We need a WebSocket connection" → For what user experience?
- "Add this column to the database" → What can users now do?

### Design Agreement Checklist
Before implementation:
- [ ] User story documented
- [ ] Complete user journey mapped (wireframes if UI change)
- [ ] Edge cases identified (errors, empty states, loading states)
- [ ] Success criteria defined
- [ ] Team agrees on the experience
- [ ] Technical approach aligns with user needs

## Code Quality

### Complexity Budget
- Functions: ≤50 lines (hard: 100) | Files: ≤500 lines (hard: 1000)
- Cyclomatic complexity: ≤10 | Nesting: ≤3 levels | Params: ≤4

### Zero Tolerance
No `any` types, empty catch blocks, disabled linter rules without issue links, TODOs without owner+date, console.log in prod, commented-out code, magic numbers.

### Required Patterns
Discriminated unions for state machines, exhaustive switches, early returns, immutable data, pure functions, dependency injection over singletons.

## Architecture

### Layers (top→down, higher depends on lower only)
1. **Presentation** — no business logic, props in / events out
2. **Application** — orchestration, state management
3. **Domain** — framework-agnostic, pure functions, zero external deps
4. **Infrastructure** — DB/API/cache, implements domain interfaces

Circular dependencies = architectural failure.

### Module Boundaries
- Single public entry point (`index.ts`)
- Export types explicitly; hide implementation details; document public API with TSDoc
- Never import from sibling modules' internals

### ADRs (REQUIRED)
All significant architectural decisions documented in `adr/` folder. See `adr/template.md`.

**Workflow**: Create ADR before implementation → get sentinel review → address feedback → mark "Accepted" → implement (reference ADR in commits/PRs).

**When**: choosing patterns, selecting tools/frameworks, defining API contracts, security policies, performance trade-offs, new dependencies.

**Rules**: never delete ADRs; supersede or deprecate with links; keep `adr/README.md` index current; ≥2 alternatives considered.

## Language Guidelines

### React
- Never call `useEffect` directly in components — extract to custom hooks
- One hook per concern; no business logic in components — use services/hooks
- Context for shared state over prop drilling
- Memo/useCallback only after profiling

```typescript
// ❌ Business logic in component
function UserProfile() {
  const [user, setUser] = useState(null)
  useEffect(() => { fetch('/api/user').then(r => r.json()).then(setUser) }, [])
  return <div>{user?.name}</div>
}

// ✅ Logic in custom hook
function useUser() {
  const [user, setUser] = useState(null)
  useEffect(() => { fetch('/api/user').then(r => r.json()).then(setUser) }, [])
  return user
}
function UserProfile() {
  const user = useUser()
  return <div>{user?.name}</div>
}
```

### TypeScript
- Branded types for IDs, validated strings, units
- Strong unions over loose string types
- Typed errors or Result types over thrown strings

```typescript
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }
```

### Elixir
- `snake_case` for variables/functions/atoms, `PascalCase` for modules

## Testing

### Test-First (Non-Negotiable)
1. Write failing test demonstrating bug/specifying feature
2. Verify it fails for the right reason
3. Implement minimum code to pass
4. Refactor (test still passing)

### Targets
- Unit: ≥80% coverage | Integration: all critical paths | E2E: primary user flows
- AAA pattern (Arrange/Act/Assert), `should` naming, one assertion per test

### What to test / skip
Test: business logic, integration points, error conditions, edge cases, state transitions.
Skip: framework internals, third-party libs, getters/setters, private methods.

## Database

- Additive migrations only (create v2 → backfill → switch → drop old separately)
- Always use joins over N+1 queries
- Always paginate (no unbounded selects)
- Every table: PK, timestamps, NOT NULL, FKs with ON DELETE, unique constraints, check constraints
- Index: FKs, WHERE columns, ORDER BY columns; avoid redundant/excessive indexes

## API Design

- REST: POST create, GET read, PATCH partial update, PUT replace, DELETE remove
- Response: `{ data, meta: { requestId, timestamp } }` or `{ error: { code, message, details }, meta }`
- Status codes: 200/201/204 success, 400/401/403/404/409/422/429 client, 500/503 server

## Security

- Validate at boundaries; domain layer assumes valid input
- Never roll own crypto; established auth libs only; hashed passwords (bcrypt/Argon2)
- Session tokens: crypto-random ≥128 bits, expire ≤30d
- Prevent: SQLi (parameterized), XSS (escape+CSP), CSRF (SameSite+tokens), mass assignment (allowlists), timing attacks (constant-time), open redirects (validate URLs)
- Explicit permission checks before every protected action

## Performance

- Layered caching: memory → Redis → DB; explicit invalidation on writes
- Index strategy: FKs always, hot WHERE/ORDER columns, covering indexes for hot queries
- Use atomic operations to prevent race conditions:

```typescript
// ❌ Race condition        // ✅ Atomic
const n = await getCount()  await db.update(counter).set({
await setCount(n + 1)         value: sql`${counter.value} + 1`
                            })
```

### Common Pitfalls
- **Memory leaks**: clean up event listeners, clear intervals/timeouts, evict caches, avoid circular refs in closures
- **N+1 queries**: use joins or eager loading, never loop queries
- **Unbounded operations**: always paginate, always limit

## Observability

- Structured logging with context (userId, source, duration_ms); never bare console.log
- Levels: ERROR (action needed), WARN (degraded), INFO (significant events), DEBUG (dev only)
- Track: latency percentiles, error rates, query time, cache hit rate, queue depth
- Alert on: >1% errors 5m, p99 >2s 5m, >80% DB pool, >85% disk, >90% memory

## Deployment

- Environment parity (dev ≈ staging ≈ prod)
- Type-safe config validated at startup (fail fast)
- Zero-downtime: deploy alongside → health check → gradual traffic shift → rollback on degradation
- Backward-compatible migrations; keep 3 versions for rollback

## Git Workflow

### Commits
`<type>(<scope>): <subject>` — types: feat, fix, perf, refactor, test, docs, chore.
Subject ≤50 chars, imperative, no period. Body: why not what. Footer: refs to issues/ADRs.

### Branches
`main` (prod, protected) → `staging` (pre-prod) → `feat/*` (ephemeral). Never commit directly to main/staging.

### PRs
≥1 approval, CI passing, no conflicts, up to date, description + issue link. ADR approved before PR if architectural change.

## Reviews

### What Reviewers Check
1. Correctness — does it solve the problem?
2. Security — any vulnerabilities?
3. Performance — any red flags?
4. Maintainability — understandable in 6 months?
5. Tests — critical paths covered?

### Etiquette
- Suggest, don't demand; explain why, not just what
- Approve if minor nits only; block for security, correctness, data loss
- Respond within 24h

### Self-Review (before requesting)
- [ ] Ran tests locally
- [ ] Manually tested feature
- [ ] Checked for console errors
- [ ] Reviewed own diff
- [ ] Removed debug code
- [ ] Updated documentation

## Emergency Response

1. Acknowledge (2m) → 2. Mitigate (15m, rollback/feature flag) → 3. Investigate (1h, root cause) → 4. Fix (4h) → 5. Postmortem (24h)

### Postmortem Structure
Date, duration, impact, severity. Timeline (began → detected → mitigated → resolved). Root cause. Resolution. Action items: prevent recurrence, improve detection, update runbooks.

## Refactoring Checklist

**Before**: tests exist+pass, understand current behavior, clear goal, stopping condition.
**During**: tests passing each step, atomic commits, no feature additions, verify perf.
**After**: tests pass, coverage maintained, docs updated, no behavior change.
