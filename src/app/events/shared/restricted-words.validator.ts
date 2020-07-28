import {FormControl} from '@angular/forms';

export function restrictedWords(words): any {
  function extracted(control: FormControl): object {
    if (!words) {
      return;
    }
    const badWords = words.map(word => control.value.includes(word) ? word : null)
      .filter(word => word !== null);
    if (badWords.length > 0) {
      return {restrictedWords: badWords.join(',')};
    } else {
      return null;
    }
  }

  return extracted;
}
