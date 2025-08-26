import type { ReactNode } from "react";

interface FarmerLayoutProps {
  children: ReactNode;
}

export default function FarmerLayout({ children }: FarmerLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
