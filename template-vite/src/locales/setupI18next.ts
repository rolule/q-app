import { default as i18next } from 'i18next'
import { default as LanguageDetector } from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { defaultNS, fallbackLng, languageLocalstorageKey, resources, supportedLngs } from 'locales'
import { changeAppLanguage, isSupportedLanguage } from 'utils/locales'

// update the document language when i18next is initialized or the language is changed or initialized
i18next.on('languageChanged', () => {
  // change back to the fallback language if the language code is not supported
  if (!isSupportedLanguage(i18next.language)) {
    return void changeAppLanguage(fallbackLng)
  }

  // change the direction of the document for RTL languages
  document.body.setAttribute('dir', i18next.dir(i18next.language))

  // set the html lang attribute
  document.documentElement.setAttribute('lang', i18next.language)

  // TODO: Change date library locale
  // e.g: setDayJSLocale(languageCode);
})

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
      // the language cookie stores the users selected or detected language
      lookupLocalStorage: languageLocalstorageKey,
    },
  })
