export default class Editor {
  /**
   * @param {EditorOptions} options
   */
  constructor (options) {
    this.onOpenPreferencesClick = this.onOpenPreferencesClick.bind(this);
    this.onPreferencesDialogDoneClick =
      this.onPreferencesDialogDoneClick.bind(this);
    this.onContentChange = this.onContentChange.bind(this);

    this.options = options;

    const content = this._loadContent();
    this._setupDom({ content });
  }

  destroy () {
    this._elOpenPreferences.removeEventListener(
      'click',
      this.onOpenPreferencesClick,
    );
    this._elPreferencesDialogDone.removeEventListener(
      'click',
      this.onPreferencesDialogDoneClick,
    );
    this._elContent.removeEventListener('input', this.onContentChange);
  }

  /**
   * @param {Preferences} pref
   */
  setPreferences (pref) {
    console.log('# preferences', pref);
  }

  onOpenPreferencesClick () {
    this.options.onPreferences();
  }

  onPreferencesDialogDoneClick () {
    this._closePreferences();
  }

  onContentChange () {
    const content = this._elContent.value;
    this._saveText(content);
  }

  _setupDom (settings) {
    const { el } = this.options;

    /** @type {HTMLButtonElement} */
    this._elOpenPreferences = el.querySelector('.js-openPreferences');
    this._elOpenPreferences.addEventListener(
      'click',
      this.onOpenPreferencesClick,
    );

    /** @type {HTMLTextAreaElement} */
    this._elContent = el.querySelector('.js-text');
    this._elContent.value = settings.content;
    this._elContent.addEventListener('input', this.onContentChange);

    /** @type {HTMLDivElement} */
    this._elPreferencesDialog = el.querySelector('.js-preferencesDialog');
  }

  _saveText (html) {
    window.localStorage.setItem('pwa-note/content', html);
  }

  _loadContent () {
    const html = window.localStorage.getItem('pwa-note/content') || '<p>Hello World!</div>';
    return html;
  }
}
