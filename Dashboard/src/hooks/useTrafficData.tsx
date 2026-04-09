import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

interface CurrentTrafficEntry {
  vehicle_count: string;
  yellow: any;
  green: any;
  direction: string;
  vehicles: number;
  wait_time: number;
}

interface HistoricalTrafficPoint {
  time: string;
  [direction: string]: string | number;
}

export function useTrafficData() {
  const [currentTrafficData, setCurrentTrafficData] = useState<CurrentTrafficEntry[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalTrafficPoint[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "traffic_data"), (snapshot) => {
      const currentMap: Record<string, CurrentTrafficEntry> = {};
      const historyMap: Record<string, HistoricalTrafficPoint> = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        const direction = data.direction?.toLowerCase();

        if (direction && ["north", "south", "east", "west"].includes(direction)) {
          const label = direction.charAt(0).toUpperCase() + direction.slice(1);

          currentMap[direction] = {
            direction: label,
            vehicles: data.vehicle_count || 0,
            wait_time: data.wait_time || 0,
            vehicle_count: String(data.vehicle_count ?? ""),
            yellow: data.yellow ?? null,
            green: data.green ?? null,
          };

          const ts = data.timestamp?.toDate?.() || new Date();
          const timeLabel = ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

          if (!historyMap[timeLabel]) {
            historyMap[timeLabel] = { time: timeLabel };
          }

          historyMap[timeLabel][label] = data.vehicle_count || 0;
        }
      });

      setCurrentTrafficData(Object.values(currentMap));

      const sortedHistory = Object.values(historyMap).sort((a, b) =>
        (a.time as string).localeCompare(b.time as string)
      );
      setHistoricalData(sortedHistory);
    });

    return () => unsubscribe();
  }, []);

  return {
    currentTrafficData,
    historicalData,
  };
   
}
