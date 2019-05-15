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

    /** @type {HTMLButtonElement} */
    this._elDone = el.querySelector('.js-done');
    this._elDone.addEventListener('click', this.onDoneClick);

    /** @type {HTMLInputElement} */
    this._elFontSize = el.querySelector('.js-fontSize');
    this._elFontSize.value = this.options.preferences.fontSize;

    /** @type {HTMLInputElement} */
    this._elLineHeight = el.querySelector('.js-lineHeight');
    this._elLineHeight.value = this.options.preferences.lineHeight;
  }
}
