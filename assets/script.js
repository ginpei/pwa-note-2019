import Editor from './Editor.js';
import { getElement } from './misc.js';
import * as Preferences from './Preferences.js';
import PreferencesDialog from './PreferencesDialog.js';

function openPreferenceDialog () {
  return new Promise(async (resolve) => {
    const preferences = await Preferences.load();
    const dialog = new PreferencesDialog({
      el: getElement('#preferencesDialog'),
      onComplete: (preferences) => {
        Preferences.save(preferences);
        resolve(preferences);
        dialog.destroy();
      },
      preferences,
    });
    dialog.open();
  });
}

async function main () {
  const preferences = await Preferences.load();

  const editor = new Editor({
    el: getElement('#editor'),
    async onPreferences () {
      const newPref = await openPreferenceDialog();
      editor.setPreferences(newPref);
    },
    preferences,
  });
}

main();
