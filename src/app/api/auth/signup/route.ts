import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, phone, signupMethod } = body;

    // Validate required fields
    if (!fullName || !password) {
      return NextResponse.json(
        { error: 'Full name and password are required' },
        { status: 400 }
      );
    }

    if (signupMethod === 'email' && !email) {
      return NextResponse.json(
        { error: 'Email is required for email signup' },
        { status: 400 }
      );
    }

    if (signupMethod === 'phone' && !phone) {
      return NextResponse.json(
        { error: 'Phone number is required for phone signup' },
        { status: 400 }
      );
    }

    // Prepare user metadata
    const userMetadata = {
      full_name: fullName,
      phone: phone || null,
    };

    let signUpResponse;

    if (signupMethod === 'email') {
      // Email signup - use client-side instance for proper session handling
      signUpResponse = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata,
          emailRedirectTo: `${request.nextUrl.origin}/auth/callback`,
        },
      });
    } else if (signupMethod === 'phone') {
      // Phone signup - use client-side instance for proper session handling
      signUpResponse = await supabase.auth.signUp({
        phone,
        password,
        options: {
          data: userMetadata,
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid signup method. Use "email" or "phone"' },
        { status: 400 }
      );
    }

    if (signUpResponse.error) {
      return NextResponse.json(
        { error: signUpResponse.error.message },
        { status: 400 }
      );
    }

    // Create user profile record - use admin instance for database operations
    if (signUpResponse.data.user) {
      const { error: profileError } = await supabaseAdmin
        .from('user_profiles')
        .insert({
          id: signUpResponse.data.user.id,
          full_name: fullName,
          email: email || null,
          phone: phone || null,
          account_type: null, // No default account type - user must choose
          onboarding_status: 'pending',
          onboarding_started_at: new Date().toISOString(),
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        // Don't fail the signup if profile creation fails, but log it
      }
    }

    // For email signup, redirect directly to account type selection
    // Email confirmation will be handled separately via email link
    if (signupMethod === 'email') {
      return NextResponse.json({
        success: true,
        message: 'Account created successfully! Please check your email to confirm your account.',
        user: signUpResponse.data.user,
        redirectTo: '/onboard/account-type'
      });
    }

    // Check if phone confirmation is required
    if (signUpResponse.data.user && !signUpResponse.data.user.phone_confirmed_at) {
      return NextResponse.json({
        success: true,
        message: 'Please check your phone for verification code',
        requiresConfirmation: true,
        user: signUpResponse.data.user,
        requiresVerification: true,
        redirectTo: '/onboard/verification'
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: signUpResponse.data.user,
      session: signUpResponse.data.session,
      redirectTo: '/onboard/account-type'
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 