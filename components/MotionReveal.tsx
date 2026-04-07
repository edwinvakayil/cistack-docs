"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useMemo } from "react";

type MotionTag = "div" | "nav" | "footer";

interface MotionRevealProps {
  as?: MotionTag;
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  immediate?: boolean;
  initialScale?: number;
  initialY?: number;
}

export default function MotionReveal({
  as = "div",
  children,
  className,
  delay = 0,
  duration = 0.8,
  immediate = false,
  initialScale = 1,
  initialY = 20,
}: MotionRevealProps) {
  const FallbackTag = as;
  const MotionRevealClient = useMemo(
    () =>
      dynamic(() => import("@/components/MotionRevealClient"), {
        ssr: false,
        loading: () => <FallbackTag className={className}>{children}</FallbackTag>,
      }),
    [FallbackTag, children, className]
  );

  return (
    <MotionRevealClient
      as={as}
      className={className}
      delay={delay}
      duration={duration}
      immediate={immediate}
      initialScale={initialScale}
      initialY={initialY}
    >
      {children}
    </MotionRevealClient>
  );
}
