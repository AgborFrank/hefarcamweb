"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <>
      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight animate-fade-in-up animate-duration-1000 animate-delay-200">
            Cocoa and Coffee Traceability Starts with Hefarcam.
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-lg text-white/90 mb-12 font-sans animate-fade-in-up animate-duration-1000 animate-delay-400">
            Help Farmers Cameroon provides a transparent system for direct
            trade. We connect all stakeholders in the cocoa and coffee supply
            chain on a single platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-6 justify-center items-center animate-fade-in-up animate-duration-1000 animate-delay-600">
            <Button
              size="lg"
              onClick={() => {
                window.location.href = "/login";
              }}
              className="bg-green-700 hover:bg-yellow-400 text-white px-8 py-4 h-12 text-base rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse animate-duration-2000 animate-delay-1000"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                window.location.href = "/about";
              }}
              className="border-white text-black text-base hover:bg-white hover:text-black px-8 py-4 h-12  rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>Learn More</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
