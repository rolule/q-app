import type { TranslationResource, defaultNS } from 'locales'
import 'react-i18next'

// for more information, see https://react.i18next.com/latest/typescript
declare module 'react-i18next' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: TranslationResource
  }
}
