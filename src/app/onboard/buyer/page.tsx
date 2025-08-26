"use client";

import { BuyerOnboardingForm } from "@/app/components/forms/buyer-onboarding-form";
import Image from "next/image";
import Link from "next/link";

export default function BuyerOnboardingPage() {
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
              <h1 className="text-3xl font-bold mb-2">Buyer Onboarding</h1>
              <p className="text-muted-foreground">
                Complete your buyer profile to start sourcing quality
                agricultural products
              </p>
            </div>
            <BuyerOnboardingForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/assets/img/buyer.jpg"
          alt="Buyer onboarding"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 bg-purple-900/40 flex items-end">
          <div className="p-8 text-white">
            <div className="inline-flex items-center gap-2 mb-4 text-purple-300">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span className="text-sm font-medium uppercase tracking-wide">
                Buyer Account
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Buyer/Exporter</h2>
            <p className="text-sm opacity-90 max-w-md">
              Source quality agricultural products directly on Hefarcam. We
              ensure that all products are of the highest quality and meet the
              standards of global markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
