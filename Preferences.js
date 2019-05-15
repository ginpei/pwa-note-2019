const storageKey = 'pwa-note/preferences';

/** @type {Preferences} */
const initialState = {
  fontSize: 20,
  lineHeight: 1.5,
};

/**
 * @returns {Promise<Preferences>}
 */
export function load () {
  return new Promise((resolve) => {
    const json = window.localStorage.getItem(storageKey) || '{}';
    const data = {
      ...initialState,
      ...JSON.parse(json),
    };
    resolve(data);
  });
}

export function save (preferences) {
  return new Promise((resolve) => {
    const json = JSON.stringify(preferences);
    window.localStorage.setItem(storageKey, json);
    resolve();
  });
}
