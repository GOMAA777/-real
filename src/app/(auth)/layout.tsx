import { AuthShowcase } from "@/features/auth/components/auth-showcase";
import { AuthHeader } from "@/features/auth/components/auth-header";
import { AuthFooter } from "@/features/auth/components/auth-footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full flex flex-col-reverse lg:flex-row bg-[#F4F6F0]">
      {/* Right Column in RTL: Dark Olive Green Hero Showcase */}
      <div className="w-full lg:w-[42%] shrink-0">
        <AuthShowcase />
      </div>

      {/* Left Column in RTL: Form Panel */}
      <div className="w-full lg:w-[58%] flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#F4F6F0] min-h-screen">
        <AuthHeader />
        <main className="flex-1 flex items-center justify-center py-6 sm:py-10">
          {children}
        </main>
        <AuthFooter />
      </div>
    </div>
  );
}
