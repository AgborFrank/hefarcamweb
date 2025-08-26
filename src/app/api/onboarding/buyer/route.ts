import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const {
      companyName,
      businessRegistrationNumber,
      companyLocation,
      businessType,
      companySize,
      primaryProducts,
      exportDestinations,
      annualPurchaseVolume,
      currency,
      bankAccountNumber,
      bankName,
      bankBranch,
      contactPersonName,
      contactPersonPhone,
      contactPersonEmail,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelationship
    } = await request.json();

    // Validate required fields
    if (!companyName || !companyLocation || !contactPersonName || !contactPersonPhone) {
      return NextResponse.json(
        { error: "Company name, location, contact person name and phone are required" },
        { status: 400 }
      );
    }

    // Get the user from the request
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // Create or update buyer profile
    const { data: buyerData, error: buyerError } = await supabaseAdmin
      .from("buyers")
      .upsert({
        user_id: user.id,
        company_name: companyName,
        business_registration_number: businessRegistrationNumber,
        company_location: companyLocation,
        business_type: businessType,
        company_size: companySize,
        primary_products: primaryProducts || [],
        export_destinations: exportDestinations || [],
        annual_purchase_volume: annualPurchaseVolume ? parseFloat(annualPurchaseVolume) : null,
        currency: currency || "USD",
        bank_account_number: bankAccountNumber,
        bank_name: bankName,
        bank_branch: bankBranch,
        contact_person_name: contactPersonName,
        contact_person_phone: contactPersonPhone,
        contact_person_email: contactPersonEmail,
        emergency_contact_name: emergencyContactName,
        emergency_contact_phone: emergencyContactPhone,
        emergency_contact_relationship: emergencyContactRelationship,
        is_onboarding_complete: true,
        onboarding_completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (buyerError) {
      console.error("Error creating buyer profile:", buyerError);
      return NextResponse.json(
        { error: "Failed to create buyer profile" },
        { status: 500 }
      );
    }

    // Update user profile to mark onboarding as completed
    const { error: profileError } = await supabaseAdmin
      .from("user_profiles")
      .update({
        onboarding_status: "completed",
        onboarding_completed_at: new Date().toISOString(),
        buyer_id: buyerData.id
      })
      .eq("id", user.id);

    if (profileError) {
      console.error("Error updating user profile:", profileError);
    }

    // Update onboarding tracking
    const { error: trackingError } = await supabaseAdmin
      .from("onboarding_tracking")
      .update({
        current_step: "complete",
        completed_steps: ["account_type", "personal_info", "business_info", "verification"],
        is_complete: true,
        completed_at: new Date().toISOString()
      })
      .eq("user_id", user.id);

    if (trackingError) {
      console.error("Error updating onboarding tracking:", trackingError);
    }

    return NextResponse.json({
      success: true,
      message: "Buyer profile created successfully",
      buyerId: buyerData.id
    });

  } catch (error) {
    console.error("Buyer onboarding API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 