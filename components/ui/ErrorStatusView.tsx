import React from "react";

interface ErrorStatusViewProps {
  title: string;
  description: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  technicalDetails?: React.ReactNode;
  ambientTopColor?: string; // e.g. "bg-red-500/10 dark:bg-red-900/5"
  ambientBottomColor?: string; // e.g. "bg-zinc-400/15 dark:bg-zinc-700/5"
}

export default function ErrorStatusView({
  title,
  description,
  badge,
  actions,
  technicalDetails,
  ambientTopColor = "bg-zinc-300/25 dark:bg-zinc-800/10",
  ambientBottomColor = "bg-zinc-400/15 dark:bg-zinc-700/5",
}: ErrorStatusViewProps) {
  return (
    <div className="text-foreground relative flex flex-1 flex-col items-center justify-center bg-radial from-zinc-100 to-zinc-50 p-6 transition-colors duration-300 dark:from-zinc-900 dark:to-zinc-950">
      {/* Background ambient light effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 h-72 w-72 rounded-full ${ambientTopColor} blur-3xl`} />
        <div className={`absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full ${ambientBottomColor} blur-3xl`} />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-6 z-10 w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-white/40 p-8 text-center shadow-2xl backdrop-blur-md duration-500 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="flex flex-col items-center gap-4">
          {badge && <div className="flex items-center justify-center">{badge}</div>}
          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
            <p className="mx-auto max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>

        {actions && (
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {actions}
          </div>
        )}

        {technicalDetails && (
          <div className="pt-2 text-left">
            {technicalDetails}
          </div>
        )}
      </div>
    </div>
  );
}
