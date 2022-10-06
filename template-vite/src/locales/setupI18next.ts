import { default as i18next } from 'i18next';
import { default as LanguageDetector } from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { defaultNS, fallbackLng, resources, supportedLngs } from 'locales';

// initialize i18next
void i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng,
    supportedLngs,
    defaultNS,
    interpolation: {
      // react already safes from xss, see https://www.i18next.com/translation-function/interpolation#unescape
      escapeValue: false,
    },

    // browser language detector options, see https://github.com/i18next/i18next-browser-languageDetector
    detection: {
      lookupLocalStorage: 'language',
    },
  });

// update the document language when i18next is initialized or the language is changed
i18next.on('languageChanged', () => {
  // change the direction of the document for RTL languages
  document.body.setAttribute('dir', i18next.dir(i18next.language));

  // set the html lang attribute
  document.documentElement.setAttribute('lang', i18next.language);

  // TODO: Change date library locale
  // e.g: setDayJSLocale(languageCode);
});
