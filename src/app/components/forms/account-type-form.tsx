"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/app/lib/supabase";
import { toast } from "sonner";

interface AccountTypeFormProps {
  onAccountTypeChange: (type: "farmer" | "cooperative" | "buyer") => void;
}

export function AccountTypeForm({ onAccountTypeChange }: AccountTypeFormProps) {
  const router = useRouter();
  const [selectedAccountType, setSelectedAccountType] = useState<
    "farmer" | "cooperative" | "buyer" | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccountTypeChange = (
    value: "farmer" | "cooperative" | "buyer"
  ) => {
    setSelectedAccountType(value);
    onAccountTypeChange(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAccountType) {
      toast.error("Please select an account type to continue");
      return;
    }

    setIsLoading(true);

    try {
      // Get the current session to include auth headers
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        console.error("No active session found");
        toast.error("No active session found. Please log in again.");
        return;
      }

      console.log("Session user ID:", session.user.id);
      console.log("Session expires at:", session.expires_at);
      console.log("Session token length:", session.access_token.length);

      const requestBody = { accountType: selectedAccountType };
      console.log("Sending request:", {
        url: "/api/onboarding/account-type",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token.substring(0, 20)}...`,
        },
        body: requestBody,
      });

      const response = await fetch("/api/onboarding/account-type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success response:", responseData);
        toast.success("Account type selected successfully!");
        // Redirect to the appropriate onboarding form
        router.push(`/onboard/${selectedAccountType}`);
      } else {
        // Try to get the response text first to see what's actually returned
        const responseText = await response.text();
        console.log("Raw response text:", responseText);

        let errorData: any = {};
        try {
          errorData = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse response as JSON:", parseError);
          errorData = { error: `Invalid JSON response: ${responseText}` };
        }

        console.error("Failed to save account type:", errorData);
        const errorMessage =
          errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error saving account type:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const testApiConnection = async () => {
    try {
      const response = await fetch("/api/onboarding/account-type", {
        method: "GET",
      });
      const data = await response.json();
      console.log("API test response:", data);
      toast.success("API connection test successful");
    } catch (error) {
      console.error("API test failed:", error);
      toast.error("API connection test failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Choose Your Account Type
          </h1>
          <p className="text-muted-foreground">
            Select the account type that best describes your role in the
            agricultural value chain.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={testApiConnection}
            className="mt-2"
          >
            Test API Connection
          </Button>
        </div>

        <RadioGroup
          value={selectedAccountType}
          onValueChange={(value) =>
            handleAccountTypeChange(value as "farmer" | "cooperative" | "buyer")
          }
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent cursor-pointer">
            <RadioGroupItem value="farmer" id="farmer" />
            <Label htmlFor="farmer" className="flex-1 cursor-pointer">
              <div className="space-y-1">
                <div className="font-medium">Farmer</div>
                <div className="text-sm text-muted-foreground">
                  Individual farmers who grow and sell agricultural products
                </div>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent cursor-pointer">
            <RadioGroupItem value="cooperative" id="cooperative" />
            <Label htmlFor="cooperative" className="flex-1 cursor-pointer">
              <div className="space-y-1">
                <div className="font-medium">Cooperative</div>
                <div className="text-sm text-muted-foreground">
                  Organizations that aggregate produce from multiple farmers
                </div>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent cursor-pointer">
            <RadioGroupItem value="buyer" id="buyer" />
            <Label htmlFor="buyer" className="flex-1 cursor-pointer">
              <div className="space-y-1">
                <div className="font-medium">Buyer/Exporter</div>
                <div className="text-sm text-muted-foreground">
                  Buyers and exporters who source agricultural products
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        size="lg"
        type="submit"
        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Continue"}
      </Button>
    </form>
  );
}
