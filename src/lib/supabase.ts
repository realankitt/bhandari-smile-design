import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Env check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseKey,
  envs: import.meta.env
})

if (!supabaseUrl || !supabaseKey) {
  throw new Error(`Missing Supabase environment variables: 
    URL: ${!!supabaseUrl}, 
    KEY: ${!!supabaseKey}
  `)
}

export const supabase = createClient(supabaseUrl, supabaseKey)