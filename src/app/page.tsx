import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionOne from "./components/home/sectionOne";
import Stats from "./components/home/stats";
import SectionTwo from "./components/home/sectionTwo";
import SectionThree from "./components/home/SectionThree";
import Hero from "./components/home/hero";
import Technology from "./components/home/technology";

export default function Home() {
  return (
    <>
    <div className="relative min-h-screen">
      {/* Header */}
      <Header />

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/video/bg.mp4" type="video/mp4" />
          {/* Fallback background - agricultural/cocoa farm scene */}
          <div className="w-full h-full bg-gradient-to-br from-green-800 via-green-700 to-green-600" />
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

    <Hero />
      {/* Additional content sections can go here */}
      <div className="relative z-10 bg-white">
        {/* Your other page content */}
      </div>
    </div>
    <Stats />
    <SectionOne />
    <Technology />
    <SectionTwo />
    <SectionThree />
    <Footer />
    </>
  );
}
