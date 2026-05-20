/**
 * StorageHelper — unified chrome.storage.local wrapper with localStorage fallback.
 * Works in both content script and popup contexts (Manifest V3).
 * Handles "Extension context invalidated" error gracefully.
 * Keys are prefixed with "tinder_ext_" in the localStorage fallback.
 */
const StorageHelper = {
  _warnedInvalidGet: false,
  _warnedInvalidSet: false,

  /** Check if extension context is still valid */
  isValid() {
    try {
      return !!(
        typeof chrome !== 'undefined' &&
        chrome?.runtime?.id &&
        !chrome.runtime.lastError
      );
    } catch {
      return false;
    }
  },

  /** @param {string[]} keys */
  async get(keys) {
    if (!this.isValid()) {
      if (!this._warnedInvalidGet) {
        console.info('StorageHelper.get — extension invalid, using localStorage fallback');
        this._warnedInvalidGet = true;
      }
      return this._localGet(keys);
    }
    try {
      if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
        return await chrome.storage.local.get(keys);
      }
    } catch (e) {
      console.warn('StorageHelper.get — chrome.storage unavailable, using localStorage', e);
    }
    return this._localGet(keys);
  },

  _localGet(keys) {
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
    this._localSet(obj);

    if (!this.isValid()) {
      if (!this._warnedInvalidSet) {
        console.info('StorageHelper.set — extension invalid, using localStorage fallback');
        this._warnedInvalidSet = true;
      }
      return;
    }
    try {
      if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
        await chrome.storage.local.set(obj);
        return;
      }
    } catch (e) {
      console.warn('StorageHelper.set — chrome.storage unavailable, using localStorage', e);
    }
    return this._localSet(obj);
  },

  _localSet(obj) {
    Object.keys(obj).forEach((key) => {
      try {
        localStorage.setItem('tinder_ext_' + key, JSON.stringify(obj[key]));
      } catch (e) {
        console.error('StorageHelper._localSet — localStorage quota exceeded or unavailable', e);
      }
    });
  },
};

globalThis.StorageHelper = StorageHelper;
