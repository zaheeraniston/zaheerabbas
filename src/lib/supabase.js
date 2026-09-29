import { createClient } from '@supabase/supabase-js'

const DEFAULT_SUPABASE_URL = 'https://tqmxwspzjesriobhpizk.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_qR_dt-KLjYqBL6qzoQRgQg_5xqA-nPM'

// Get credentials from Vite environment variables or localStorage fallback
const getSupabaseCredentials = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  const localUrl = typeof window !== 'undefined' ? localStorage.getItem('zaheer_supabase_url') : null
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('zaheer_supabase_key') : null

  const supabaseUrl = envUrl || localUrl || DEFAULT_SUPABASE_URL
  const supabaseAnonKey = envKey || localKey || DEFAULT_SUPABASE_ANON_KEY

  return { supabaseUrl, supabaseAnonKey }
}

let supabaseInstance = null

export const getSupabaseClient = () => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseCredentials()

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_URL') {
    return null
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

export const isSupabaseConfigured = () => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseCredentials()
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20
  )
}

/**
 * Fetch portfolio content from Supabase table 'portfolio_content'
 */
export const fetchCloudPortfolioData = async () => {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) return null

    const { data, error } = await supabase
      .from('portfolio_content')
      .select('content')
      .eq('id', 'zaheer_portfolio')
      .single()

    if (error) {
      console.warn('Supabase fetch notice:', error.message)
      return null
    }

    if (data && data.content) {
      return data.content
    }
  } catch (err) {
    console.warn('Supabase connection error:', err)
  }
  return null
}

/**
 * Save portfolio content to Supabase table 'portfolio_content'
 */
export const saveCloudPortfolioData = async (portfolioData) => {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) return { success: false, reason: 'not_configured' }

    const { error } = await supabase
      .from('portfolio_content')
      .upsert(
        {
          id: 'zaheer_portfolio',
          content: portfolioData,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )

    if (error) {
      console.error('Supabase save error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Supabase save error:', err)
    return { success: false, error: err.message }
  }
}
