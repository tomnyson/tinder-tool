/**
 * dom-helpers.js — shared DOM utilities for Tinder content script.
 * Must be loaded before tinder-auto-click.js.
 */

/** Selector for the Tinder message compose textarea. */
const TEXTAREA_SELECTOR = 'textarea[placeholder="Type a message"]';

/**
 * Set a value on a React-controlled textarea and fire the synthetic input event
 * so React's synthetic event system picks up the change.
 *
 * @param {HTMLTextAreaElement} textarea
 * @param {string} value
 */
function setReactTextareaValue(textarea, value) {
  const nativeSetter = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    'value',
  ).set;
  nativeSetter.call(textarea, value);
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
}
