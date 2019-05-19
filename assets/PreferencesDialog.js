import { getButtonElement, getInputElement } from './misc.js';
import { initialState } from './Preferences.js';

export default class PreferencesDialog {
  /** @type {Preferences} */
  get preferences () {
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
    this.onResetDefaultClick = this.onResetDefaultClick.bind(this);

    this.options = options;

    const { el } = this.options;
    this._elDone = getButtonElement('.js-done', el);
    this._elFontSize = getInputElement('.js-fontSize', el);
    this._elLineHeight = getInputElement('.js-lineHeight', el);
    this._elResetDefault = getButtonElement('.js-resetDefault', this.options.el);

    this._setUp();
  }

  destroy () {
    this._elDone.removeEventListener('click', this.onDoneClick);
    this._elResetDefault.removeEventListener('click', this.onResetDefaultClick);
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

  onResetDefaultClick () {
    const message = 'Are you sure you want to reset all preferences to default values?';
    const ok = window.confirm(message);
    if (ok) {
      this._setPreferences(initialState);
    }
  }

  _setUp () {
    this._elDone.addEventListener('click', this.onDoneClick);
    this._elResetDefault.addEventListener('click', this.onResetDefaultClick);
    this._setPreferences(this.options.preferences);
  }

  /**
   * @param {Preferences} preferences
   */
  _setPreferences (preferences) {
    this._elFontSize.value = String(preferences.fontSize);
    this._elLineHeight.value = String(preferences.lineHeight);
  }
}
