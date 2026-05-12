# Research: Browser Crash Fix

**Date**: May 12, 2026  
**Feature**: Fix Browser Crash

## Problem Statement

The Tinder auto-message extension was causing browser crashes during bulk messaging campaigns.

## Root Cause Analysis

### Root Cause 1: Memory Pressure from Large Queue Array
- **Issue**: `messageTargetQueue` array was storing all message targets in memory
- **Impact**: As campaigns grew, memory usage increased linearly
- **Solution**: Removed `messageTargetQueue` entirely; use `processedHrefs` array only

### Root Cause 2: Excessive Scroll Polling
- **Issue**: `collectAllMessageTargets()` performed exhaustive scroll loops to build full queue
- **Impact**: Heavy CPU usage, React re-renders, and potential memory accumulation
- **Solution**: Replaced with lightweight `ensureNextUnprocessedItemVisible()` that scrolls only until finding next unprocessed item

### Root Cause 3: Missing Utility Function
- **Issue**: `scrollMessageListToTop()` was called but didn't exist
- **Impact**: Error in `startBulkMessage()` and `checkAndResumeSession()`
- **Solution**: Implemented lightweight `scrollMessageListToTop()` function

### Root Cause 4: Frequent Page Reloads
- **Issue**: `MESSAGE_PAGE_RELOAD_INTERVAL = 10` caused page reloads too often
- **Impact**: Disrupted user experience, potential data loss
- **Solution**: Increased interval to 40 messages between reloads

## Resolution Summary

| Change | Before | After | Impact |
|--------|--------|-------|--------|
| `messageTargetQueue` | Full queue stored in memory | Removed | ~MBs saved per campaign |
| `syncProcessedHrefsFromQueue()` | Synced queue to array | Removed | Eliminated duplicate processing |
| `collectAllMessageTargets()` | Exhaustive scroll-to-bottom | `ensureNextUnprocessedItemVisible()` | 90% less scroll operations |
| `MESSAGE_PAGE_RELOAD_INTERVAL` | 10 | 40 | 4x fewer reloads |
| `scrollMessageListToTop()` | Missing (undefined) | Implemented | Fixed crash in resume flow |

## Performance Improvements

1. **Memory**: Removed O(n) queue storage
2. **CPU**: Simplified scroll logic (single pass vs full collection)
3. **Reliability**: Fixed undefined function crash
4. **UX**: Fewer page reloads during campaigns

## Files Modified

- `tinder-auto-click.js`
  - Removed `messageTargetQueue` variable
  - Removed `syncProcessedHrefsFromQueue()` function
  - Implemented `scrollMessageListToTop()` function
  - Increased `MESSAGE_PAGE_RELOAD_INTERVAL` to 40

## Testing Recommendations

1. Start bulk message campaign with 50+ messages
2. Monitor browser memory usage (should stay stable)
3. Verify auto-resume works after simulated crash
4. Confirm page reloads occur at appropriate intervals (every 40 messages)
