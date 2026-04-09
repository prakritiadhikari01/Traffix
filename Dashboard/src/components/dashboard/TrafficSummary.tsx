import { useTrafficData } from "@/hooks/useTrafficData";
import * as card from "@/components/ui/card";
import { FaCarSide, FaClock } from "react-icons/fa";

const lightColor = (data: any) => {
  if (data?.green) return "bg-green-500 shadow-green-400/40";
  if (data?.yellow) return "bg-yellow-500 shadow-yellow-400/40";
  return "bg-red-500 shadow-red-400/40";
};

const labelColor = (data: any) => {
  if (data?.green) return "text-green-600";
  if (data?.yellow) return "text-yellow-600";
  return "text-red-600";
};

export function TrafficSummary() {
  const { currentTrafficData } = useTrafficData();
  const directions = ["North", "South", "East", "West"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {directions.map((dir) => {
        const data = currentTrafficData.find((entry) => entry.direction === dir);

        return (
          <card.Card key={dir} className="text-center border border-muted shadow">
            <card.CardHeader>
              <div className={`w-12 h-12 rounded-full mx-auto shadow-lg ${lightColor(data)}`} />
              <h3 className={`mt-2 font-semibold text-lg uppercase ${labelColor(data)}`}>{dir}</h3>
            </card.CardHeader>
            <card.CardContent className="space-y-1 text-sm text-muted-foreground">
              {/* Vehicle count removed */}
              <div className="flex items-center justify-center gap-2">
                <FaClock />
                <span>Wait: {data?.wait_time ?? "—"}s</span>
              </div>
            </card.CardContent>
          </card.Card>
        );
      })}
    </div>
  );
}
