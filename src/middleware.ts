import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client for middleware that can access cookies
const createMiddlewareClient = (request: NextRequest) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sabhmutbersukiclmtpo.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYmhtdXRiZXJzdWtpY2xtdHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjk4NDAsImV4cCI6MjA3MTcwNTg0MH0.BzkZ8ZUsJdCuu1MvAvesEt85yYqUW5ENvnu_3K9AeFk";
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        'Cookie': request.headers.get('cookie') || '',
      },
    },
  });
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client for this request
  const supabase = createMiddlewareClient(req);

  // Get the current user using the session cookie
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user, allow access to auth pages
  if (!user) {
    if (req.nextUrl.pathname.startsWith('/onboard') || req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return res;
  }

  // If user exists, check their onboarding status using the admin client for database access
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sabhmutbersukiclmtpo.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYmhtdXRiZXJzdWtpY2xtdHBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjEyOTg0MCwiZXhwIjoyMDcxNzA1ODQwfQ.M8xL6IWMzg2iz8f9dGVTBRKAHbwINuO_agtCCkDFdYw",
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  const { data: profile } = await supabaseAdmin
    .from('user_profiles')
    .select('onboarding_status, account_type')
    .eq('id', user.id)
    .single();

  const isOnboardingPage = req.nextUrl.pathname.startsWith('/onboard');
  const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');

  // If no profile exists, create one and redirect to account type selection
  if (!profile) {
    // Create a basic user profile without default account type
    await supabaseAdmin
      .from('user_profiles')
      .insert({
        id: user.id,
        full_name: user.user_metadata?.full_name || 'User',
        email: user.email,
        phone: user.phone,
        account_type: null, // No default account type - user must choose
        onboarding_status: 'pending',
        onboarding_started_at: new Date().toISOString(),
      });

    // Redirect to account type selection
    if (isDashboardPage) {
      return NextResponse.redirect(new URL('/onboard/account-type', req.url));
    }
    return res;
  }

  // If user hasn't completed onboarding and is trying to access dashboard
  if (profile?.onboarding_status !== 'completed' && isDashboardPage) {
    // Redirect to account type selection if no account type is set
    if (!profile?.account_type) {
      return NextResponse.redirect(new URL('/onboard/account-type', req.url));
    }
    
    // Redirect to appropriate onboarding form based on account type
    return NextResponse.redirect(new URL(`/onboard/${profile.account_type}`, req.url));
  }

  // If user has completed onboarding and is on onboarding page, redirect to dashboard
  if (profile?.onboarding_status === 'completed' && isOnboardingPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    // Disable middleware - using client-side auth protection instead
    // '/dashboard/:path*',
    // '/onboard/:path*',
  ],
}; 