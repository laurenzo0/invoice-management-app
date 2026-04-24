import { createClient } from '@supabase/supabase-js'

export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_DATABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('Supabase Config Error:', { 
      hasUrl: !!url, 
      hasKey: !!key,
      envKeys: Object.keys(process.env).filter(k => k.includes('SUPABASE'))
    })
    throw new Error('Missing Supabase URL or Key environment variables')
  }

  // Ensure the URL is actually a URL (Netlify sometimes uses SUPABASE_DATABASE_URL for the postgres connection)
  if (url.startsWith('postgres://')) {
    // If it's a postgres URL, we still need the API URL. 
    // Usually Netlify sets SUPABASE_URL too, but let's be safe.
    throw new Error('SUPABASE_DATABASE_URL is a postgres connection string, but createClient needs the API URL (https://...). Please add SUPABASE_URL to your environment variables.')
  }

  return createClient(url, key, { auth: { persistSession: false } })
}

