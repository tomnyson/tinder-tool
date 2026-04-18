# Language Switch Feature (English / Vietnamese)

## Goal
Add a language toggle (EN/VI) in the popup. Switching language updates all UI labels and AI prompts immediately. Default: Vietnamese.

## Tasks

- [ ] **Add language switcher UI** to the header bar in `popup.html` — a pill toggle or dropdown showing current language, styled to match the dark theme
- [ ] **Create `i18n.js`** with `translations` object (VI + EN keys) and `prompts` object — all UI text and prompts in both languages
- [ ] **Wire language switch** in `popup.js` — save preference to `chrome.storage.local`, call `applyLanguage(lang)` on change and on startup
- [ ] **Implement `applyLanguage(lang)`** — iterates all `[data-i18n]` elements in DOM, swaps textContent from translations map
- [ ] **Translate prompts** — update system/user prompt textareas with localized default prompts when language switches
- [ ] **Translate saved messages section** — apply i18n to "Tin nhan da luu", placeholders, empty state, etc.
- [ ] **Translate AI tab** — mode names, descriptions, model section title, prompt section title, test button, status badges
- [ ] **Translate History tab** — refresh button, clear button, empty state text
- [ ] **Translate Swipe tab** — config labels, placeholder text, status bar text
- [ ] **Translate Message tab** — all section titles, checkbox labels, placeholder text, button text, quotes section
- [ ] **Verify default** — on fresh install (no lang in storage), apply Vietnamese as default

## Done When
- [ ] Toggle between EN/VI switches all visible text in every tab instantly
- [ ] AI prompts update to the correct language defaults
- [ ] Language preference persists across popup reopenings
- [ ] No console errors on language switch

## Files
- `popup.html` — add language switcher + `data-i18n` attributes
- `popup.js` — language storage, `applyLanguage()` function, switch event handler
- `lib/i18n.js` (new) — translations map, prompts map, `t()` helper
