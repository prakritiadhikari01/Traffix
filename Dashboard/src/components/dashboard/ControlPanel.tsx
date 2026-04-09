
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Power, RotateCcw, Brain, User } from "lucide-react";
import { useState } from "react";

export function ControlPanel() {
  const [aiMode, setAiMode] = useState(true);
  const [systemActive, setSystemActive] = useState(true);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Control Panel</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Status */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">System Status</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">System Power</span>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={systemActive} 
                onCheckedChange={setSystemActive}
              />
              <Power className={`w-4 h-4 ${systemActive ? 'text-emerald-400' : 'text-muted-foreground'}`} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">AI Mode</span>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={aiMode} 
                onCheckedChange={setAiMode}
              />
              {aiMode ? (
                <Brain className="w-4 h-4 text-blue-400" />
              ) : (
                <User className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Current Mode */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Current Mode</h4>
          <Badge 
            variant="outline" 
            className={`w-full justify-center ${
              aiMode 
                ? 'border-blue-400 text-blue-400' 
                : 'border-amber-400 text-amber-400'
            }`}
          >
            {aiMode ? 'AI Controlled' : 'Manual Override'}
          </Badge>
        </div>

        <Separator className="bg-border" />

        {/* Manual Controls */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Manual Override</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-border text-card-foreground hover:bg-accent"
              disabled={aiMode}
            >
              North
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-border text-card-foreground hover:bg-accent"
              disabled={aiMode}
            >
              South
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-border text-card-foreground hover:bg-accent"
              disabled={aiMode}
            >
              East
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-border text-card-foreground hover:bg-accent"
              disabled={aiMode}
            >
              West
            </Button>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* System Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">System Actions</h4>
          <Button 
            variant="outline" 
            className="w-full border-amber-400 text-amber-400 hover:bg-amber-400/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset System
          </Button>
        </div>

        {/* AI Summary */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">AI Summary</h4>
          <div className="p-3 bg-muted/30 rounded-lg border border-border">
            <p className="text-sm text-card-foreground">
              "North direction shows high congestion for 3 cycles. West direction priority recommended for next switch."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
