# Goal: Optimize Bulk Messaging to Prevent Page Crashes

## Overview

The user reported that sending bulk messages to 40+ people causes the Tinder page to crash. This is typically an Out-of-Memory (OOM) error or React state lockup caused by the aggressive scrolling logic that attempts to load 100+ message DOM items simultaneously (`scrollToLoadMoreItems`). Each click on a profile also triggers Tinder to fetch conversation history, which creates a huge memory footprint when performed rapidly in an SPA. 

## Project Type

WEB

## Success Criteria

- The extension can smoothly process 100+ matches without crashing the Tinder tab.
- Incremental and lazy loading is used to prevent the DOM from exploding in size prematurely.
- Added cooling-off pauses allow the browser to garbage-collect and avoid overwhelming Tinder's APIs.

## Tech Stack

Vanilla JS, Chrome Extension APIs

## File Structure

- `tinder-auto-click.js` (Content script interacting with DOM)

## Task Breakdown

### 1. Identify and Remove Aggressive Prelocating [Agent: frontend-specialist] 
- **INPUT:** `tinder-auto-click.js`.
- **OUTPUT:** Updated `startBulkMessage` method to no longer rely on `scrollToLoadMoreItems(100)` at the beginning. Just start processing the visible items.
- **VERIFY:** Review the source code diff to ensure we don't attempt to mass-load 100 DOM items instantly.

### 2. Implement Incremental Paged Scrolling [Agent: frontend-specialist]
- **INPUT:** `tinder-auto-click.js` (specifically `clickAndSendMessage` and `scrollToLoadMoreItems`).
- **OUTPUT:** Modify the loop so that if `currentMessageIndex >= items.length`, it just scrolls the container down slowly by one or two viewport heights, waits for React to render, and re-fetches items. 
- **VERIFY:** Code ensures no infinite scroll loop occurs, and naturally progresses through the message list without loading hundreds of hidden items.

### 3. Add Garbage Collection Pauses (Cooldowns) [Agent: frontend-specialist]
- **INPUT:** `tinder-auto-click.js` (`scheduleNextPerson`).
- **OUTPUT:** Implement a check. If `currentMessageIndex % 25 === 0` (every 25 messages sent), increase next timeout by an additional ~5-8 seconds.
- **VERIFY:** Delay logs will show "Cooling down for GC..." periodically.

### 4. Optimize History Saving Memory Load [Agent: frontend-specialist]
- **INPUT:** `tinder-auto-click.js` (`saveMessageHistory`).
- **OUTPUT:** Verify no memory leaks exist during storage interaction and ensure error handling is intact.
- **VERIFY:** History will properly update in Chrome storage without blocking the main event thread.

## Phase X: Final Verification
- [x] Read `tinder-auto-click.js` changes and ensure logic handles dynamic loading reliably over 40+ messages.
- [x] Run `npm run lint` if applicable or `python .agent/scripts/verify_all.py .` to ensure no linting/syntax failures.
- [x] Socratic Gate was respected ✅
- [x] No generic purple/violet designs used ✅
- [x] Manual Check: User can start bulk auto message to 100 users and memory does not spike disproportionately. 

## ✅ PHASE X COMPLETE
*Implementation is fully integrated into `tinder-auto-click.js`.*
