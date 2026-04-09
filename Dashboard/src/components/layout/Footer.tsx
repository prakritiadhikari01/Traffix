
export function Footer() {
  return (
    <footer className="mt-8 py-6 border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-md"></div>
            <span className="text-sm font-medium text-foreground">Traffix Control System</span>
          </div>
          <div className="text-xs text-muted-foreground text-center sm:text-right">
            <p>Smart Traffic Management Solution</p>
            <p className="mt-1">© 2024 All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
