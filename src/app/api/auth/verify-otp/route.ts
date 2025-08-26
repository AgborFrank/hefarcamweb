import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, token, type } = body;

    // Validate required fields
    if (!phone || !token) {
      return NextResponse.json(
        { error: 'Phone number and verification token are required' },
        { status: 400 }
      );
    }

    if (!type || !['sms', 'signup', 'recovery'].includes(type)) {
      return NextResponse.json(
        { error: 'Valid verification type is required (sms, signup, or recovery)' },
        { status: 400 }
      );
    }

    // Verify the OTP token
    const { data, error } = await supabaseAdmin.auth.verifyOtp({
      phone,
      token,
      type: type as 'sms' | 'signup' | 'recovery',
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Check if user has completed onboarding
    if (data.user) {
      const { data: profile } = await supabaseAdmin
        .from('user_profiles')
        .select('onboarding_status, account_type')
        .eq('id', data.user.id)
        .single();

      // If user hasn't completed onboarding, redirect to account type selection
      if (profile && profile.onboarding_status !== 'completed') {
        return NextResponse.json({
          success: true,
          message: 'Verification successful',
          user: data.user,
          session: data.session,
          redirectTo: '/onboard/account-type'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Verification successful',
      user: data.user,
      session: data.session,
      redirectTo: '/dashboard'
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 