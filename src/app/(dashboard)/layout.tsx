import { Sidebar } from "@/components/shared/sidebar";
import { Topbar } from "@/components/shared/topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#F4F6F0] text-[#172115] flex flex-col">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area (offset by sidebar width on desktop) */}
      <div className="flex-1 flex flex-col lg:ms-64 transition-all duration-300">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
