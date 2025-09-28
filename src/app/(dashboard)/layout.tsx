import React from "react";
import Header from "../components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 h-screen">
      {/* Sidebar */}

      {/* Main content */}
      <main>
        {/* Header */}
        <Header />
      </main>
    </div>
  );
}
