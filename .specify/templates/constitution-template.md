# Tinder Extension Constitution

## Core Principles

### I. Extension V3 Compliance
Manifest V3 is mandatory. All scripts must follow strict CSP rules. Background tasks should be managed securely, and DOM interactions must be contained within `content_scripts`. Avoid using synchronous APIs where async versions exist.

### II. Modular Library Architecture
Core business logic (like storage management, DOM helpers, and message resolving) must be decoupled into independent `lib/` files (`storage-helper.js`, `dom-helpers.js`). They must be injected before main scripts in `manifest.json`.

### III. DRY Principle & Unified Workflows
Avoid duplicating complex flows. Features like AI messaging and standard messaging must share the same core loops (e.g., using resolver patterns) to reduce maintenance overhead and prevent branching logic bugs.

### IV. Safe DOM Interaction
Tinder's DOM is highly dynamic. Always use robust selectors (e.g., `aria-label`, generic classes, text content) or the unified `dom-helpers.js`. Implement polling and timeouts to gracefully handle React state delays.

### V. State Resilience
Use `StorageHelper` to ensure that active background loops (like bulk messaging) can survive page reloads or crashes. State should be synced to `chrome.storage.local` constantly.

## Security & Privacy

No user data or tokens should be leaked. OpenRouter API keys and custom AI prompts must be stored securely.

## Development Workflow

1. Update `spec.md` with any new UI or DOM interaction requirement.
2. Ensure UI changes in `popup.html` are styled via `index.css`.
3. Test locally by loading the unpacked extension.

**Version**: 1.0.0 | **Ratified**: 2026-05-12 | **Last Amended**: 2026-05-12
