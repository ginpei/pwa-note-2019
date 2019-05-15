interface EditorOptions {
  el: HTMLElement;
  onPreferences: () => void;
  preferences: Preferences;
}

interface PreferencesDialogOptions {
  el: HTMLElement;
  onComplete: (pref: Preferences) => void;
  preferences: Preferences;
}

interface Preferences {
  fontSize: number;
  lineHeight: number;
}
