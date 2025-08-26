"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ExternalLink,
  Twitter,
  Mail,
  Facebook,
  Instagram,
  MessageCircle,
  MessageSquare,
  Linkedin,
  Youtube,
} from "lucide-react";
import Image from "next/image";

// Footer link type definition
interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

// Footer section type definition
interface FooterSection {
  title: string;
  links: FooterLink[];
}

// Social media link type definition
interface SocialLink {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

// Footer sections data
const footerSections: FooterSection[] = [
  {
    title: "ABOUT",
    links: [
      { label: "About Us", href: "#" },
      { label: "Mission & Vision", href: "#" },
      { label: "Corporate Values", href: "#" },
      { label: "Our Team", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "News & Media", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Farm Training", href: "#" },
      { label: "Expo Center", href: "#" },
      { label: "Drone Farming", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Transformation", href: "#" },
      { label: "Blockchain", href: "#" , isExternal: true},
      { label: "Finance", href: "#" },
      { label: "Health & Safety", href: "#" },
      { label: "Child Labor", href: "#" },
    ],
  },
  {
    title: "STAKE HOLDERS",
    links: [
      { label: "Farmers", href: "#" },
      { label: "Cooperatives", href: "#" },
      { label: "Exporters", href: "#" },
      { label: "Investors", href: "#" },
      { label: "Government", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Others", href: "#" },
    ],
  },
  {
    title: "EUDR ",
    links: [
      { label: "EUDR Compliance", href: "#" },
      { label: "EUDR Insights", href: "#" },
      { label: "Exportation", href: "#" },
      { label: "EUDR Webinar", href: "#" },
    ],
  },
  
];

// Social media links data with proper icons
const socialLinks: SocialLink[] = [
  { label: "Twitter", icon: Twitter, href: "#" },
  { label: "Email", icon: Mail, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "Discord", icon: MessageCircle, href: "#" },
  { label: "Telegram", icon: MessageSquare, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-green-950 to-green-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Left Column - Logo and Description */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">
              <Image
                src="/assets/img/logo.svg"
                alt="NEX"
                width={150}
                height={100}
                className="brightness-0 invert"
              />
            </h2>
            <p className="text-gray-100 mb-8 leading-relaxed">
            HEFARCAM is an agricultural technology startup in Cameroon. We help farmers by providing them with the necessary technological tools and support for sustainable farming, traceability and exportation regardless of the season.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.slice(0, 4).map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 border bg-yellow-300 text-green-700 border-yellow-600 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-800 transition-colors cursor-pointer"
                    title={social.label}
                  >
                    <IconComponent className="h-4 w-4 text-green-700 hover:text-white" />
                  </a>
                );
              })}
            </div>

            {/* Second row of social icons */}
            <div className="flex space-x-4 mt-4">
              {socialLinks.slice(4, 8).map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index + 4}
                    href={social.href}
                    className="w-10 h-10 border bg-yellow-300 text-green-700 border-yellow-600 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-800 transition-colors cursor-pointer"
                    title={social.label}
                  >
                    <IconComponent className="h-4 w-4 text-green-700 hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 text-sm hover:text-green-700 flex items-center transition-colors"
                    >
                      {link.label}
                      {link.isExternal && (
                        <ExternalLink className="h-3 w-3 ml-1" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Join Presale Button */}
          <div className="mt-8 hidden">
            <Button className="bg-white hover:bg-green-700 text-black px-6 py-2 rounded-full flex items-center space-x-2">
              <span>Join Presale</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-900 mt-12 pt-8">
          <p className="text-gray-200 text-sm">
            © {new Date().getFullYear()} Help Farmers Cameroon (HEFARCAM), All Rights Reserved powered by{" "}
            <a href="https://www.hefarcam.com" className="text-gray-200 hover:text-gray-700 underline underline-offset-2">
              Intellygen Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
