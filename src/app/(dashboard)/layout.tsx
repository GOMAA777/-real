import { Sidebar } from "@/components/shared/sidebar";
import { Topbar } from "@/components/shared/topbar";
import { DashboardContent } from "@/components/shared/dashboard-content";
import { AuthGuard } from "@/features/auth/components/auth-guard";
import { DashboardProviders } from "@/components/shared/dashboard-providers";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <DashboardProviders>
        <div className="min-h-screen bg-[#EFF2EB] text-[#252A24] font-cairo flex flex-col">
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content Area (dynamically adapts when sidebar collapses) */}
          <DashboardContent>
            <Topbar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1536px] w-full mx-auto space-y-6">
              {children}
            </main>
          </DashboardContent>
        </div>
      </DashboardProviders>
    </AuthGuard>
  );
}
