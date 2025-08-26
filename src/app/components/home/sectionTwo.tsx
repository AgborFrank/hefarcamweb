"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function SectionTwo() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="bg-yellow-50/50 md:py-32 py-12" ref={elementRef}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:gap-24 gap-12">
          <div
            className={`md:w-1/2 w-full transition-all duration-1000 ${
              isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
            }`}
          >
            <div
              className={`badge uppercase tracking-widest text-sm transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-4"
              }`}
            >
              Compliance Sourcing
            </div>
            <h1
              className={`text-5xl font-medium text-green-950 mt-3 tracking-tight transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              One platform for trusted suppliers, product traceability, and
              compliance reporting.
            </h1>
            <p
              className={`text-gray-600 text-lg mt-3 leading-relaxed transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              From connecting with trusted, pre-vetted suppliers to accessing
              detailed traceability data and automated compliance reports,
              Hefarcam makes every process seamless. Save time, reduce risk, and
              gain full visibility into your supply chain, all while ensuring
              your business meets the highest industry standards.
            </p>
            <div
              className={`cta mt-6 transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <Button
                size="lg"
                className="bg-green-700 hover:bg-yellow-400 text-white px-8 py-4 h-12 text-base rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Start Sourcing</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div
            className={`md:w-1/2 w-full transition-all duration-1000 ${
              isVisible ? "animate-slide-in-right" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <img
              src="/assets/img/cocoa-traceability-600.jpg"
              alt="Section Two"
              className={`w-full h-full rounded-tl-4xl rounded-br-4xl object-cover transition-all duration-1000 ${
                isVisible ? "animate-zoom-in" : "opacity-0 scale-95"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
