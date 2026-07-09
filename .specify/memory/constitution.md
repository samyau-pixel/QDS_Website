#+ QDS_web Constitution

## Core Principles

### I. Code Quality (NON-NEGOTIABLE)
All code MUST be readable, maintainable, and reviewable. Code changes MUST include automated tests appropriate to the scope (unit tests for logic, integration tests for cross-module behavior). Linting and static analysis MUST pass in CI; new linter exceptions require documented justification and a follow-up task.

### II. User Experience Consistency
The product MUST present a consistent user experience across pages and components. Visual and interaction patterns (spacing, typography, color, focus/hover behavior, form validation) MUST follow the project's design tokens and component library. Any deviation requires design review and a migration plan.

### IV. Performance & Accessibility Minimums
Pages MUST meet minimal performance and accessibility standards: P95 load budget targets appropriate to the app scope, and WCAG 2.1 AA for critical user flows. Accessibility regressions are treated as failures blocking merge until addressed or explicitly accepted by product + accessibility owner.

### V. Simplicity & Incrementalism
Prefer simple, incremental changes over large, risky rewrites. Complex solutions MUST be justified with measurable benefits and accompanied by a migration and rollback plan. YAGNI applies: do not add features or abstractions until there is demonstrable need.

## Additional Constraints

- **Technology Stack**: Use the existing stack present in the repository unless a clear migration plan and approval are provided. New frameworks or major libraries MUST be approved in a design review and documented in the plan.
- **Security**: Sensitive data handling MUST follow secure storage and transmission practices. Secrets MUST not be stored in the repository; use approved secret management for CI and deployments.

## Development Workflow & Quality Gates

- **Code Reviews**: All changes to `main` or release branches MUST be made by PR and reviewed by at least one approver with relevant domain knowledge. Reviews MUST verify tests, lints, and basic manual sanity checks for UX where applicable.
- **CI Gates**: PRs MUST pass linting, unit tests, and integration tests defined for the changed area. Failing non-critical checks may be temporarily skipped only with documented approval and a follow-up task.
- **Release Process**: Follow semantic versioning for public APIs and document breaking changes in CHANGELOG. Deployments to production require a release note and rollback plan.

## Governance

This constitution defines mandatory and recommended practices for the project. Amendments to principles or mandatory requirements MUST be proposed as a documented change, reviewed by at least two maintainers, and merged via a PR that includes a migration plan for any breaking policy changes.

- Compliance: All PRs SHOULD include a short note referencing relevant principles (e.g., "Complies with: Code Quality, UX Consistency"). Team leads are responsible for periodic compliance audits.
- Exceptions: Temporary exceptions to mandatory items MUST be time-limited, documented in the PR, and include a follow-up remediation task.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm project adoption date | **Last Amended**: 2026-07-09
