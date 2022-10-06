import { de } from './de';
import { en } from './en';

// the resource definitions used by i18next
export const resources = { en, de } as const;

// types for checking language
export type LanguageCode = keyof typeof resources;
export type TranslationResource = typeof en;
export type TranslationKey = keyof TranslationResource;

// App wide locale configuration options
export const fallbackLng: LanguageCode = 'en';
export const defaultLng: LanguageCode = 'en';
export const supportedLngs = Object.keys(resources) as readonly LanguageCode[];
export const defaultNS: TranslationKey = 'common';

// a set of BCP 47 language codes
// see https://www.i18next.com/how-to/faq#how-should-the-language-codes-be-formatted
export const cultureCodes = ['en-US', 'de-DE'] as const;
export type CultureCode = typeof cultureCodes[number];

// a mapping of languages codes to their culture code
export const codeToCultureMap: Record<LanguageCode, CultureCode> = {
  en: 'en-US',
  de: 'de-DE',
};

// a mapping of languages codes to their language name
export const codeToLanguageMap: Record<LanguageCode, string> = {
  en: 'English',
  de: 'Deutsch',
};
