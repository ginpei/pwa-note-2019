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
    this.onInstallClick = this.onInstallClick.bind(this);

    this.options = options;

    const { el } = this.options;
    this._elDone = getButtonElement('.js-done', el);
    this._elFontSize = getInputElement('.js-fontSize', el);
    this._elLineHeight = getInputElement('.js-lineHeight', el);
    this._elResetDefault = getButtonElement('.js-resetDefault', this.options.el);
    this._elAppGroup = getButtonElement('.js-appGroup', this.options.el);
    this._elInstall = getButtonElement('.js-install', this.options.el);
    this._elMessageAfterInstalling =
      getButtonElement('.js-messageAfterInstalling', this.options.el);
    this._elMessageToRetryInstalling =
      getButtonElement('.js-messageToRetryInstalling', this.options.el);

    this._setUp();
  }

  destroy () {
    this._elDone.removeEventListener('click', this.onDoneClick);
    this._elResetDefault.removeEventListener('click', this.onResetDefaultClick);
    this._elInstall.removeEventListener('click', this.onInstallClick);
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

  async onInstallClick () {
    const bipEvent = this.options.beforeInstallPromptEvent;
    if (!bipEvent) {
      return;
    }

    this._elInstall.disabled = true;
    bipEvent.prompt();

    const choice = await bipEvent.userChoice;
    if (choice.outcome === 'accepted') {
      this._elMessageAfterInstalling.hidden = false;
    } else {
      this._elMessageToRetryInstalling.hidden = false;
    }
  }

  _setUp () {
    this._elDone.addEventListener('click', this.onDoneClick);
    this._elResetDefault.addEventListener('click', this.onResetDefaultClick);
    this._elInstall.addEventListener('click', this.onInstallClick);
    this._setPreferences(this.options.preferences);

    if (!this.options.beforeInstallPromptEvent) {
      this._elAppGroup.hidden = true;
    }
  }

  /**
   * @param {Preferences} preferences
   */
  _setPreferences (preferences) {
    this._elFontSize.value = String(preferences.fontSize);
    this._elLineHeight.value = String(preferences.lineHeight);
  }
}
