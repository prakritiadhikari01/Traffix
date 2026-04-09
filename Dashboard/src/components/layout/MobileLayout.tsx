
import { Header } from "@/components/layout/Header";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <Header />
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
}
