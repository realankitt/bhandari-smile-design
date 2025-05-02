/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly NEXT_PUBLIC_TINA_CLIENT_ID: string
  readonly TINA_TOKEN: string
  readonly GITHUB_BRANCH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}