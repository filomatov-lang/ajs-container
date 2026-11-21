export default class Settings {
  constructor() {
    this.defaultSettings = new Map([
      ['theme', 'dark'],
      ['music', 'trance'],
      ['difficulty', 'easy'],
    ]);

    this.userSettings = new Map();

    this.allowedValues = new Map([
      ['theme', ['dark', 'light', 'gray']],
      ['music', ['trance', 'pop', 'rock', 'chillout', 'off']],
      ['difficulty', ['easy', 'normal', 'hard', 'nightmare']],
    ]);
  }

  setUserSettings(key, value) {
    if (!this.allowedValues.has(key)) {
      throw new Error(`Неизвестная настройка: ${key}`);
    }

    if (!this.allowedValues.get(key).includes(value)) {
      throw new Error(`Недопустимое значение ${value} для настройки ${key}`);
    }

    this.userSettings.set(key, value);
  }

  get settings() {
    return new Map([...this.defaultSettings, ...this.userSettings]);
  }
}
