
import { cn } from "@/lib/utils";

interface TrafficLightProps {
  direction: string;
  isActive: boolean;
  className?: string;
}

export function TrafficLight({ direction, isActive, className }: TrafficLightProps) {
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Single Traffic Light Circle */}
      <div className="w-20 h-20 flex items-center justify-center mb-3">
        <div 
          className={cn(
            "w-16 h-16 rounded-full border-4 transition-all duration-700 ease-in-out",
            isActive 
              ? "bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-300 shadow-2xl shadow-emerald-500/60 ring-4 ring-emerald-200/50" 
              : "bg-gradient-to-br from-red-400 to-red-600 border-red-300 shadow-2xl shadow-red-500/60 ring-4 ring-red-200/50"
          )}
        >
          {/* Inner glow effect */}
          <div 
            className={cn(
              "w-full h-full rounded-full transition-all duration-700",
              isActive 
                ? "bg-gradient-to-t from-emerald-300/30 to-emerald-100/20" 
                : "bg-gradient-to-t from-red-300/30 to-red-100/20"
            )}
          />
        </div>
      </div>
      
      {/* Direction Label */}
      <div className="px-3 py-1.5">
        <span className={cn(
          "text-sm font-semibold uppercase tracking-wide transition-colors duration-300",
          isActive 
            ? "text-emerald-600 dark:text-emerald-400" 
            : "text-red-600 dark:text-red-400"
        )}>
          {direction}
        </span>
      </div>
    </div>
  );
}
