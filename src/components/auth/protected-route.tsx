"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/app/lib/supabase";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireOnboarding?: boolean;
}

export function ProtectedRoute({
  children,
  redirectTo = "/login",
  requireOnboarding = false,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [onboardingStatus, setOnboardingStatus] = useState<string | null>(null);
  const [checkingOnboarding, setCheckingOnboarding] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (user && requireOnboarding) {
        setCheckingOnboarding(true);
        try {
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("onboarding_status, account_type")
            .eq("id", user.id)
            .single();

          setOnboardingStatus(profile?.onboarding_status || null);

          // If user hasn't completed onboarding, redirect to account type selection
          if (profile && profile.onboarding_status !== "completed") {
            router.push("/onboard/account-type");
          }
        } catch (error) {
          console.error("Error checking onboarding status:", error);
        } finally {
          setCheckingOnboarding(false);
        }
      }
    };

    checkOnboardingStatus();
  }, [user, requireOnboarding, router]);

  if (loading || checkingOnboarding) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // If requiring onboarding and user hasn't completed it, don't render children
  if (requireOnboarding && onboardingStatus !== "completed") {
    return null;
  }

  return <>{children}</>;
}
