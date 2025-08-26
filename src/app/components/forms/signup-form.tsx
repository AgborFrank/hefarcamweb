"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

// Email Signup Form Component
function EmailSignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { signUp } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signUp({
        email,
        password,
        fullName,
        signupMethod: "email",
      });

      if (result.success) {
        toast.success(
          result.message ||
            "Account created successfully! Please check your email to confirm your account."
        );

        if (result.requiresVerification) {
          // Phone signup requires verification
          window.location.href = result.redirectTo || "/onboard/verification";
        } else {
          // Email signup goes directly to account type selection
          window.location.href = result.redirectTo || "/onboard/account-type";
        }
      } else {
        toast.error(result.error || "Failed to create account");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            className="h-12"
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            required
          />
          <p className="text-xs text-muted-foreground">
            Enter your full name as it appears on official documents
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            className="h-12"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <p className="text-xs text-muted-foreground">
            We'll send you a verification email to confirm your account
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            className="h-12"
            id="password"
            name="password"
            placeholder="Create a strong password"
            required
          />
          <p className="text-xs text-muted-foreground">
            Create a strong password with at least 8 characters
          </p>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-green-700 hover:bg-yellow-400 text-white"
        >
          {isLoading ? "Creating Account..." : "Create Account with Email"}
        </Button>
      </div>
    </form>
  );
}

// Phone Signup Form Component
function PhoneSignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { signUp } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const phoneNumber = formData.get("phone") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signUp({
        phone: phoneNumber,
        password,
        fullName,
        signupMethod: "phone",
      });

      if (result.success) {
        toast.success(
          result.message ||
            "Account created successfully! Please check your phone for verification code."
        );
        window.location.href =
          result.redirectTo ||
          `/onboard/verification?phone=${encodeURIComponent(
            phoneNumber
          )}&type=phone&signup=true`;
      } else {
        toast.error(result.error || "Failed to create account");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="fullNamePhone">Full Name</Label>
          <Input
            className="h-12"
            id="fullNamePhone"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            required
          />
          <p className="text-xs text-muted-foreground">
            Enter your full name as it appears on official documents
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            className="h-12"
            id="phone"
            name="phone"
            type="tel"
            placeholder="Your phone number e.g 6789012345"
            required
          />
          <p className="text-xs text-muted-foreground">
            We'll send you a verification code via SMS to verify your phone
            number
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password-phone">Password</Label>
          <PasswordInput
            className="h-12"
            id="password-phone"
            name="password"
            placeholder="Create a strong password"
            required
          />
          <p className="text-xs text-muted-foreground">
            Create a strong password with at least 8 characters
          </p>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-green-700 hover:bg-yellow-400 text-white"
        >
          {isLoading ? "Creating Account..." : "Send Verification Code"}
        </Button>
      </div>
    </form>
  );
}

// Main Signup Form with Tabs
export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center mb-6">
        <h1 className="text-2xl font-bold">Join Hefarcam</h1>
        <p className="text-balance text-base text-muted-foreground">
          Choose your preferred signup method to create your Hefarcam account
        </p>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="email" className="text-sm font-medium">
            Email Signup
          </TabsTrigger>
          <TabsTrigger value="phone" className="text-sm font-medium">
            Phone Signup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <EmailSignupForm />
        </TabsContent>

        <TabsContent value="phone" className="space-y-4">
          <PhoneSignupForm />
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm mt-6">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </div>
  );
}
