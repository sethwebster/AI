# INDESTRUCTIBLE SOFTWARE SPEC TEMPLATE

> **Goal:** a deterministic, cross-agent specification document. If every section below is completed, two unrelated agents should produce near-identical outputs.

---

## 0) Spec Metadata (Fill this first)

- **Spec ID:** 
- **Project:** 
- **Version:** `1.0.0`  
- **Created / Updated:** 
- **Spec Owner:** 
- **Primary Implementer (Agent Target):** 
- **Environment:** (Web/Mobile/API/CLI/Worker)
- **Decision Date Window:** 
- **Priority:** `P0 / P1 / P2 / P3`
- **Source of Truth:** 
- **Status:** `Draft | Ready for Build | In Build | QA | Complete`
- **Review Sign-off Required:** 
  - Product:
  - Engineering:
  - QA/Security:

---

## 1) Determinism Guardrails (MANDATORY)

Before writing requirements, answer these:

1. **No ambiguity rule:** Any sentence with subjective language (`nice`, `fast`, `intuitive`, `reasonable`, etc.) is disallowed unless replaced with measurable targets.
2. **No optional behavior without defaults:** Every branch has explicit default behavior.
3. **No hidden behavior:** Every side effect is declared.
4. **No missing failure behavior:** Every operation has success and failure path.
5. **Every test set must start with broken tests:** failure-mode tests are defined before happy-path tests in every section.
6. **Single source of truth:** If conflict exists between sections, follow precedence:
   1. Canonical requirements (`FR-*`)
   2. Data contracts
   3. UI/UX text
   4. Non-functional requirements
Add the invariant pack:

- **Deterministic Ordering Rules:**
  - Default sort:
  - Tie-breakers:
  - Timezone baseline:
- **Idempotency Rules:**
  - Endpoints/commands that are idempotent:
  - Idempotency keys required/optional:
- **Clock & Time:** 
  - Timestamp format standard:
- **Error Contract Version:** 

## 2) Problem, Value, and Non-goals

### 2.1 Problem
Short paragraph: what pain is being fixed?

### 2.2 Business Outcome
What outcome must be achieved? Include measurable change.

### 2.3 User Outcome KPIs
- KPI 1:
- KPI 2:
- KPI 3:

### 2.4 Non-Goals
List explicit non-goals for this version.

### 2.5 Success Criteria (Binary)
- [ ] 
- [ ] 
- [ ] 

---

## 3) Actors & Use Cases

### 3.1 Actors
- **Actor 1:** name, role, permissions, assumptions
- **Actor 2:** ...

### 3.2 Use Cases (required format)
Use this format exactly:

- **UC-001**
  - **Actor:** 
  - **Preconditions:** 
  - **Trigger:** 
  - **Scenario:** 
  - **Expected End State:** 
  - **Errors/Fallback:** 

Repeat for every relevant flow.

### 3.3 Edge-case Matrix
For each edge case, include deterministic handling:
- Invalid input shape
- Concurrent updates
- Partial failure
- Empty state
- Rate limiting / quota
- Timeout / retries / cancellation

---

## 4) Functional Requirements (FR) [authoritative]

Use exact identifiers and complete each requirement.

| ID | Name | Priority | Preconditions | Inputs | Behavior | Outputs | Errors | Test(s) | Acceptance Rule |
|---|---|---|---|---|---|---|---|---|---|
| FR-001 | | P0/P1/P2 | | | | | | | |

### 4.1 Core Flows
For each `FR-###`:
- **State Inputs:**
- **State Changes:**
- **Side Effects:**
- **Transaction Boundaries:**
- **Concurrency Rules:**
- **Rollback Rules:**

### 4.2 Deterministic Behavior Contracts
- **Validation:**
- **Normalization:**
- **Pagination / list ordering:**
- **Filtering precedence:**
- **Default values:**
- **Feature flags:**
- **Retry policy:**
- **Caching policy:**
- **Rate limits + throttling errors:**

---

## 5) System Architecture & Boundaries

### 5.1 Architecture Scope
- Frontend:
- Backend APIs:
- Workers:
- Data layer:
- Third-party integrations:

### 5.2 Diagram (text)
```
Actor -> API -> Service -> Data Store -> Downstream
```
(Replace with real architecture)

### 5.3 Explicit Exclusions (must NOT be built)
- 

### 5.4 Deployment Target
- Runtime versions:
- OS/arch requirements:
- Infrastructure:

---

## 6) Data Model (canonical)

For each entity/table/collection:

### Entity: `<name>`
- **Primary key:** 
- **Fields:**
  - `field_name`: type, required?, constraints, default
- **Indexes:**
- **Unique constraints:**
- **Foreign keys / relationships:**
- **Lifecycle states:**
- **Allowed state transitions:**

### 6.1 Query/Mutation Contracts
- Query 1:
- Mutation 1:

### 6.2 Data Retention & Privacy
- Retention duration:
- Encryption in transit/at rest:
- PII / Sensitive data:
- Deletion requirements:

### 6.3 Example Records
#### Request
```json
{
  "example": "replace"
}
```

#### Response
```json
{
  "example": "replace"
}
```

---

## 7) API / Command Contract (exact)

For each endpoint/command, fill this table completely.

| ID | Method | Path | Auth | Request Schema | Success Response | Error Codes | Retry Strategy |
|---|---|---|---|---|---|---|---|
| API-001 | | | | | | | |

### 7.1 Route-by-Route Contract
For each `API-###`:
- **Path params:**
- **Query params:**
- **Body schema (JSON Schema style):**
- **Validation rules:**
- **200/201/204 body:**
- **4xx/5xx errors:**
  - code:
  - exact message:
  - body shape:
- **Timeouts:**
- **Idempotency required:**

