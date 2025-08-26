"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

interface VerificationFormProps {
  className?: string;
}

export function VerificationForm({ className }: VerificationFormProps) {
  const { verifyOtp } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const phone = searchParams.get("phone");
  const type = searchParams.get("type") || "sms";
  const isSignup = searchParams.get("signup") === "true";

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phone || !otp) {
      toast.error("Phone number and verification code are required");
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyOtp({
        phone,
        token: otp,
        type: type as "sms" | "signup" | "recovery",
      });

      if (result.success) {
        toast.success(result.message || "Verification successful!");
        // Use the redirect from the API response or fallback to default behavior
        const redirectPath =
          result.redirectTo ||
          (isSignup ? "/onboard/account-type" : "/dashboard");
        router.push(redirectPath);
      } else {
        toast.error(result.error || "Verification failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsLoading(true);

    try {
      // Re-send OTP logic would go here
      toast.success("Verification code resent!");
      setCountdown(60); // 60 second cooldown
    } catch (error) {
      toast.error("Failed to resend verification code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <div className="flex flex-col items-center gap-2 text-center mb-6">
        <h1 className="text-2xl font-bold">Verify Your Account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter the verification code sent to your phone
        </p>
        {phone && (
          <p className="text-sm font-medium text-foreground">{phone}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="h-12 text-center text-lg font-mono tracking-widest"
            maxLength={6}
            required
          />
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit verification code sent to your phone
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !otp || otp.length !== 6}
          className="w-full h-12 bg-green-700 hover:bg-yellow-400 text-white"
        >
          {isLoading ? "Verifying..." : "Verify Account"}
        </Button>

        <div className="text-center">
          <Button
            type="button"
            variant="link"
            disabled={countdown > 0 || isLoading}
            onClick={handleResendCode}
            className="text-sm"
          >
            {countdown > 0
              ? `Resend code in ${countdown}s`
              : "Didn't receive code? Resend"}
          </Button>
        </div>
      </form>

      <div className="text-center text-sm mt-6">
        <Button
          type="button"
          variant="link"
          onClick={() => router.back()}
          className="text-sm"
        >
          Back to previous step
        </Button>
      </div>
    </div>
  );
}
