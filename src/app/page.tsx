import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionOne from "./components/home/sectionOne";
import Stats from "./components/home/stats";
import SectionTwo from "./components/home/sectionTwo";
import SectionThree from "./components/home/SectionThree";

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

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight font-sans">
           Sustainable Agriculture Starts Here.
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-4xl text-white/90 mb-12 font-sans">
            Buy cocoa with Hefarcam.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-green-700 hover:bg-yellow-400 text-white px-8 py-4 h-12 text-base rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 "
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-black text-base hover:bg-white hover:text-black px-8 py-4 h-12  rounded-xl transition-all duration-300 transform hover:scale-105 "
            >
              <span>Learn More</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Additional content sections can go here */}
      <div className="relative z-10 bg-white">
        {/* Your other page content */}
      </div>
    </div>
    <Stats />
    <SectionOne />
    <SectionTwo />
    <SectionThree />
    <Footer />
    </>
  );
}
