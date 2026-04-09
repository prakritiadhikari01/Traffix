"use client";

import { useTrafficData } from "@/hooks/useTrafficData";
import { FaCarSide, FaClock } from "react-icons/fa";

export function TrafficStatusCards() {
  const { currentTrafficData } = useTrafficData();
  const directions = ["North", "South", "East", "West"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {directions.map((dir) => {
        const data = currentTrafficData.find(
          (d) => d.direction === dir
        );

        const isGreen = data?.green;
        const isYellow = data?.yellow;

        return (
          <div
            key={dir}
            className={`rounded-xl border p-6 text-center shadow-md transition-all duration-300 ${
              isGreen
                ? "border-green-400 bg-green-50"
                : isYellow
                ? "border-yellow-400 bg-yellow-50"
                : "border-red-300 bg-red-50"
            }`}
          >
            {/* Signal Circle */}
            <div className="flex justify-center mb-3">
              <div
                className={`h-16 w-16 rounded-full shadow-xl ${
                  isGreen
                    ? "bg-green-500"
                    : isYellow
                    ? "bg-yellow-400"
                    : "bg-red-500"
                }`}
              />
            </div>

            {/* Direction Name */}
            <h3
              className={`text-lg font-bold mb-2 ${
                isGreen
                  ? "text-green-600"
                  : isYellow
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {dir}
            </h3>

            {/* Vehicle Count */}
            <div className="mt-1 flex items-center justify-center gap-2 text-gray-800 text-sm">
              <FaCarSide />
              <span className="font-bold text-lg">
                {data?.vehicle_count ?? "—"}
              </span>{" "}
              vehicles
            </div>

            {/* Wait Time */}
            <div className="mt-2 flex items-center justify-center gap-2 text-gray-600 text-sm">
              <FaClock />
              <span>Wait: {data?.wait_time ?? "—"}s</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
