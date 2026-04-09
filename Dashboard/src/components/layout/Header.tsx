import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Download, Activity } from "lucide-react";
import { exportTrafficData } from "@/utils/dataExport";

export function Header() {
  const handleExportData = () => {
    exportTrafficData();
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Traffix</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Traffic Control System
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            className="gap-2 hidden sm:flex"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleExportData}
            className="sm:hidden"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Badge
            variant="outline"
            className="border-emerald-400 text-emerald-400 hidden sm:flex"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
            Active
          </Badge>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse sm:hidden"></div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
