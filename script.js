import Editor from './Editor.js';
import * as Preferences from './Preferences.js';
import PreferencesDialog from './PreferencesDialog.js';

async function main () {
  const preferences = await Preferences.load();

  const editor = new Editor({
    el: document.querySelector('#editor'),
    async onPreferences () {
      const currentPref = await Preferences.load();
      const dialog = new PreferencesDialog({
        el: document.querySelector('#preferencesDialog'),
        onComplete: (preferences) => {
          editor.setPreferences(preferences);
          Preferences.save(preferences);
        },
        preferences: currentPref,
      });
      dialog.open();
    },
    preferences,
  });
}

main();
