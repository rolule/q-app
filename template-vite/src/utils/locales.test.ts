import { default as i18next } from 'i18next';
import {
  changeAppLanguage,
  isSupportedCultureCode,
  isSupportedLanguage,
} from './locales';
import {
  cultureCodes,
  fallbackLng,
  languageLocalstorageKey,
  supportedLngs,
} from 'locales';

// @vitest-environment jsdom

// destructure supported languages for easier use
const [lang0, lang1] = supportedLngs;

describe('isSupportedLanguage', () => {
  it('returns true for supported language', () => {
    expect(isSupportedLanguage(lang0)).toBe(true);
  });

  it('returns false for unsupported language', () => {
    expect(isSupportedLanguage('randomLanguage')).toBe(false);
  });
});

describe('isSupportedCultureCode', () => {
  it('returns true for supported culture code', () => {
    expect(isSupportedCultureCode(cultureCodes[0])).toBe(true);
  });

  it('returns false for unsupported culture code', () => {
    expect(isSupportedCultureCode('randomCultureCode')).toBe(false);
  });
});

describe('changeAppLanguage', () => {
  beforeEach(async () => {
    // clear localStorage of language cookie
    window.localStorage.clear();

    // initialize i18next
    await import('locales/setupI18next');
  });

  it('sets the i18next language', async () => {
    // the language should be set after setup
    expect(i18next.language).toBeTruthy();

    // change App language to German
    await changeAppLanguage(lang0);
    expect(i18next.language).toBe(lang0);

    // change App language to English
    await changeAppLanguage(lang1);
    expect(i18next.language).toBe(lang1);
  });

  it('sets the language cookie', async () => {
    // change App language to German
    await changeAppLanguage(lang0);
    expect(window.localStorage.getItem(languageLocalstorageKey)).toBe(lang0);

    // change App language to English
    await changeAppLanguage(lang1);
    expect(window.localStorage.getItem(languageLocalstorageKey)).toBe(lang1);
  });

  it('sets the html lang tag', async () => {
    // change App language to German
    await changeAppLanguage(lang0);
    expect(document.documentElement.getAttribute('lang')).toBe(lang0);

    // change App language to English
    await changeAppLanguage(lang1);
    expect(document.documentElement.getAttribute('lang')).toBe(lang1);
  });
});

describe('i18next.changeLanguage', () => {
  beforeEach(async () => {
    // clear localStorage of language cookie
    window.localStorage.clear();

    // initialize i18next
    await import('locales/setupI18next');
  });

  it('sets the language if it is supported', async () => {
    await i18next.changeLanguage(lang0);
    expect(i18next.language).toBe(lang0);

    await i18next.changeLanguage(lang1);
    expect(i18next.language).toBe(lang1);
  });

  it('sets the fallback language if it is not supported', async () => {
    await i18next.changeLanguage(lang0);
    expect(i18next.language).toBe(lang0);

    await i18next.changeLanguage('unsupportedLanguage');
    expect(i18next.language).toBe(fallbackLng);
  });
});
