"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country, State, City } from "country-state-city";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  // Farm Information (will be stored in farms table)
  farmName: string;
  country: string;
  state: string;
  city: string;
  village: string;
  address: string;
  farmSizeHectares: string;
  primaryCrops: string;
  farmingExperienceYears: string;

  // Payment method fields (stored in farmers table)
  paymentMethodType: string;
  bankAccountNumber: string;
  bankName: string;
  mobileMoneyProvider: string;
  mobileMoneyNumber: string;
  cryptocurrencyWalletAddress: string;
  cryptocurrencyType: string;
}

export function FarmerOnboardingForm() {
  const router = useRouter();
  const { session } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    farmName: "",
    country: "CM", // Default to Cameroon
    state: "",
    city: "",
    village: "",
    address: "",
    farmSizeHectares: "",
    primaryCrops: "",
    farmingExperienceYears: "",

    // Payment method fields
    paymentMethodType: "bank",
    bankAccountNumber: "",
    bankName: "",
    mobileMoneyProvider: "",
    mobileMoneyNumber: "",
    cryptocurrencyWalletAddress: "",
    cryptocurrencyType: "",
  });

  // State for location dropdowns
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const PrimaryCrops = [
    "Cocoa",
    "Coffee",
    "Tea",
    "Banana",
    "Cashew",
    "Sesame",
    "Sunflower",
    "Rice",
    "Millet",
    "Sorghum",
    "Maize",
    "Beans",
    "Peanuts",
    "Groundnuts",
    "Soybeans",
    "Cotton",
    "Sugar cane",
    "Tobacco",
    "Rubber",
    "Oil Palm",
    "Other",
  ];

  const MobileMoneyProviders = [
    "MTN Mobile Money",
    "Orange Money",
    "Moov Money",
    "Express Union",
    "Western Union",
    "MoneyGram",
    "Other",
  ];

  const CryptocurrencyTypes = [
    "Bitcoin (BTC)",
    "Ethereum (ETH)",
    "USDT (Tether)",
    "USDC (USD Coin)",
    "BNB (Binance Coin)",
    "Cardano (ADA)",
    "Solana (SOL)",
    "Hefarcash (HEF)",
    "Other",
  ];

  // Load countries on component mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (formData.country) {
      setStates(State.getStatesOfCountry(formData.country));
      setFormData((prev) => ({ ...prev, state: "", city: "" }));
    } else {
      setStates([]);
    }
  }, [formData.country]);

  // Load cities when state changes
  useEffect(() => {
    if (formData.country && formData.state) {
      setCities(City.getCitiesOfState(formData.country, formData.state));
      setFormData((prev) => ({ ...prev, city: "" }));
    } else {
      setCities([]);
    }
  }, [formData.country, formData.state]);

  const totalSteps = 3;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!session?.access_token) {
        throw new Error("No authentication token available");
      }

      const response = await fetch("/api/onboarding/farmer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          // Farm Information
          farmName: formData.farmName,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          village: formData.village,
          address: formData.address,
          farmSizeHectares: formData.farmSizeHectares,
          primaryCrops: formData.primaryCrops,
          farmingExperienceYears: formData.farmingExperienceYears,

          // Payment Information
          paymentMethodType: formData.paymentMethodType,
          bankAccountNumber: formData.bankAccountNumber,
          bankName: formData.bankName,
          mobileMoneyProvider: formData.mobileMoneyProvider,
          mobileMoneyNumber: formData.mobileMoneyNumber,
          cryptocurrencyWalletAddress: formData.cryptocurrencyWalletAddress,
          cryptocurrencyType: formData.cryptocurrencyType,
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to create farmer profile");
      }
    } catch (error) {
      console.error("Error:", error);
      // You might want to show a toast notification here
      alert(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4 pt-6">
      <div className="space-y-2">
        <Label htmlFor="farmName">Farm Name *</Label>
        <Input
          id="farmName"
          className="bg-white h-12"
          value={formData.farmName}
          onChange={(e) => updateFormData("farmName", e.target.value)}
          placeholder="Enter your farm name"
          required
        />
        <p className="text-xs text-muted-foreground">
          This is the name that will be displayed to buyers and cooperatives.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => updateFormData("country", value)}
          >
            <SelectTrigger className="bg-white h-12 w-full">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Region Name *</Label>
          <Select
            value={formData.state}
            onValueChange={(value) => updateFormData("state", value)}
            disabled={!formData.country}
          >
            <SelectTrigger className="bg-white h-12 w-full">
              <SelectValue placeholder="Region name" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City Name*</Label>
          <Select
            value={formData.city}
            onValueChange={(value) => updateFormData("city", value)}
            disabled={!formData.state}
          >
            <SelectTrigger className="bg-white h-12 w-full">
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="village">Village/Community</Label>
          <Input
            id="village"
            className="bg-white h-12"
            value={formData.village}
            onChange={(e) => updateFormData("village", e.target.value)}
            placeholder="Enter your village or community name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Detailed Address *</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData("address", e.target.value)}
            placeholder="Enter your detailed farm address"
            className="bg-white h-12"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="farmSize">Farm Size (Hectares)</Label>
          <Input
            id="farmSize"
            type="number"
            className="bg-white h-12"
            value={formData.farmSizeHectares}
            onChange={(e) => updateFormData("farmSizeHectares", e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
          <p className="text-xs text-muted-foreground">
            Total area of your farm in hectares.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Years of Farming Experience</Label>
          <Input
            id="experience"
            type="number"
            className="bg-white h-12"
            value={formData.farmingExperienceYears}
            onChange={(e) =>
              updateFormData("farmingExperienceYears", e.target.value)
            }
            placeholder="0"
            min="0"
          />
          <p className="text-xs text-muted-foreground">
            Number of years you have been farming.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="primaryCrops">Primary Crops</Label>
        <Select
          value={formData.primaryCrops}
          onValueChange={(value) => updateFormData("primaryCrops", value)}
        >
          <SelectTrigger size="default" className="bg-white h-12 w-full">
            <SelectValue placeholder="Select your primary crops" />
          </SelectTrigger>
          <SelectContent>
            {PrimaryCrops.map((crop) => (
              <SelectItem key={crop} value={crop}>
                {crop}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Select your primary crop. You can add more crops in your profile
          later.
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 pt-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Payment Method *</Label>
          <p className="text-xs text-muted-foreground">
            Choose your preferred payment method for receiving payments from
            buyers and cooperatives.
          </p>
        </div>

        <Tabs
          value={formData.paymentMethodType}
          onValueChange={(value) => updateFormData("paymentMethodType", value)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bank">Bank</TabsTrigger>
            <TabsTrigger value="mobile_money">Mobile Money</TabsTrigger>
            <TabsTrigger value="cryptocurrency">Cryptocurrency</TabsTrigger>
          </TabsList>

          <TabsContent value="bank" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  className="bg-white h-12"
                  value={formData.bankName}
                  onChange={(e) => updateFormData("bankName", e.target.value)}
                  placeholder="Enter bank name"
                />
                <p className="text-xs text-muted-foreground">
                  The name of your bank for payment processing.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  className="bg-white h-12"
                  value={formData.bankAccountNumber}
                  onChange={(e) =>
                    updateFormData("bankAccountNumber", e.target.value)
                  }
                  placeholder="Enter account number"
                />
                <p className="text-xs text-muted-foreground">
                  Your bank account number for receiving payments.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mobile_money" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobileMoneyProvider">
                  Mobile Money Provider *
                </Label>
                <Select
                  value={formData.mobileMoneyProvider}
                  onValueChange={(value) =>
                    updateFormData("mobileMoneyProvider", value)
                  }
                >
                  <SelectTrigger className="bg-white h-12 w-full">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {MobileMoneyProviders.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select your mobile money service provider.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobileMoneyNumber">Mobile Money Number *</Label>
                <Input
                  id="mobileMoneyNumber"
                  className="bg-white h-12"
                  value={formData.mobileMoneyNumber}
                  onChange={(e) =>
                    updateFormData("mobileMoneyNumber", e.target.value)
                  }
                  placeholder="Enter mobile money number"
                />
                <p className="text-xs text-muted-foreground">
                  Your mobile money phone number for receiving payments.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cryptocurrency" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cryptocurrencyType">
                  Cryptocurrency Type *
                </Label>
                <Select
                  value={formData.cryptocurrencyType}
                  onValueChange={(value) =>
                    updateFormData("cryptocurrencyType", value)
                  }
                >
                  <SelectTrigger className="bg-white h-12 w-full">
                    <SelectValue placeholder="Select cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CryptocurrencyTypes.map((crypto) => (
                      <SelectItem key={crypto} value={crypto}>
                        {crypto}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select the cryptocurrency you prefer for payments.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cryptocurrencyWalletAddress">
                  Wallet Address *
                </Label>
                <Input
                  id="cryptocurrencyWalletAddress"
                  className="bg-white h-12"
                  value={formData.cryptocurrencyWalletAddress}
                  onChange={(e) =>
                    updateFormData(
                      "cryptocurrencyWalletAddress",
                      e.target.value
                    )
                  }
                  placeholder="Enter wallet address"
                />
                <p className="text-xs text-muted-foreground">
                  Your cryptocurrency wallet address for receiving payments.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Farm Information";
      case 2:
        return "Farm Details";
      case 3:
        return "Payment Information";
      default:
        return "Farm Information";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Provide basic information about your farm to get started with your farmer profile.";
      case 2:
        return "Share details about your farm size, experience, and primary crops.";
      case 3:
        return "Choose your preferred payment method and provide the necessary details for secure transactions and payouts.";
      default:
        return "Provide basic information about your farm to get started with your farmer profile.";
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{getStepTitle()}</h1>
        <p className="text-muted-foreground">{getStepDescription()}</p>
      </div>

      {/* Step Content */}
      <form onSubmit={handleSubmit}>
        {renderCurrentStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={currentStep === 1 ? () => router.back() : prevStep}
          >
            {currentStep === 1 ? "Back" : "Previous"}
          </Button>

          <div className="flex gap-2">
            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next Step
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating Profile..." : "Complete Onboarding"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
