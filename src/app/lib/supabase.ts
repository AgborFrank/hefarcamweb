
import { createClient } from '@supabase/supabase-js'

// Environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sabhmutbersukiclmtpo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYmhtdXRiZXJzdWtpY2xtdHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjk4NDAsImV4cCI6MjA3MTcwNTg0MH0.BzkZ8ZUsJdCuu1MvAvesEt85yYqUW5ENvnu_3K9AeFk"
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYmhtdXRiZXJzdWtpY2xtdHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjk4NDAsImV4cCI6MjA3MTcwNTg0MH0.BzkZ8ZUsJdCuu1MvAvesEt85yYqUW5ENvnu_3K9AeFk"

// Client-side Supabase client (for browser usage)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for API routes with service role permissions)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})