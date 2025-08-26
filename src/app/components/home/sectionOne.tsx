"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Leaf, Users, Search, Heart, QrCode } from "lucide-react";

export default function SectionOne() {
  const { elementRef, isVisible } = useScrollAnimation();

  const advantages = [
    {
      title: "Climate-Resilient",
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      description:
        "Through data-based agricultural practices and equipping farmers with the know-how, we help prevent environmental degradation and ensure stable crop yields and productivity.",
    },

    {
      title: "Inclusive",
      icon: <Users className="w-8 h-8 text-green-600" />,
      description:
        "We involve every supply chain actor in the production, processing, and distribution to participate actively and benefit equitably. Such approach can aid in social and economic growth, poverty reduction, and food security.",
    },

    {
      title: "Traceable",
      icon: <QrCode className="w-8 h-8 text-green-600" />,
      description:
        "We help farmers by providing them with the necessary technological tools and support for sustainable farming, traceability and exportation regardless of the season.",
    },
    {
      title: "Farmer First",
      icon: <Heart className="w-8 h-8 text-green-600" />,
      description:
        "Our network of suppliers use Hefarcam's tools to trace, manage and deliver sustainable cocoa, backed by compliance data.",
    },
  ];

  return (
    <section className="bg-white md:py-26 py-12" ref={elementRef}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-5xl font-medium text-center text-green-950 tracking-tight transition-all duration-1000 ${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
          >
            Empowering Sustainable, Transparent, and Traceable Cocoa Supply
            Chains for All Stakeholders
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className={`bg-gray-100 md:p-8 p-4 space-y-4 transition-all duration-1000 hover:animate-bounce hover:animate-duration-1000 ${
                isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
              }`}
              style={{
                animationDelay: isVisible ? `${(index + 1) * 150}ms` : "0ms",
                transitionDelay: isVisible ? `${(index + 1) * 150}ms` : "0ms",
              }}
            >
              <div className="flex  bg-yellow-200 rounded-full p-2 w-12 h-12 items-center justify-center">
                {advantage.icon}
              </div>
              <h2 className="text-2xl font-bold text-green-600 ">
                {advantage.title}
              </h2>
              <p className="text-gray-600 text-sm ">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
