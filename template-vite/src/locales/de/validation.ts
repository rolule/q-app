import type { TranslationResource } from 'locales'

export const validation: TranslationResource['validation'] = {
  unkown: 'Unbekannter Fehler',
  email: 'Diese E-Mail Adresse ist nicht valide',
  password: {
    min: 'Das Passwort muss mindestens {{ min }} Zeichen lang sein',
  },
}
