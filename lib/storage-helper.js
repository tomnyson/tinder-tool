/**
 * StorageHelper — unified chrome.storage.local wrapper with localStorage fallback.
 * Works in both content script and popup contexts (Manifest V3).
 * Keys are prefixed with "tinder_ext_" in the localStorage fallback.
 */
const StorageHelper = {
  /** @param {string[]} keys */
  async get(keys) {
    try {
      if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
        return await chrome.storage.local.get(keys);
      }
    } catch (e) {
      console.warn('StorageHelper.get — chrome.storage unavailable, using localStorage', e);
    }
    const result = {};
    keys.forEach((key) => {
      const raw = localStorage.getItem('tinder_ext_' + key);
      if (raw != null) {
        try { result[key] = JSON.parse(raw); } catch (_) {}
      }
    });
    return result;
  },

  /** @param {Record<string, any>} obj */
  async set(obj) {
    try {
      if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
        await chrome.storage.local.set(obj);
        return;
      }
    } catch (e) {
      console.warn('StorageHelper.set — chrome.storage unavailable, using localStorage', e);
    }
    Object.keys(obj).forEach((key) => {
      localStorage.setItem('tinder_ext_' + key, JSON.stringify(obj[key]));
    });
  },
};
