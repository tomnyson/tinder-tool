# Plan: Persist Message Draft Across Popup Reloads

## Requirements Summary
- Preserve the message typed in `#messageText` when the extension popup is closed/reopened or reloaded.
- Use existing project storage patterns: prefer `chrome.storage.local`, fallback to `localStorage`.
- Keep behavior of bulk-send flow unchanged.

## Current Evidence
- `messageTextInput` is defined, but no draft save/restore flow exists: `popup.js:21`.
- Bulk send reads only current textarea value at click time: `popup.js:532`.
- Startup currently loads AI config/history/saved presets, but not message draft: `popup.js:1060-1063`.

## Acceptance Criteria
1. Typing into `#messageText` is auto-saved without requiring manual action.
2. Reopening/reloading popup restores the last draft into `#messageText`.
3. If `chrome.storage.local` fails, fallback storage still preserves and restores draft.
4. Existing send behavior and validation remain unchanged.

## Implementation Steps
1. Add storage keys and helper functions in `popup.js` for loading/saving message draft.
2. Add debounced autosave listener on `messageTextInput` input events.
3. Load draft on popup initialization before user interaction.
4. Persist draft when AI-generated message is inserted into `messageText`.

## Risks and Mitigations
- Risk: Excessive writes while typing.
- Mitigation: debounce writes (short delay) instead of writing each keystroke.

- Risk: Missing/invalid stored value.
- Mitigation: validate type and fallback to empty string.

## Verification Steps
1. Static syntax check: `node --check popup.js`.
2. Manual validation in extension popup:
   - Type message, close popup, reopen popup -> message remains.
   - Reload extension, reopen popup -> message remains.
   - Click AI "Use" button -> inserted message persists after reopening.
