"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import { ComponentProps, ElementType } from "react"

interface AnimatedElementProps<T extends ElementType = "div"> {
  as?: T
  children: React.ReactNode
  animationType?: "fade-in-up" | "slide-in-left" | "slide-in-right" | "zoom-in" | "fade-in-left" | "count-up"
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
} & Omit<ComponentProps<T>, keyof {
  as: any
  children: any
  animationType: any
  delay: any
  duration: any
  className: any
  threshold: any
  rootMargin: any
  triggerOnce: any
}>

export function AnimatedElement<T extends ElementType = "div">({
  as,
  children,
  animationType = "fade-in-up",
  delay = 0,
  duration = 1000,
  className,
  threshold,
  rootMargin,
  triggerOnce,
  ...props
}: AnimatedElementProps<T>) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce
  })

  const Component = as || "div"

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animationType) {
        case "fade-in-up":
          return "opacity-0 translate-y-8"
        case "slide-in-left":
          return "opacity-0 -translate-x-8"
        case "slide-in-right":
          return "opacity-0 translate-x-8"
        case "zoom-in":
          return "opacity-0 scale-95"
        case "fade-in-left":
          return "opacity-0 -translate-x-4"
        case "count-up":
          return "opacity-0 translate-y-4"
        default:
          return "opacity-0 translate-y-8"
      }
    }
    
    switch (animationType) {
      case "fade-in-up":
        return "animate-fade-in-up"
      case "slide-in-left":
        return "animate-slide-in-left"
      case "slide-in-right":
        return "animate-slide-in-right"
      case "zoom-in":
        return "animate-zoom-in"
      case "fade-in-left":
        return "animate-fade-in-left"
      case "count-up":
        return "animate-count-up"
      default:
        return "animate-fade-in-up"
    }
  }

  return (
    <Component
      ref={elementRef}
      className={cn(
        "transition-all duration-1000",
        getAnimationClass(),
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
      {...props}
    >
      {children}
    </Component>
  )
} 