### 7.2 Events / webhooks / background jobs
- Event name, trigger condition, payload fields, delivery guarantees.

---

## 8) UI/UX Spec (if UI is part of product)

For each screen/component:
- **Screen/Component Name:**
- **Input fields (exact labels):**
- **Actions:**
- **Validation inline text (exact copy):**
- **Empty/Loading/Error/Success states:**
- **Accessibility requirements:**

### 8.1 Copy Contract (must be deterministic)
- Titles:
- Empty state text:
- Error messages:
- Confirmation dialogs:

### 8.2 Interaction Sequence
Flow chart or numbered list per important path.

---

## 9) Security & Privacy

- Authentication:
- Authorization / RBAC roles:
- Session/security model:
- Secret storage:
- Input/output encoding and injection protections:
- CSRF/XSS/CORS/Rate-limit controls:
- Audit logging scope:
- Compliance requirements:
- Data export / right-to-delete handling:

---

## 10) Non-Functional Requirements

### 10.1 Performance
- Response time targets:
- Throughput targets:
- Cold start/bundle budgets:
- DB query budgets:

### 10.2 Reliability
- Availability target:
- Recovery target (RTO/RPO):
- Retry/circuit-breaker strategy:

### 10.3 Observability
- Logs:
- Metrics:
- Traces:
- Alert thresholds:

### 10.4 Operations
- Deployment steps:
- Rollback strategy:
- Feature toggles / kill switch:

---

## 11) Test Plan (must enforce determinism)

### 11.1 Required Coverage
- Unit coverage:
- Integration coverage:
- End-to-end coverage:
- API contract tests:
- Security tests:
- Performance tests:

### 11.2 Deterministic Test Cases
Use this exact format:

- **Test ID:** `T-###`
  - **Type:** `broken|failure|edge|happy`
  - **Given:**
  - **When:**
  - **Then:**
  - **Input fixture:**
  - **Expected output/response:**
  - **Failure assertion:**

Rules:
- In every suite, list all `broken` and `failure` tests **before** `happy` tests.
- No new requirement is considered done without at least one tied test case.

Add at least:
- 5 broken tests
- 5 failure/edge tests
- 5 happy path tests

### 11.3 Golden Payloads
Attach JSON/CSV fixture files and expected outputs.

### 11.4 Definition of Done (DoD) Matrix
Every requirement, command, and acceptance criterion must include DoD text.

| Item Type | Item ID | DoD | Proof Artifact |
|---|---|---|---|
| FR | FR-### | Complete and deterministic behavior implemented and test-covered | Test ID(s), file path |
| API/Command | API-### | Contract covered by tests with pass/fail assertions | Test ID(s), contract test output |
| Behavior | BR-### | Behavior demonstrated in e2e / integration tests | Test ID(s), logs |
| NFR | NFR-### | Quantitative target met under defined test conditions | Benchmark/monitor output |

### 11.5 Acceptance Gate
- [ ] All required tests passing
- [ ] No unresolved TODOs in `FR` and `API` sections
- [ ] No broad TODOs in implementation checklist
- [ ] DoD matrix fully populated (zero empty cells)

---

## 12) Delivery Specification

### 12.1 Milestones
- M1 (Scaffold):
- M2 (Core logic):
- M3 (Polish + tests):
- M4 (Handoff):

### 12.2 Work Plan
- Task order by FR priority and dependency:
- Parallelizable tasks:
- Blocking dependencies:

### 12.3 Repo Layout
```text
/src
  /app
  /api
  /core
  /data
  /shared
/tests
/docs
/infra
```
(Adjust as needed but keep semantic parity with this structure.)

### 12.4 Dependency Rules
- Keep same major dependencies across implementations.
- New dependency rule: name / license / purpose / security review result.

---

## 13) Traceability Matrix

Map from requirement to test and implementation artifact.

| FR | API | Data Model | UI | Test ID | Owner |
|---|---|---|---|---|---|
| FR-001 | API-001 | Entity-X | Component-Y | T-001 | |

---

## 14) Change Control

- **Change freeze level:** `low / medium / high`
- **Allowed changes after approval:**
  - None / only typos / add clarifications (describe)
- **Change Log (append-only):**
  - Date:
    - Change:
    - Author:
    - Impact:

---

## 15) “Do Not Change” Anchors (critical)

These values must remain fixed for all agent implementations unless approved by change control:
- Field names, types, and defaults:
- Endpoint paths and HTTP methods:
- Error codes + exact messages:
- Sorting and tie-breaking logic:
- Permission behavior:
- Time handling and timezone assumptions:
- Retry/backoff algorithm:

---

## 16) Final Handoff Checklist

- [ ] FR table completed for all functional behaviors
- [ ] Every API has complete request/response/error contract
- [ ] Every failure mode has expected output/error behavior
- [ ] UI copy and text are exact and complete
- [ ] Test suite and fixtures are defined
- [ ] Security and privacy requirements are concrete
- [ ] Definition of Done matrix is complete for every FR/API/behavior/NFR
- [ ] Determinism guardrails and “Do Not Change” anchors approved

---

## 17) Appendix A — Terminology
Define key terms, acronyms, enums, constants.

## 18) Appendix B — Reference Files
- Mock specs / designs:
- Prior related specs:
- Relevant APIs/documents:
- Tickets/IDs:

## 19) Appendix C — Machine-Readable Stub (optional)

Include a strict JSON stub if your agent accepts structured input. Fill this if desired:

```json
{
  "version": "1.0.0",
  "requirements": [
    {
      "id": "FR-001",
      "name": "",
      "priority": "P1",
      "preconditions": "",
      "inputs": [],
      "behavior": "",
      "outputs": [],
      "errors": []
    }
  ]
}
```