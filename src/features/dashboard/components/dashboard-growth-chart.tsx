"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Download } from "lucide-react";
import { toast } from "sonner";

const data = [
  { month: "أبريل", count: 140, change: "+8%" },
  { month: "مايو", count: 164, change: "+17%" },
  { month: "يونيو", count: 188, change: "+15%" },
  { month: "يوليو", count: 210, change: "+12%" },
  { month: "أغسطس", count: 232, change: "+10%" },
  { month: "سبتمبر", count: 248, change: "+12%" },
];

export function DashboardGrowthChart() {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E0E4D8]/60 shadow-xs flex flex-col justify-between h-full">
      {/* Chart Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F0F2EB]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F4F6F0] border border-[#E0E4D8] flex items-center justify-center text-[#374732]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#172115]">نمو أصحاب العقارات</h2>
            <p className="text-[11px] text-[#788574]">معدل انضمام الملاك للمنصة شهرياً</p>
          </div>
        </div>

        {/* Period badge & Download button */}
        <div className="flex items-center gap-2">
          {/* Badge: آخر 6 أشهر (Right in RTL) */}
          <div className="px-4 py-1.5 rounded-full bg-[#EAF0E6] text-xs sm:text-sm font-medium text-[#172115] select-none">
            آخر 6 أشهر
          </div>

          {/* Download button (Left in RTL) */}
          <button
            type="button"
            onClick={() => toast.info("جاري تحميل تقرير النمو...")}
            title="تحميل التقرير"
            className="w-9 h-9 rounded-xl bg-[#EAF0E6] hover:bg-[#DDE6D8] flex items-center justify-center text-[#172115] transition-colors cursor-pointer select-none"
          >
            <Download className="w-4 h-4 text-[#172115]" />
          </button>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="w-full h-64 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 25, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#374732" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#374732" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEFE6" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6A7865", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#97A393", fontSize: 10 }}
              domain={[100, 275]}
            />
            <Tooltip
              defaultIndex={5}
              offset={-30}
              cursor={{ stroke: "#374732", strokeWidth: 1.5, strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as {
                    month: string;
                    count: number;
                    change?: string;
                  };
                  return (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34432E] border border-white/10 text-white text-[11px] font-bold shadow-lg select-none whitespace-nowrap -translate-y-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#86EFAC] shrink-0" />
                      <span>
                        {item.month}: {item.count} مالك ({item.change || "+12%"})
                      </span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#374732"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#growthGradient)"
              dot={{ r: 4, fill: "#374732", strokeWidth: 2, stroke: "#FFFFFF" }}
              activeDot={{ r: 6, fill: "#273323", stroke: "#86EFAC", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Axis Summary Footnote */}
      <div className="grid grid-cols-6 text-center text-[10px] text-[#7B8775] pt-2 border-t border-[#F0F2EB]">
        <div>140</div>
        <div>164</div>
        <div>188</div>
        <div>210</div>
        <div>232</div>
        <div className="font-bold text-[#172115]">248</div>
      </div>
    </div>
  );
}
