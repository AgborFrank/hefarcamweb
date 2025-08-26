"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface AnimatedTextProps extends ComponentProps<"h1"> {
  children: React.ReactNode;
  animationType?:
    | "fade-in-up"
    | "slide-in-left"
    | "slide-in-right"
    | "zoom-in"
    | "fade-in-left";
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedText({
  children,
  animationType = "fade-in-up",
  delay = 0,
  duration = 1000,
  className,
  ...props
}: AnimatedTextProps) {
  const { elementRef, isVisible } = useScrollAnimation();

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animationType) {
        case "fade-in-up":
          return "opacity-0 translate-y-8";
        case "slide-in-left":
          return "opacity-0 -translate-x-8";
        case "slide-in-right":
          return "opacity-0 translate-x-8";
        case "zoom-in":
          return "opacity-0 scale-95";
        case "fade-in-left":
          return "opacity-0 -translate-x-4";
        default:
          return "opacity-0 translate-y-8";
      }
    }

    switch (animationType) {
      case "fade-in-up":
        return "animate-fade-in-up";
      case "slide-in-left":
        return "animate-slide-in-left";
      case "slide-in-right":
        return "animate-slide-in-right";
      case "zoom-in":
        return "animate-zoom-in";
      case "fade-in-left":
        return "animate-fade-in-left";
      default:
        return "animate-fade-in-up";
    }
  };

  return (
    <h1
      ref={elementRef}
      className={cn(
        "transition-all duration-1000",
        getAnimationClass(),
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      {...props}
    >
      {children}
    </h1>
  );
}
