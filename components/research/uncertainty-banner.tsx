import React from "react";
import { AlertTriangle } from "lucide-react";

interface UncertaintyBannerProps {
  uncertainties?: string[];
}

export function UncertaintyBanner({ uncertainties }: UncertaintyBannerProps) {
  if (!uncertainties || uncertainties.length === 0) return null;

  return (
    <div className="bg-surface-subtle border-l-4 border-warning rounded-r-xl p-5 shadow-subtle transition-colors">
      <div className="flex items-center gap-2 mb-2 text-warning font-semibold text-sm">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>Areas of Uncertainty and Conflicting Evidence</span>
      </div>

      <p className="text-xs text-text-secondary mb-3">
        The research pipeline detected differing estimates, potential data gaps, or evolving consensus across retrieved sources:
      </p>

      <ul className="space-y-1.5 text-xs text-text-primary list-disc list-inside">
        {uncertainties.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
