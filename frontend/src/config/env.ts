/**
 * Environment configuration and startup validation for CareerForge AI.
 * Ensures required environment variables are present with actionable error messages.
 */

interface Config {
  supabaseUrl: string
  supabaseAnonKey: string
  isDev: boolean
  isProd: boolean
}

function validateEnv(): Config {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

  const missing: string[] = []

  if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
    missing.push('VITE_SUPABASE_URL')
  }

  if (!supabaseAnonKey || supabaseAnonKey === 'placeholder-anon-key') {
    missing.push('VITE_SUPABASE_ANON_KEY')
  }

  if (missing.length > 0 && import.meta.env.PROD) {
    throw new Error(
      `[Env Config Error] Missing required production environment variables: ${missing.join(', ')}. Please update your .env file or environment configuration.`,
    )
  }

  return {
    supabaseUrl: supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey: supabaseAnonKey || 'placeholder-anon-key',
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  }
}

export const env = validateEnv()
