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

// Email Login Form Component
function EmailLoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { signIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn({
        email,
        password,
        loginMethod: "email",
      });

      if (result.success) {
        toast.success(result.message || "Login successful!");

        if (result.requiresVerification) {
          // Phone login requires verification
          window.location.href = result.redirectTo || "/onboard/verification";
        } else {
          // Email login goes directly to dashboard
          window.location.href = result.redirectTo || "/dashboard";
        }
      } else {
        toast.error(result.error || "Login failed");
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
          <Label htmlFor="email">Email Address</Label>
          <Input
            className="h-12"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <p className="text-sm text-muted-foreground">
            Enter your registered email address to login
          </p>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <PasswordInput
            className="h-12"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-green-700 hover:bg-yellow-400 text-white"
        >
          {isLoading ? "Logging in..." : "Login with Email"}
        </Button>
      </div>
    </form>
  );
}

// Phone Login Form Component
function PhoneLoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { signIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const phoneNumber = formData.get("phone") as string;

    try {
      const result = await signIn({
        phone: phoneNumber,
        password: "", // Not needed for phone login
        loginMethod: "phone",
      });

      if (result.success) {
        toast.success(
          result.message || "Verification code sent to your phone!"
        );
        window.location.href =
          result.redirectTo ||
          `/onboard/verification?phone=${encodeURIComponent(
            phoneNumber
          )}&type=phone`;
      } else {
        toast.error(result.error || "Failed to send verification code");
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
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            className="h-12"
            id="phone"
            name="phone"
            type="tel"
            placeholder="Your phone number e.g 6789012345"
            required
          />
          <p className="text-sm text-muted-foreground">
            We'll send you a verification code via SMS to verify your phone
            number
          </p>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-green-700 hover:bg-yellow-400 text-white"
        >
          {isLoading ? "Sending Code..." : "Send Verification Code"}
        </Button>
      </div>
    </form>
  );
}

// Main Login Form with Tabs
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center mb-6">
        <h1 className="text-2xl font-bold">Login to Hefarcam</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Choose your preferred login method to access your Hefarcam account
        </p>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="email" className="text-sm font-medium">
            Email Login
          </TabsTrigger>
          <TabsTrigger value="phone" className="text-sm font-medium">
            Phone Login
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <EmailLoginForm />
        </TabsContent>

        <TabsContent value="phone" className="space-y-4">
          <PhoneLoginForm />
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm mt-6">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </div>
  );
}
