"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function Stats() {
  const { elementRef, isVisible } = useScrollAnimation();

  const stats = [
    {
      title: "1000+",
      description: "Farmers Trained",
    },
    {
      title: "40%",
      description: "Regenerative verified farm",
    },
    {
      title: "16000+",
      description: "EUDR Compliant Farmers",
    },
    {
      title: "20000+ MT",
      description: "Cocoa suppliers' capacity",
    },
  ];

  return (
    <section className="bg-yellow-300" ref={elementRef}>
      <div className="container mx-auto px-4 py-12">
        <h1
          className={`text-xl font-bold tracking-tight transition-all duration-1000 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          Hefarcam by the numbers
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gray-100 md:p-8 p-4 space-y-2 transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
              style={{
                animationDelay: isVisible ? `${(index + 1) * 200}ms` : "0ms",
                transitionDelay: isVisible ? `${(index + 1) * 200}ms` : "0ms",
              }}
            >
              <h2
                className={`text-4xl font-bold text-green-600 transition-all duration-1000 ${
                  isVisible ? "animate-count-up" : "opacity-0 translate-y-4"
                }`}
                style={{
                  animationDelay: isVisible
                    ? `${(index + 1) * 200 + 500}ms`
                    : "0ms",
                }}
              >
                {stat.title}
              </h2>
              <p className="text-gray-600 text-sm uppercase tracking-widest">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
