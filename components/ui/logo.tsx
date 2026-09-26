import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps extends Omit<React.ComponentPropsWithoutRef<typeof Image>, "src" | "alt" | "width" | "height"> {
  size?: number;
  className?: string;
  alt?: string;
}

export function Logo({ size = 32, className, alt = "TraceSearch Logo", ...props }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={size}
      height={size}
      priority
      className={cn("shrink-0 select-none object-contain rounded-lg", className)}
      {...props}
    />
  );
}
