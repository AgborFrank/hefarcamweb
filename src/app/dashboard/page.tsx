"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data: profileData } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireOnboarding={true}>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {profile.full_name}!
            </h1>
            <p className="text-muted-foreground">
              Account Type: {profile.account_type}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
              <p className="text-3xl font-bold text-primary">0</p>
              <p className="text-sm text-muted-foreground">Active items</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">This Month</h3>
              <p className="text-3xl font-bold text-primary">$0</p>
              <p className="text-sm text-muted-foreground">Total activity</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Status</h3>
              <p className="text-3xl font-bold text-green-600">Active</p>
              <p className="text-sm text-muted-foreground">Account status</p>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
            <p className="text-muted-foreground mb-4">
              Your {profile.account_type} account is now ready. You can start
              using all the features available for your account type.
            </p>
            <div className="flex gap-4">
              <Button>Explore Features</Button>
              <Button variant="outline">View Documentation</Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
