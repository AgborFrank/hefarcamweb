"use client";
import { CheckIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function SectionThree() {
  const { elementRef, isVisible } = useScrollAnimation();

  const features = [
    {
      Climate: {
        label: "EUDR Risk Assessment",
        label_2: "Traceability Report",
        label_3: "Compliance Report",
        label_4: "Sustainability Score",
        label_5: "Climate-Smart Farming",
      },
    },
    {
      Quality: {
        label: "Quality Certificate",
        label_2: "IFS Certified",
      },
    },
    {
      "Finance Commercial": {
        label: "BOL (Bill of Lading)",
        label_2: "Proforma Invoice",
        label_3: "Sales Contract",
      },
    },
  ];

  return (
    <section
      className=" md:py-32 py-12"
      style={{
        backgroundImage: "url('/assets/img/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={elementRef}
    >
      <div className="container mx-auto px-4 py-12">
        <div
          className={`max-w-2xl bg-white/90 p-6 rounded-lg transition-all duration-1000 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className={`badge uppercase tracking-widest text-sm transition-all duration-1000 ${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-4"
            }`}
          >
            Real-time Analytics
          </div>
          <h1
            className={`text-3xl font-bold text-green-950 mt-3 transition-all duration-1000 ${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Data-driven insights for sustainable cocoa production and sourcing
          </h1>
          <p
            className={`text-gray-800 mt-3 leading-relaxed transition-all duration-1000 ${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            Hefarcam provides real-time data and analytics to help farmers and
            stakeholders make informed decisions about sustainable cocoa
            production and sourcing.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const category = Object.keys(feature)[0];
              const data = feature[category as keyof typeof feature];
              if (!data) return null;
              return (
                <div
                  key={index}
                  className={`bg-s p-4 rounded-lg transition-all duration-1000 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    animationDelay: isVisible
                      ? `${(index + 1) * 200}ms`
                      : "0ms",
                    transitionDelay: isVisible
                      ? `${(index + 1) * 200}ms`
                      : "0ms",
                  }}
                >
                  <h2 className="text-sm tracking-widest font-medium uppercase text-gray-500 mb-3">
                    {category}
                  </h2>
                  <ul className="space-y-2">
                    {Object.entries(data).map(([key, value], itemIndex) => (
                      <li
                        key={key}
                        className={`text-gray-600 flex items-center text-sm transition-all duration-1000 ${
                          isVisible
                            ? "animate-fade-in-left"
                            : "opacity-0 -translate-x-4"
                        }`}
                        style={{
                          animationDelay: isVisible
                            ? `${(index + 1) * 200 + (itemIndex + 1) * 100}ms`
                            : "0ms",
                          transitionDelay: isVisible
                            ? `${(index + 1) * 200 + (itemIndex + 1) * 100}ms`
                            : "0ms",
                        }}
                      >
                        <CheckIcon className="w-4 h-4 text-green-600 mr-2" />
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
