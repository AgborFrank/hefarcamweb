"use client";

import { CooperativeOnboardingForm } from "@/app/components/forms/cooperative-onboarding-form";
import Image from "next/image";
import Link from "next/link";

export default function CooperativeOnboardingPage() {
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
          <div className="w-full max-w-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Cooperative Onboarding
              </h1>
              <p className="text-muted-foreground">
                Complete your cooperative profile to start managing farmers and
                their produce
              </p>
            </div>
            <CooperativeOnboardingForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/assets/img/cooperative.jpg"
          alt="Cooperative onboarding"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 bg-blue-900/40 flex items-end">
          <div className="p-8 text-white">
            <div className="inline-flex items-center gap-2 mb-4 text-blue-300">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-sm font-medium uppercase tracking-wide">
                Cooperative Account
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Cooperative</h2>
            <p className="text-sm opacity-90 max-w-md">
              Aggregate produce from multiple farmers, manage farmers, payouts
              and follow up on their performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
