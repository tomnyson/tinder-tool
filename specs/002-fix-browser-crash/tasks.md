# Tasks: Fix Browser Crash

**Input**: Design documents from `/specs/002-fix-browser-crash/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests NOT requested for this bug fix feature.

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Review existing codebase and prepare for crash fix

- [x] T001 Read current `tinder-auto-click.js` to understand existing message queue implementation
- [x] T002 [P] Review `lib/storage-helper.js` for state persistence patterns
- [x] T003 [P] Review `manifest.json` to confirm extension permissions

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core understanding of crash causes

**⚠️ CRITICAL**: Root cause analysis MUST complete before user story implementation

- [x] T004 Identify crash root cause: memory pressure from large messageTargetQueue array
- [x] T005 Identify crash root cause: excessive scroll polling with `collectAllMessageTargets()`
- [x] T006 Document findings in `/specs/002-fix-browser-crash/research.md`

**Checkpoint**: Root causes identified - crash fix implementation can now begin

---

## Phase 3: User Story 1 - Reduce Memory Pressure from Message Queue (Priority: P1) 🎯 MVP

**Goal**: Eliminate memory leaks by removing the messageTargetQueue array and simplifying state persistence

**Independent Test**: Start bulk message campaign, verify memory usage stays stable, confirm messages still process correctly

### Implementation

- [x] T007 [P] [US1] Remove `messageTargetQueue` variable from `tinder-auto-click.js`
- [x] T008 [P] [US1] Remove `syncProcessedHrefsFromQueue()` function from `tinder-auto-click.js`
- [x] T009 [US1] Simplify `persistBulkMessageState()` to exclude queue data (depends on T007, T008)
- [x] T010 [US1] Push to `processedHrefs` array directly after each message sent

---

## Phase 4: User Story 2 - Simplify Scroll Logic (Priority: P2)

**Goal**: Reduce CPU/memory pressure by replacing heavy collection loop with lightweight single-item scroll

**Independent Test**: Start bulk message campaign, observe scroll behavior, verify all unprocessed items are found

### Implementation

- [x] T011 [P] [US2] Remove `rebuildMessageTargetQueue()` function from `tinder-auto-click.js`
- [x] T012 [P] [US2] Remove `collectAllMessageTargets()` function from `tinder-auto-click.js`
- [x] T013 [P] [US2] Remove `scrollMessageListToTop()` function from `tinder-auto-click.js` *(NOTE: Was called but didn't exist - implemented instead)*
- [x] T014 [P] [US2] Remove `findMessageItemByHref()` function from `tinder-auto-click.js`
- [x] T015 [P] [US2] Remove `ensureMessageItemVisible()` function from `tinder-auto-click.js`
- [x] T016 [US2] Implement new `ensureNextUnprocessedItemVisible()` in `tinder-auto-click.js` (depends on T011-T015)
- [x] T017 [US2] Update `startBulkMessage()` to remove queue collection logic (depends on T016)
- [x] T018 [US2] Update `checkAndResumeSession()` to work without queue (depends on T016)

---

## Phase 5: User Story 3 - Tune Reload Interval (Priority: P3)

**Goal**: Balance crash prevention with campaign continuity by increasing reload interval

**Independent Test**: Run bulk message campaign with 40+ messages, verify page reloads occur at appropriate intervals

### Implementation

- [x] T019 [P] [US3] Change `MESSAGE_PAGE_RELOAD_INTERVAL` from 10 to 40 in `tinder-auto-click.js`
- [x] T020 [US3] Update `scheduleStabilityReload()` comment to reflect new interval value

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Validation and cleanup after crash fixes

- [ ] T021 [P] Test bulk message flow end-to-end on Tinder messages page
- [ ] T022 [P] Verify auto-resume works correctly after page reload
- [ ] T023 Verify message history persistence still works correctly
- [x] T024 [P] Update `/specs/002-fix-browser-crash/research.md` with crash resolution findings
- [ ] T025 Run quickstart.md validation (if exists in feature folder)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tasks for a user story marked [P] can run in parallel

---

## Parallel Example: User Story 2

```bash
# Launch all function removals for User Story 2 together:
Task: "Remove rebuildMessageTargetQueue() function from tinder-auto-click.js"
Task: "Remove collectAllMessageTargets() function from tinder-auto-click.js"
Task: "Remove scrollMessageListToTop() function from tinder-auto-click.js"
Task: "Remove findMessageItemByHref() function from tinder-auto-click.js"
Task: "Remove ensureMessageItemVisible() function from tinder-auto-click.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test memory fix independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP crash fix!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
