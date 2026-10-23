"use client";

import { Calendar } from "lucide-react";

export function UnitOccupancyTimeline() {
  const days = [
    {
      day: "اليوم • 18 سبتمبر",
      status: "متاح شاغر",
      sub: "فوري للاستقبال",
      color: "green",
    },
    {
      day: "الجمعة • 19 سبتمبر",
      status: "متاح شاغر",
      sub: "جاهز للحجز",
      color: "green",
    },
    {
      day: "السبت • 20 سبتمبر",
      status: "وصول النزيل",
      sub: "03:00 م • فهد",
      color: "amber",
    },
    {
      day: "الأحد • 21 سبتمبر",
      status: "محجوز مؤكد",
      sub: "حجز BK-10490",
      color: "amber",
    },
    {
      day: "الإثنين • 22 سبتمبر",
      status: "محجوز مؤكد",
      sub: "حجز BK-10490",
      color: "amber",
    },
    {
      day: "الثلاثاء • 23 سبتمبر",
      status: "مغادرة وتنظيف",
      sub: "12:00 ظ • رعاية",
      color: "orange",
    },
    {
      day: "الأربعاء • 24 سبتمبر",
      status: "متاح شاغر",
      sub: "متاح للمنصات",
      color: "green",
    },
  ];

  return (
    <div className="bg-white rounded-[16px] p-5 border border-[#EEF2E6] shadow-2xs space-y-4 text-start">
      {/* Header with Title and Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#34422A]" />
          <h3 className="text-[15px] font-bold text-[#181D17]">
            الجدول الزمني للإشغال (الأيام الـ 7 القادمة)
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] text-[#7D8A78]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2A6B3A]" />
            متاح
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            محجوز
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
            وصول / مغادرة وتنظيف
          </span>
        </div>
      </div>

      {/* 7-Days Columns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {days.map((d, index) => {
          let bgClass = "bg-[#EAF1E8] border-[#C6D8C2]";
          let textClass = "text-[#2A6B3A]";
          let dotColor = "bg-[#2A6B3A]";

          if (d.color === "amber") {
            bgClass = "bg-[#FEF3C7] border-[#FDE68A]";
            textClass = "text-[#92400E]";
            dotColor = "bg-[#D97706]";
          } else if (d.color === "orange") {
            bgClass = "bg-[#FFEDD5] border-[#FED7AA]";
            textClass = "text-[#9A3412]";
            dotColor = "bg-[#EA580C]";
          }

          return (
            <div
              key={index}
              className={`p-3 rounded-[12px] border ${bgClass} flex flex-col justify-between space-y-2 text-start transition-all hover:scale-[1.02] shadow-2xs`}
            >
              <div className="text-[11px] font-medium text-[#57534E] truncate">
                {d.day}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                  <span className={`text-[12px] font-bold ${textClass} truncate`}>
                    {d.status}
                  </span>
                </div>
                <div className="text-[10px] text-[#78716C] mt-0.5 truncate">
                  {d.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
