"use client";
import { AnimatedText } from "@/components/ui/animated-text";
import { BackgroundImageSlider } from "@/components/ui/background-image-slider";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function Technology() {
  const { elementRef, isVisible } = useScrollAnimation();

  const backgroundImages = [
    {
      src: "/assets/img/drone-2.jpg",
      alt: "Drone technology for agricultural monitoring",
    },
    {
      src: "/assets/img/bag.jpg",
      alt: "Digital monitoring and data analytics",
    },
    {
      src: "/assets/img/boundary-overlaps.jpg",
      alt: "Farmers using modern technology",
    },
    {
      src: "/assets/img/asa.jpg",
      alt: "Agricultural cooperative working together",
    },
  ];

  return (
    <section
      ref={elementRef}
      className={`${
        isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
      }`}
    >
      <BackgroundImageSlider
        images={backgroundImages}
        interval={6000}
        className="min-h-[700px]"
      >
        <div className="container mx-auto px-4 py-12 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex items-center justify-center">
              {/* Placeholder for the original image position */}
              <div className="w-[500px] h-[500px]  flex items-center justify-center">
                <span className="text-white/70 text-lg hidden">
                  Technology Visualization
                </span>
              </div>
            </div>
            <div className="space-y-4 flex flex-col justify-center bg-white/80 rounded-lg backdrop-blur-sm md:px-12 px-4 ">
              <div className="tag">
                <span className="text-green-600 bg-yellow-200 py-2 px-6 uppercase tracking-widest text-sm">Technology</span>
              </div>
              <AnimatedText
                animationType="fade-in-up"
                delay={200}
                className="text-3xl font-medium text-green-950"
              >
                Holistic Innovation for Sustainable Growth, Overcoming the Triple Challenge of Global Supply Chains
              </AnimatedText>
              <p className="text-base text-gray-700">
                We leverage the latest technologies like AI, Blockchain, Drones,
                and IoT to improve productivity and efficiency for farmers in
                the cocoa and coffee supply chain.
              </p>
              <p className="text-2xl text-green-600 font-normal">
                Hefarcam tracks deforestation, CO₂ emissions and regeneration
                across the entire supply chain.
              </p>
            </div>
          </div>
        </div>
      </BackgroundImageSlider>
    </section>
  );
}
