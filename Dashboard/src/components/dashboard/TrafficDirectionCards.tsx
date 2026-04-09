"use client";

import { useTrafficData } from "@/hooks/useTrafficData";
import { FaCarSide, FaClock } from "react-icons/fa";

export function TrafficDirectionCards() {
  const { currentTrafficData } = useTrafficData();

  // Defined in correct order
  const directions = ["North", "South", "East", "West"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {directions.map((dir) => {
        // Match the capitalized direction name (e.g. "North")
        const data = currentTrafficData.find((item) => item.direction === dir);

        return (
          <div
            key={dir}
            className="p-4 bg-white rounded-xl shadow text-center"
          >
            <div className="flex justify-center mb-2">
              <div className="h-8 w-8 bg-red-500 rounded-full shadow-lg" />
            </div>
            <h3 className="text-lg font-bold text-red-600">{dir}</h3>

            <div className="mt-2 flex items-center justify-center gap-2 text-gray-600">
              <FaCarSide />
              <span>{data?.vehicles ?? "—"} vehicles</span>
            </div>

            <div className="mt-1 flex items-center justify-center gap-2 text-gray-600">
              <FaClock />
              <span>Wait: {data?.wait_time ?? "—"}s</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
