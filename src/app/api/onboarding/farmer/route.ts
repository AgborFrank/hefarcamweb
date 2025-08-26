import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const {
      // Farm Information
      farmName,
      country,
      state,
      city,
      village,
      address,
      farmSizeHectares,
      primaryCrops,
      farmingExperienceYears,
      

      
      // Payment Information
      paymentMethodType,
      bankAccountNumber,
      bankName,
      mobileMoneyProvider,
      mobileMoneyNumber,
      cryptocurrencyWalletAddress,
      cryptocurrencyType,
      
      // Emergency Contact (if any)
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelationship
    } = await request.json();

    // Validate required fields
    if (!farmName || !address) {
      return NextResponse.json(
        { error: "Farm name and address are required" },
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

    // Create or update farmer profile first
    const { data: farmerData, error: farmerError } = await supabaseAdmin
      .from("farmers")
      .upsert({
        user_id: user.id,
        // Payment method fields
        payment_method_type: paymentMethodType,
        bank_account_number: paymentMethodType === 'bank' ? bankAccountNumber : null,
        bank_name: paymentMethodType === 'bank' ? bankName : null,
        mobile_money_provider: paymentMethodType === 'mobile_money' ? mobileMoneyProvider : null,
        mobile_money_number: paymentMethodType === 'mobile_money' ? mobileMoneyNumber : null,
        cryptocurrency_wallet_address: paymentMethodType === 'cryptocurrency' ? cryptocurrencyWalletAddress : null,
        cryptocurrency_type: paymentMethodType === 'cryptocurrency' ? cryptocurrencyType : null,
        // Emergency contact
        emergency_contact_name: emergencyContactName,
        emergency_contact_phone: emergencyContactPhone,
        emergency_contact_relationship: emergencyContactRelationship,
        is_onboarding_complete: true,
        onboarding_completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (farmerError) {
      console.error("Error creating farmer profile:", farmerError);
      return NextResponse.json(
        { error: "Failed to create farmer profile" },
        { status: 500 }
      );
    }

    // Create farm record
    const { data: farmData, error: farmError } = await supabaseAdmin
      .from("farms")
      .insert({
        farmer_id: farmerData.id,
        farm_name: farmName,
        country_code: country,
        state_code: state,
        city_name: city,
        village: village,
        address: address,
        farm_size_hectares: farmSizeHectares ? parseFloat(farmSizeHectares) : null,
        primary_crops: primaryCrops ? primaryCrops.split(",").map((crop: string) => crop.trim()).filter(Boolean) : [],
        farming_experience_years: farmingExperienceYears ? parseInt(farmingExperienceYears) : null,
        geocoding_status: 'pending',
        // Set as primary farm
        is_primary_farm: true,
        is_active: true,
        farm_status: 'active',
        created_by: user.id
      })
      .select()
      .single();

    if (farmError) {
      console.error("Error creating farm:", farmError);
      return NextResponse.json(
        { error: "Failed to create farm" },
        { status: 500 }
      );
    }

    // Update user profile to mark onboarding as completed
    const { error: profileError } = await supabaseAdmin
      .from("user_profiles")
      .update({
        onboarding_status: "completed",
        onboarding_completed_at: new Date().toISOString(),
        farmer_id: farmerData.id
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
      message: "Farmer profile and farm created successfully",
      farmerId: farmerData.id,
      farmId: farmData.id,
      farmCode: farmData.farm_code
    });

  } catch (error) {
    console.error("Farmer onboarding API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 