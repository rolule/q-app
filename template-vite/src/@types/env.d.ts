/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_FALLBACK_LANGUAGE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
