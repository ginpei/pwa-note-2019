export default class PreferencesDialog {
  /** @type {Preferences} */
  get preferences () {
    const preferences = {
      fontSize: Number(this._elFontSize.value),
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
  }
}
