/**
 * @param {string} selector
 * @param {Document | Element} document
 * @returns {HTMLElement}
 */
export function getElement (selector, document = window.document) {
  const el = document.querySelector(selector);
  if (!el) {
    throw new Error(`DOM is not ready for selector "${selector}"`);
  }
  // @ts-ignore
  return el;
}

/**
 * @param {string} selector
 * @param {Document | Element} [document]
 * @returns {HTMLButtonElement}
 */
export function getButtonElement (selector, document) {
  // @ts-ignore
  return getElement(selector, document);
}

/**
 * @param {string} selector
 * @param {Document | Element} [document]
 * @returns {HTMLInputElement}
 */
export function getInputElement (selector, document) {
  // @ts-ignore
  return getElement(selector, document);
}

/**
 * @param {string} selector
 * @param {Document | Element} [document]
 * @returns {HTMLTextAreaElement}
 */
export function getTextAreaElement (selector, document) {
  // @ts-ignore
  return getElement(selector, document);
}
