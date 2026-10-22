import Image from "next/image";

export default function DashboardLoading() {
  return (
    <div
      dir="rtl"
      className="w-full space-y-6 select-none animate-in fade-in duration-200 font-cairo"
    >
      {/* 1. Header Card Skeleton */}
      <div className="bg-white rounded-[24px] p-6 border border-[#E2E6DC] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2.5">
          <div className="h-7 w-48 sm:w-60 bg-[#EAF0E6] rounded-xl animate-pulse" />
          <div className="h-4 w-64 sm:w-96 bg-[#F4F6F0] rounded-lg animate-pulse" />
        </div>
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <div className="h-10 w-28 bg-[#F1F5EB] rounded-2xl animate-pulse" />
          <div className="h-10 w-36 bg-[#34422A]/15 rounded-2xl animate-pulse" />
        </div>
      </div>

      {/* 2. Metric / Filter Row Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E6DC] shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-[#F1F5EB] rounded-md animate-pulse" />
              <div className="w-8 h-8 rounded-xl bg-[#EAF0E6] animate-pulse" />
            </div>
            <div className="h-7 w-24 bg-[#E2E6DC] rounded-lg animate-pulse" />
            <div className="h-3 w-32 bg-[#F4F6F0] rounded-md animate-pulse" />
          </div>
        ))}
      </div>

      {/* 3. Main Data Card Skeleton with Centered Brand Loader */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E6DC] shadow-2xs space-y-6">
        {/* Centered Brand Loader */}
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-[#303A2C] text-white flex items-center justify-center p-3 shadow-md">
              <Image
                src="/logo.png"
                alt="ابراج"
                width={28}
                height={28}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            {/* Spinning indicator ring */}
            <div className="absolute -inset-2 rounded-3xl border-2 border-[#303A2C]/20 border-t-[#4B5940] animate-spin" />
          </div>

          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-[#172115]">
              جاري تجهيز وتحميل الصفحة...
            </h3>
            <p className="text-xs text-[#7D8A78]">
              يتم مزامنة البيانات وإعداد شاشات المنظومة فورياً
            </p>
          </div>
        </div>

        {/* Shimmer Table Rows Skeleton */}
        <div className="space-y-3 pt-3 border-t border-[#EEF2E6]">
          {[1, 2, 3, 4].map((row) => (
            <div
              key={row}
              className="h-14 w-full bg-[#F4F6F0] rounded-2xl flex items-center justify-between px-5 animate-pulse"
            >
              <div className="h-4 w-1/4 bg-[#E2E6DC] rounded-lg" />
              <div className="h-4 w-1/6 bg-[#E2E6DC] rounded-lg hidden sm:block" />
              <div className="h-4 w-1/5 bg-[#E2E6DC] rounded-lg hidden md:block" />
              <div className="h-7 w-20 bg-[#E2E6DC] rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
