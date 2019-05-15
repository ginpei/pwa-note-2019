import { getButtonElement, getInputElement } from './misc.js';

export default class PreferencesDialog {
  /** @type {Preferences} */
  get preferences () {
    if (!this._elFontSize || !this._elLineHeight) {
      throw new Error('Elements are not ready');
    }

    /** @type {Preferences} */
    const preferences = {
      fontSize: Number(this._elFontSize.value),
      lineHeight: Number(this._elLineHeight.value),
    };
    return preferences;
  }

  /**
   * @param {PreferencesDialogOptions} options
   */
  constructor(options) {
    this.onDoneClick = this.onDoneClick.bind(this);

    this.options = options;

    this._setUp();
  }

  open () {
    this.options.el.dataset.status = 'active';
  }

  close () {
    this.options.el.dataset.status = '';
  }

  onDoneClick () {
    this.close();
    this.options.onComplete(this.preferences);
  }

  _setUp () {
    const { el } = this.options;

    this._elDone = getButtonElement('.js-done', el);
    this._elDone.addEventListener('click', this.onDoneClick);

    this._elFontSize = getInputElement('.js-fontSize', el);
    this._elFontSize.value = String(this.options.preferences.fontSize);

    this._elLineHeight = getInputElement('.js-lineHeight', el);
    this._elLineHeight.value = String(this.options.preferences.lineHeight);
  }
}
