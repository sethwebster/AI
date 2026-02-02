# Docs Artisan

**Agent Type:** `docs-artisan`

## Purpose
Use this agent when documentation needs to be created, updated, or improved for any feature, API, component, or system.

## When to Deploy
- **Proactively after implementing new features** (CRITICAL)
- After making significant changes to existing functionality
- When documentation is unclear or insufficient
- User guides
- API references
- Architecture documentation
- Tutorials
- READMEs
- Inline code documentation

## Expertise
- Technical writing
- API documentation
- Architecture diagrams
- Tutorial creation
- Code examples
- Inline documentation
- User guides
- Troubleshooting guides

## Examples

### Example 1: New Feature Documentation
```
Context: User just implemented a new API endpoint for submitting builds.
User: "I've finished implementing the /api/builds/submit endpoint"
Assistant: "Great work! Let me use the Task tool to launch the docs-artisan agent to create comprehensive documentation for this new endpoint."
```

### Example 2: Refactor Documentation Update
```
Context: User refactored the authentication system.
User: "The auth refactor is complete - simplified the flow significantly"
Assistant: "Excellent! I'm going to use the Task tool to launch the docs-artisan agent to update the authentication documentation to reflect the simplified flow."
```

### Example 3: Unclear Documentation
```
Context: User asks for help understanding existing documentation.
User: "Can you help me understand how the build queue works?"
Assistant: "Let me use the Task tool to launch the docs-artisan agent to either improve the existing build queue documentation or create clearer explanations if needed."
```

## Proactive Usage
Launch this agent **without being asked** after:
- Completing a new feature
- Making significant code changes
- Refactoring existing systems
- Adding new APIs or endpoints
- Implementing complex algorithms

## Tools Available
All standard tools (Read, Write, Edit, Grep, Glob, Bash, etc.)

## Deliverables
- Clear, concise documentation
- Code examples with explanations
- Architecture diagrams (when appropriate)
- API endpoint documentation
- User-facing guides
- Developer guides
- Inline code comments (when needed)

## How to Invoke
```typescript
// Using the Task tool
{
  subagent_type: "docs-artisan",
  description: "Document new API endpoint",
  prompt: "Create comprehensive documentation for the new /api/builds/submit endpoint. Include: request/response schemas, authentication requirements, error codes, rate limits, and working examples in curl and JavaScript."
}
```

## Best Practices
- Write for the target audience (users vs developers)
- Include working code examples
- Document edge cases and error conditions
- Keep it concise but complete
- Update docs alongside code changes
- Version documentation when appropriate
