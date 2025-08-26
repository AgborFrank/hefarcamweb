"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface AnimatedCardProps extends ComponentProps<"div"> {
  children: React.ReactNode;
  index?: number;
  staggerDelay?: number;
  animationType?: "fade-in-up" | "slide-in-left" | "slide-in-right" | "zoom-in";
  className?: string;
  hoverEffect?: boolean;
}

export function AnimatedCard({
  children,
  index = 0,
  staggerDelay = 150,
  animationType = "fade-in-up",
  className,
  hoverEffect = false,
  ...props
}: AnimatedCardProps) {
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
      default:
        return "animate-fade-in-up";
    }
  };

  const totalDelay = index * staggerDelay;

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-all duration-1000",
        getAnimationClass(),
        hoverEffect && "hover:animate-bounce hover:animate-duration-1000",
        className
      )}
      style={{
        animationDelay: isVisible ? `${totalDelay}ms` : "0ms",
        transitionDelay: isVisible ? `${totalDelay}ms` : "0ms",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
