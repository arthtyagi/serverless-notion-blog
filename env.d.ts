/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_NOTION_BASE: string

  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
