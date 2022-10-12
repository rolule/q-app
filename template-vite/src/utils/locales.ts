import { default as i18next } from 'i18next';
import type { CultureCode, LanguageCode } from 'locales';
import { cultureCodes, supportedLngs } from 'locales';

/**
 * Type guard, that checks if a given language code is supported
 * @param languageCode the language code string to check
 * @returns boolean
 */
export const isSupportedLanguage = (
  languageCode: string,
): languageCode is LanguageCode =>
  supportedLngs.includes(languageCode as LanguageCode);

/**
 * Type guard, that checks if a given culture code is supported
 * @param locale the culture code string to check
 * @returns boolean
 */
export const isSupportedCultureCode = (
  cultureCode: string,
): cultureCode is CultureCode =>
  cultureCodes.includes(cultureCode as CultureCode);

/**
 * A wrapper around i18next.changeLanguage, that only accepts valid language codes
 * @param languageCode The language to switch to
 */
export const changeAppLanguage = async (languageCode: LanguageCode) =>
  i18next.changeLanguage(languageCode);
