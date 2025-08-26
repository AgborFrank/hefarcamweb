"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ProjectsMegamenu } from "./ProjectsMegamenu";

// Menu item type definition
interface MenuItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

// Navigation menu items data
const navigationItems: MenuItem[] = [
  { label: "Home", hasDropdown: false },
  { label: "Auction", hasDropdown: false },
  { label: "Traceability", hasDropdown: false },
  { label: "Projects", hasDropdown: true },
  { label: "Exports", hasDropdown: false },
  { label: "Cooperatives", hasDropdown: false },
  { label: "Partners", hasDropdown: false },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProjectsMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsProjectsOpen(true);
  };

  const handleProjectsMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProjectsOpen(false);
    }, 150); // Small delay to prevent flickering
  };

  const handleMegamenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsProjectsOpen(true);
  };

  const handleMegamenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProjectsOpen(false);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">
              <Image
                src="/assets/img/logo.svg"
                alt="Hefarcam"
                width={150}
                height={100}
                className={isScrolled ? "" : "brightness-0 invert"}
              />
            </h1>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={index}>
                {item.hasDropdown ? (
                  <div
                    ref={projectsRef}
                    className="relative"
                    onMouseEnter={handleProjectsMouseEnter}
                    onMouseLeave={handleProjectsMouseLeave}
                  >
                    <div
                      className={`flex items-center space-x-1 cursor-pointer transition-colors ${
                        isScrolled
                          ? "text-gray-700 hover:text-gray-900"
                          : "text-white hover:text-gray-200"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isProjectsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Hover-based megamenu */}
                    {isProjectsOpen && (
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
                        onMouseEnter={handleMegamenuMouseEnter}
                        onMouseLeave={handleMegamenuMouseLeave}
                      >
                        <div className="relative">
                          <ProjectsMegamenu />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={`transition-colors ${
                      isScrolled
                        ? "text-gray-700 hover:text-gray-900"
                        : "text-white hover:text-gray-200"
                    }`}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Get Started Button */}
          <div className="flex-shrink-0">
            <Button
              size="lg"
              onClick={() => {
                window.location.href = "/login";
              }}
              className={`px-6 py-2 cursor-pointer rounded-xl flex items-center space-x-2 transition-all ${
                isScrolled
                  ? "bg-green-700 hover:bg-yellow-400 text-white hover:text-green-700"
                  : "bg-white hover:bg-gray-100 text-black"
              }`}
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
