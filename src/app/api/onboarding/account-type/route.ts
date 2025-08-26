import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";

export async function GET() {
  return NextResponse.json({ message: "Account type API is working" });
}

export async function POST(request: NextRequest) {
  console.log("=== Account type API route called ===");
  console.log("Request method:", request.method);
  console.log("Request URL:", request.url);
  
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Verify the token and get user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const { accountType } = await request.json();
    
    console.log("Received account type:", accountType);
    console.log("User ID:", user.id);
    
    // Validate account type
    const validAccountTypes = ["farmer", "cooperative", "buyer"];
    if (!validAccountTypes.includes(accountType)) {
      return NextResponse.json(
        { error: `Invalid account type: ${accountType}. Must be one of: ${validAccountTypes.join(', ')}` },
        { status: 400 }
      );
    }



    // Get account type ID
    const { data: accountTypeData, error: accountTypeError } = await supabaseAdmin
      .from("account_types")
      .select("id")
      .eq("name", accountType)
      .single();

    if (accountTypeError) {
      console.error("Error fetching account type:", accountTypeError);
      return NextResponse.json(
        { error: `Account type not found: ${accountTypeError.message}` },
        { status: 404 }
      );
    }

    if (!accountTypeData) {
      return NextResponse.json(
        { error: `Account type '${accountType}' not found in database` },
        { status: 404 }
      );
    }

    // Update user profile with account type
    console.log("Updating user profile for user:", user.id);
    const { error: updateError } = await supabaseAdmin
      .from("user_profiles")
      .update({
        account_type: accountType,
        account_type_id: accountTypeData.id,
        onboarding_status: "in_progress",
        onboarding_started_at: new Date().toISOString()
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating user profile:", updateError);
      return NextResponse.json(
        { error: `Failed to update account type: ${updateError.message}` },
        { status: 500 }
      );
    }

    console.log("User profile updated successfully");

    // Create or update onboarding tracking record
    console.log("Creating/updating onboarding tracking record for user:", user.id);
    const { error: trackingError } = await supabaseAdmin
      .from("onboarding_tracking")
      .upsert({
        user_id: user.id,
        account_type_id: accountTypeData.id,
        current_step: "account_type",
        total_steps: 4, // account_type, personal_info, business_info, verification
        completed_steps: ["account_type"],
        is_complete: false
      }, {
        onConflict: 'user_id'
      });

    if (trackingError) {
      console.error("Error creating/updating onboarding tracking:", trackingError);
      return NextResponse.json(
        { error: `Failed to create onboarding tracking: ${trackingError.message}` },
        { status: 500 }
      );
    }

    console.log("Onboarding tracking record created successfully");

    return NextResponse.json({
      success: true,
      message: "Account type updated successfully",
      nextStep: "personal_info"
    });

  } catch (error) {
    console.error("Account type API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 