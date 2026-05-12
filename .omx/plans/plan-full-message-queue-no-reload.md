# Full Message Queue Before Send, No Reload, No Duplicate Resume

## Summary
- Convert bulk messaging to a strict queue-first workflow: exhaustively load the Messages sidebar before sending the first message, then send only from a persisted fixed queue.
- Eliminate page refreshes from the active send engine and make interruption recovery deterministic by persisting queue progress immediately after every send or skip.
- Keep one shared engine contract for normal and AI modes so popup behavior, progress reporting, and resume logic stay aligned.

## Requirements And Acceptance Criteria
- Before sending starts, the content script must scroll the Messages sidebar until no new recipients can be loaded and must build a stable `messageTargetQueue`.
- `messageTargetQueue` is the only source of truth for recipient order; the active send loop must not select “next visible user” from live DOM.
- The send engine must not call `window.location.reload()` during normal operation in either normal or AI mode.
- After every successful send and every explicit skip, the updated queue pointer must be persisted before scheduling the next recipient.
- If the page, tab, or content script is interrupted, resume must continue at the next unsent queue entry and must not resend the last successfully sent user.
- Popup progress must show the actual discovered queue length, including when the requested count is `0` (“all”).
- If queue collection finds no scroll container or no recipients, sending must abort cleanly and report a start error to the popup.

## Key Implementation Changes
- In `tinder-auto-click.js`, keep `collectAllMessageTargets`, `scrollMessageListToTop`, `findMessageItemByHref`, and `ensureMessageItemVisible` as the only supported recipient-discovery/navigation helpers for bulk messaging.
- Define and persist a minimal queue item schema:
  - `{ href, name }`
  - `href` is the stable identity key for dedupe and resume
  - no transient DOM references or extra profile data are stored in queue state
- Refactor normal and AI paths to share one queue-driven lifecycle:
  - collect queue before first send
  - persist initial state with `messageTargetQueue`, `currentMessageIndex = 0`, and `totalMessages = messageTargetQueue.length`
  - resolve current target by exact `href`
  - click target, type/send message, persist progress, then schedule next
- Lock the post-send ordering for both modes:
  1. click Send
  2. increment `currentMessageIndex`
  3. recompute derived processed entries from queue slice `0..currentMessageIndex`
  4. `await persistBulkMessageState()`
  5. emit progress update
  6. schedule next recipient
- Keep `processedHrefs` as derived state only:
  - derive from `messageTargetQueue.slice(0, currentMessageIndex)`
  - do not maintain an independent “already sent” list outside queue position
- Update the popup/content-script start handshake:
  - popup sends `startBulkMessage`
  - content script performs queue collection first
  - content script responds with `{ started, totalCollected, error? }`
  - popup uses `totalCollected` for immediate progress display instead of `?` or `9999`
- Define invalid-queue recovery precisely:
  - invalid means queue missing, empty, malformed, or current target cannot be found after a full top-to-bottom sidebar scan
  - on first invalid detection during resume, rebuild queue once
  - if rebuilt queue still cannot resolve the current target, mark that target as skipped, persist, and continue; do not rewind or resend earlier entries
- Remove old recipient-selection assumptions from the active send path:
  - no “pick first visible unprocessed item”
  - no reload-era memory-cleanup branch
  - `scrollToFindNewPerson` may remain only if repurposed for queue loading support, not live next-user selection

## Verification Plan
- Static checks:
  - `node --check tinder-auto-click.js`
  - `git diff --check -- tinder-auto-click.js popup.js`
- Source verification:
  - confirm there is no active `window.location.reload()` call in bulk-message scheduling paths
  - confirm both normal and AI paths call `await persistBulkMessageState()` immediately after send/skip pointer advancement
  - confirm `totalMessages` is assigned from `messageTargetQueue.length`
  - confirm the start response includes `totalCollected`
- Manual runtime scenarios:
  - long Messages list with `count = 0`: queue loads to exhaustion before first send, popup shows real total, then send proceeds through the full queue
  - limited count: queue loading stops at the requested cap and progress total equals that cap
  - interruption after successful send but before next scheduled send: resume continues with the next user, not the just-sent one
  - missing current target on resume: perform one queue rebuild, then skip unresolved target and continue without duplicate send
  - AI mode on long list: same queue-first behavior, same progress contract, same no-reload / no-duplicate guarantee

## Assumptions
- “Until can’t loading message” means stop only after repeated bottom/stagnation confirmation, not a single bottom observation.
- Recipient identity anchored by `href` is stable enough within one messaging session to support dedupe and resume.
- No popup UI redesign is needed beyond displaying the real collected total and surfaced start errors.
