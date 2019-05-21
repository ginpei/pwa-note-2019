interface EditorOptions {
  el: HTMLElement;
  onPreferences: () => void;
  preferences: Preferences;
}

interface PreferencesDialogOptions {
  beforeInstallPromptEvent: any | null; // BeforeInstallPromptEvent is not defined yet
  el: HTMLElement;
  onComplete: (pref: Preferences) => void;
  preferences: Preferences;
}

interface Preferences {
  fontSize: number;
  lineHeight: number;
}
