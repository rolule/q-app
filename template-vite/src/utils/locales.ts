import { default as i18next } from 'i18next';
import {
  CultureCode,
  cultureCodes,
  LanguageCode,
  supportedLngs,
} from 'locales';

/**
 * Checks if a given language code is supported
 * @param languageCode the language code string to check
 * @returns boolean
 */
export const isSupportedLanguage = (languageCode: string) =>
  supportedLngs.includes(languageCode as LanguageCode);

/**
 * Checks if a given culture code is supported
 * @param locale the culture code string to check
 * @returns boolean
 */
export const isSupportedCultureCode = (cultureCode: string) =>
  cultureCodes.includes(cultureCode as CultureCode);

/**
 * A wrapper around i18next.changeLanguage, that only accepts valid language codes
 * @param languageCode The language to switch to
 */
export const changeAppLanguage = (languageCode: LanguageCode) =>
  i18next.changeLanguage(languageCode);
