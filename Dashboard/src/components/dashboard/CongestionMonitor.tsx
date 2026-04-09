import React from "react";
import { useTrafficData } from "@/hooks/useTrafficData";

const congestionThresholds = {
  low: 5,
  moderate: 15,
};

function getCongestionLabel(vehicleCount: number): {
  label: string;
  score: number;
} {
  if (vehicleCount <= congestionThresholds.low) {
    return { label: "Clear", score: 10 };
  } else if (vehicleCount <= congestionThresholds.moderate) {
    return { label: "Moderate", score: 50 };
  } else {
    return { label: "High", score: 90 };
  }
}

export function CongestionMonitor() {
  const trafficData = useTrafficData();
  const directions = ["north", "south", "east", "west"];

  return (
    <div className="bg-white rounded-2xl p-4 space-y-3 shadow">
      <h2 className="text-xl font-bold flex items-center gap-2">
        ⚠️ Congestion Monitor
      </h2>
      {directions.map((dir) => {
        const data = trafficData[dir];
        const vehicleCount = data?.vehicle_count ?? 0;

        const congestion = getCongestionLabel(vehicleCount);
        const score = congestion.score;

        return (
          <div key={dir}>
            <div className="flex justify-between text-sm font-medium">
              <span
                className={
                  score >= 80
                    ? "text-red-500"
                    : score >= 60
                    ? "text-orange-500"
                    : "text-green-600"
                }
              >
                {dir.charAt(0).toUpperCase() + dir.slice(1)} -{" "}
                {congestion.label}
              </span>
              <span className="text-muted-foreground">Score: {score}</span>
            </div>
            <div className="bg-muted h-2 rounded">
              <div
                className={`h-full rounded ${
                  score >= 80
                    ? "bg-red-500"
                    : score >= 60
                    ? "bg-orange-400"
                    : "bg-green-500"
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
