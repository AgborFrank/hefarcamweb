import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, phone, loginMethod } = body;

    // Validate required fields
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    if (loginMethod === 'email' && !email) {
      return NextResponse.json(
        { error: 'Email is required for email login' },
        { status: 400 }
      );
    }

    if (loginMethod === 'phone' && !phone) {
      return NextResponse.json(
        { error: 'Phone number is required for phone login' },
        { status: 400 }
      );
    }

    let signInResponse;

    if (loginMethod === 'email') {
      // Email login - use client-side instance for proper session handling
      signInResponse = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } else if (loginMethod === 'phone') {
      // Phone login - first send OTP
      const { data, error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          shouldCreateUser: false, // Don't create user if they don't exist
        },
      });

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Verification code sent to your phone',
        requiresVerification: true,
        phone,
        redirectTo: '/onboard/verification'
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid login method. Use "email" or "phone"' },
        { status: 400 }
      );
    }

    if (signInResponse.error) {
      return NextResponse.json(
        { error: signInResponse.error.message },
        { status: 400 }
      );
    }

    // For email login, check if email confirmation is required
    if (signInResponse.data.user && !signInResponse.data.user.email_confirmed_at) {
      return NextResponse.json({
        success: false,
        error: 'Please confirm your email address before logging in',
        requiresConfirmation: true,
      });
    }

    // Ensure user profile exists (for backward compatibility) - use admin instance
    if (signInResponse.data.user) {
      const { data: existingProfile } = await supabaseAdmin
        .from('user_profiles')
        .select('id, onboarding_status, account_type')
        .eq('id', signInResponse.data.user.id)
        .single();

      if (!existingProfile) {
        // Create user profile if it doesn't exist
        const { error: profileError } = await supabaseAdmin
          .from('user_profiles')
          .insert({
            id: signInResponse.data.user.id,
            full_name: signInResponse.data.user.user_metadata?.full_name || 'User',
            email: signInResponse.data.user.email,
            phone: signInResponse.data.user.phone,
            account_type: null, // No default account type - user must choose
            onboarding_status: 'pending',
            onboarding_started_at: new Date().toISOString(),
          });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          // Don't fail the login if profile creation fails, but log it
        }
      }

      // Check if user has completed onboarding
      if (existingProfile && existingProfile.onboarding_status !== 'completed') {
        return NextResponse.json({
          success: true,
          message: 'Login successful',
          user: signInResponse.data.user,
          session: signInResponse.data.session,
          redirectTo: '/onboard/account-type'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: signInResponse.data.user,
      session: signInResponse.data.session,
      redirectTo: '/dashboard'
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 