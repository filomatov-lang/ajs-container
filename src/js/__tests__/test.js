import Settings from '../app.js';

describe('класс Settings', () => {
  test('setSetting выбрасывает ошибку для неизвестного ключа', () => {
    const settings = new Settings();

    expect(() => settings.setUserSettings('volume', 'loud')).toThrow(
      'Неизвестная настройка: volume',
    );
  });

  test('setSetting выбрасывает ошибку для недопустимого значения', () => {
    const settings = new Settings();

    expect(() => settings.setUserSettings('theme', 'pink')).toThrow(
      'Недопустимое значение pink для настройки theme',
    );
  });

  test('setSetting добавляет пользовательскую настройку', () => {
    const settings = new Settings();
    settings.setUserSettings('theme', 'gray');

    const expected = new Map([['theme', 'gray']]);

    expect(settings.userSettings).toEqual(expected);
  });

  test('геттер возвращает полученный массив настроек, все дефолные настройки должны быть перезаписаны', () => {
    const settings = new Settings();
    settings.setUserSettings('theme', 'gray');
    settings.setUserSettings('music', 'rock');
    settings.setUserSettings('difficulty', 'normal');

    const expected = new Map([
      ['theme', 'gray'],
      ['music', 'rock'],
      ['difficulty', 'normal'],
    ]);
    expect(settings.settings).toEqual(expected);
  });

  test('геттер возвращает полученный массив настроек, пользователь ввел две настройки и одна совпала с настройкой по умолчанию', () => {
    const settings = new Settings();
    settings.setUserSettings('music', 'trance');
    settings.setUserSettings('difficulty', 'hard');

    const expected = new Map([
      ['theme', 'dark'],
      ['music', 'trance'],
      ['difficulty', 'hard'],
    ]);
    expect(settings.settings).toEqual(expected);
  });

  test('геттер возвращает полученный массив настроек, пользователь не менял настройки', () => {
    const settings = new Settings();

    const expected = new Map([
      ['theme', 'dark'],
      ['music', 'trance'],
      ['difficulty', 'easy'],
    ]);
    expect(settings.settings).toEqual(expected);
  });
});
