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
      {/* Background squircle in Coffee Bean with Black Cherry inner stroke */}
      <rect width="32" height="32" rx="8" fill="#1A0706" />
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="7.25"
        stroke="#55100D"
        strokeWidth="1.5"
      />
      {/* Precision Lens in Alabaster Grey */}
      <circle cx="14" cy="14" r="6" stroke="#D9D9D9" strokeWidth="2.2" strokeLinecap="round" />
      {/* Focus Point in Racing Red */}
      <circle cx="14" cy="14" r="1.8" fill="#DD0200" />
      {/* Trace Beam in Alabaster Grey */}
      <path d="M18.5 18.5L23.5 23.5" stroke="#D9D9D9" strokeWidth="2.2" strokeLinecap="round" />
      {/* Evidence Target Node in Racing Red */}
      <circle cx="23.5" cy="23.5" r="2.2" fill="#DD0200" />
      {/* Compass Calibration Ticks in Alabaster Grey */}
      <path
        d="M14 4.5V6.5M5.5 14H7.5M14 21.5V23.5"
        stroke="#D9D9D9"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
    </svg>
  );
}
