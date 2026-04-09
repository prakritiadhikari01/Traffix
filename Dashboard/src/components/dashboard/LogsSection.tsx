
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";

const logs = [
  {
    timestamp: "11:23:45",
    event: "Green signal ON",
    direction: "North",
    info: "Vehicle count: 12",
    type: "signal"
  },
  {
    timestamp: "11:23:15",
    event: "Congestion detected",
    direction: "West",
    info: "Score: 78",
    type: "warning"
  },
  {
    timestamp: "11:22:30",
    event: "Green signal OFF",
    direction: "South",
    info: "Duration: 45s",
    type: "signal"
  },
  {
    timestamp: "11:21:45",
    event: "AI decision",
    direction: "North",
    info: "Max congestion priority",
    type: "ai"
  },
  {
    timestamp: "11:21:00",
    event: "Vehicle detected",
    direction: "East",
    info: "Type: Truck",
    type: "detection"
  },
  {
    timestamp: "11:20:30",
    event: "Green signal ON",
    direction: "South",
    info: "Vehicle count: 8",
    type: "signal"
  }
];

const getEventBadge = (type: string) => {
  switch (type) {
    case "signal":
      return <Badge variant="outline" className="border-emerald-400 text-emerald-400">Signal</Badge>;
    case "warning":
      return <Badge variant="outline" className="border-amber-400 text-amber-400">Warning</Badge>;
    case "ai":
      return <Badge variant="outline" className="border-blue-400 text-blue-400">AI</Badge>;
    case "detection":
      return <Badge variant="outline" className="border-purple-400 text-purple-400">Detection</Badge>;
    default:
      return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">Info</Badge>;
  }
};

export function LogsSection() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>System Logs</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {logs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground font-mono">{log.timestamp}</span>
                  {getEventBadge(log.type)}
                  <span className="text-card-foreground font-medium">{log.event}</span>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    {log.direction}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{log.info}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
