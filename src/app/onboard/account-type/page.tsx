"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AccountTypeForm } from "../../components/forms/account-type-form";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

type UserType = "farmer" | "cooperative" | "buyer";

export default function AccountTypePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [selectedAccountType, setSelectedAccountType] =
    useState<UserType | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Get image source with fallback logic
  const getImageSrc = (accountType: UserType | null) => {
    // TODO: Add actual images for each account type
    // For now, we use the same base image but with different overlays
    // To add specific images:
    // 1. Add farmer.jpg, cooperative.jpg, buyer.jpg to /public/assets/img/
    // 2. Replace the return statement below with the switch statement
    switch (accountType) {
      case "farmer":
        return "/assets/img/farmer.jpg";
      case "cooperative":
        return "/assets/img/cooperative.jpg";
      case "buyer":
        return "/assets/img/buyer.jpg";
      default:
        return "/assets/img/login.jpg";
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image
              src="/assets/img/logo.svg"
              alt="Hefarcam"
              width={120}
              height={100}
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <AccountTypeForm onAccountTypeChange={setSelectedAccountType} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={getImageSrc(selectedAccountType)}
          alt={`${selectedAccountType} account type`}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale transition-all duration-500 ease-in-out"
        />
        {/* Dynamic overlay based on account type */}
        <div
          className={`absolute inset-0 flex items-end transition-all duration-500 ease-in-out ${
            selectedAccountType === "farmer"
              ? "bg-green-900/40"
              : selectedAccountType === "cooperative"
              ? "bg-blue-900/40"
              : selectedAccountType === "buyer"
              ? "bg-purple-900/40"
              : "bg-gray-900/40"
          }`}
        >
          <div className="p-8 text-white">
            <div
              className={`inline-flex items-center gap-2 mb-4 ${
                selectedAccountType === "farmer"
                  ? "text-green-300"
                  : selectedAccountType === "cooperative"
                  ? "text-blue-300"
                  : selectedAccountType === "buyer"
                  ? "text-purple-300"
                  : "text-gray-300"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  selectedAccountType === "farmer"
                    ? "bg-green-400"
                    : selectedAccountType === "cooperative"
                    ? "bg-blue-400"
                    : selectedAccountType === "buyer"
                    ? "bg-purple-400"
                    : "bg-gray-400"
                }`}
              ></div>
              <span className="text-sm font-medium uppercase tracking-wide">
                {selectedAccountType === "farmer" && "Farmer Account"}
                {selectedAccountType === "cooperative" && "Cooperative Account"}
                {selectedAccountType === "buyer" && "Buyer Account"}
                {!selectedAccountType && "Choose Account Type"}
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2 capitalize">
              {selectedAccountType === "farmer" && "Farmer"}
              {selectedAccountType === "cooperative" && "Cooperative"}
              {selectedAccountType === "buyer" && "Buyer/Exporter"}
              {!selectedAccountType && "Welcome to Hefarcam"}
            </h2>
            <p className="text-sm opacity-90 max-w-md">
              {selectedAccountType === "farmer" &&
                "Manage your farm operations, produce and sales. Get paid on time and get access to the best prices for your produce."}
              {selectedAccountType === "cooperative" &&
                "Aggregate produce from multiple farmers, manage farmers, payouts and follow up on their performance"}
              {selectedAccountType === "buyer" &&
                "Source quality agricultural products directly on Hefarcam. We ensure that all products are of the highest quality and meet the standards of global markets."}
              {!selectedAccountType &&
                "Select your account type to get started with Hefarcam. Choose the option that best describes your role in the agricultural value chain."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
