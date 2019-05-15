import { getButtonElement, getElement, getTextAreaElement } from "./misc.js";

export default class Editor {
  /**
   * @param {EditorOptions} options
   */
  constructor (options) {
    this.onOpenPreferencesClick = this.onOpenPreferencesClick.bind(this);
    this.onContentChange = this.onContentChange.bind(this);

    this.options = options;

    this._setUp();
  }

  destroy () {
    if (!this._elOpenPreferences || !this._elContent) {
      throw new Error('Elements are not ready');
    }

    this._elOpenPreferences.removeEventListener(
      'click',
      this.onOpenPreferencesClick,
    );
    this._elContent.removeEventListener('input', this.onContentChange);
  }

  /**
   * @param {Preferences} pref
   */
  setPreferences (pref) {
    if (!this._elContent) {
      throw new Error('Elements are not ready');
    }

    this._elContent.style.fontSize = `${pref.fontSize}px`;
    this._elContent.style.lineHeight = `${pref.lineHeight}`;
  }

  onOpenPreferencesClick () {
    this.options.onPreferences();
  }

  onContentChange () {
    if (!this._elContent) {
      throw new Error('Elements are not ready');
    }

    const content = this._elContent.value;
    this._saveText(content);
  }

  _setUp () {
    const content = this._loadContent();
    const { el } = this.options;

    this._elOpenPreferences = getButtonElement('.js-openPreferences', el);
    this._elOpenPreferences.addEventListener(
      'click',
      this.onOpenPreferencesClick,
    );

    this._elContent = getTextAreaElement('.js-text', el);
    this._elContent.value = content;
    this._elContent.addEventListener('input', this.onContentChange);

    this.setPreferences(this.options.preferences);
  }

  /**
   * @param {string} html
   */
  _saveText (html) {
    window.localStorage.setItem('pwa-note/content', html);
  }

  _loadContent () {
    const html = window.localStorage.getItem('pwa-note/content') || '<p>Hello World!</div>';
    return html;
  }
}
