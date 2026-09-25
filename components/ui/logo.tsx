import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export function Logo({ size = 32, className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      className={cn("shrink-0 select-none", className)}
      {...props}
    >
      {/* Background squircle with subtle inner border */}
      <rect width="32" height="32" rx="8" fill="currentColor" className="text-ocean-deep" />
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="7.25"
        stroke="#FFFFFF"
        strokeOpacity="0.15"
        strokeWidth="1.5"
      />
      {/* Precision Lens */}
      <circle cx="14" cy="14" r="6" stroke="#FAFAF7" strokeWidth="2.2" strokeLinecap="round" />
      {/* Focus Point */}
      <circle cx="14" cy="14" r="1.8" fill="#FAFAF7" />
      {/* Trace Beam */}
      <path d="M18.5 18.5L23.5 23.5" stroke="#FAFAF7" strokeWidth="2.2" strokeLinecap="round" />
      {/* Evidence Target Node */}
      <circle cx="23.5" cy="23.5" r="2.2" fill="#E2E0C8" />
      {/* Compass Calibration Ticks */}
      <path
        d="M14 4.5V6.5M5.5 14H7.5M14 21.5V23.5"
        stroke="#FAFAF7"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
    </svg>
  );
}
