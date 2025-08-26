"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/app/lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<{
    success: boolean;
    error?: string;
    message?: string;
    requiresVerification?: boolean;
    redirectTo?: string;
  }>;
  signIn: (data: SignInData) => Promise<{
    success: boolean;
    error?: string;
    message?: string;
    requiresVerification?: boolean;
    redirectTo?: string;
  }>;
  signOut: () => Promise<void>;
  verifyOtp: (data: VerifyOtpData) => Promise<{
    success: boolean;
    error?: string;
    message?: string;
    redirectTo?: string;
  }>;
}

interface SignUpData {
  email?: string;
  password: string;
  fullName: string;
  phone?: string;
  signupMethod: "email" | "phone";
}

interface SignInData {
  email?: string;
  password: string;
  phone?: string;
  loginMethod: "email" | "phone";
}

interface VerifyOtpData {
  phone: string;
  token: string;
  type: "sms" | "signup" | "recovery";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (data: SignUpData) => {
    try {
      let signUpResponse;

      if (data.signupMethod === "email") {
        signUpResponse = await supabase.auth.signUp({
          email: data.email!,
          password: data.password,
          options: {
            data: {
              full_name: data.fullName,
            },
          },
        });
      } else if (data.signupMethod === "phone") {
        signUpResponse = await supabase.auth.signUp({
          phone: data.phone!,
          password: data.password,
          options: {
            data: {
              full_name: data.fullName,
            },
          },
        });
      } else {
        return { success: false, error: "Invalid signup method" };
      }

      if (signUpResponse.error) {
        return { success: false, error: signUpResponse.error.message };
      }

      // Check if email confirmation is required
      if (
        signUpResponse.data.user &&
        !signUpResponse.data.user.email_confirmed_at
      ) {
        return {
          success: true,
          message: "Please check your email to confirm your account",
          requiresVerification: true,
          redirectTo: "/onboard/verification",
        };
      }

      // If user is confirmed, update local state
      if (signUpResponse.data.session) {
        setSession(signUpResponse.data.session);
        setUser(signUpResponse.data.user);
      }

      return {
        success: true,
        message: "Account created successfully",
        redirectTo: "/dashboard",
      };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const signIn = async (data: SignInData) => {
    try {
      let signInResponse;

      if (data.loginMethod === "email") {
        signInResponse = await supabase.auth.signInWithPassword({
          email: data.email!,
          password: data.password,
        });
      } else if (data.loginMethod === "phone") {
        signInResponse = await supabase.auth.signInWithOtp({
          phone: data.phone!,
          options: {
            shouldCreateUser: false,
          },
        });
      } else {
        return { success: false, error: "Invalid login method" };
      }

      if (signInResponse.error) {
        return { success: false, error: signInResponse.error.message };
      }

      // For phone login, return verification required
      if (data.loginMethod === "phone") {
        return {
          success: true,
          message: "Verification code sent to your phone",
          requiresVerification: true,
          redirectTo: "/onboard/verification",
        };
      }

      // For email login, check if email confirmation is required
      if (
        signInResponse.data.user &&
        !signInResponse.data.user.email_confirmed_at
      ) {
        return {
          success: false,
          error: "Please confirm your email address before logging in",
          requiresConfirmation: true,
        };
      }

      // Update local state
      setSession(signInResponse.data.session);
      setUser(signInResponse.data.user);

      return {
        success: true,
        message: "Login successful",
        redirectTo: "/dashboard",
      };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const verifyOtp = async (data: VerifyOtpData) => {
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error };
      }

      return {
        success: true,
        message: result.message,
        redirectTo: result.redirectTo,
      };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    verifyOtp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
