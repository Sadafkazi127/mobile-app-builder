import { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showBottomNav?: boolean;
}

export function AppLayout({
  children,
  title,
  showHeader = true,
  showBottomNav = true,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && <Header title={title} />}
      <main className={showBottomNav ? "pb-20" : ""}>{children}</main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}