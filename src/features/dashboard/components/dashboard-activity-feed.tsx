import Link from "next/link";
import {
  History,
  UserPlus,
  Building2,
  Calendar,
  FileEdit,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";

export function DashboardActivityFeed() {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E0E4D8]/60 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-[#172115]" />
          <h2 className="text-base sm:text-lg font-bold text-[#172115]">
            آخر نشاط على المنصة
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#5C6958]">
          <span className="w-2 h-2 rounded-full bg-[#347A4B]" />
          <span className="font-medium">سجل تدقيق العمليات الموثق</span>
        </div>
      </div>

      {/* Activity Timeline Items */}
      <div className="space-y-3 pt-1">
        {/* Row 1 */}
        <div className="flex items-center justify-between py-2 hover:bg-[#F9FAF7] px-2 -mx-2 rounded-2xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DCE6D7] flex items-center justify-center text-[#172115] shrink-0">
              <UserPlus className="w-5 h-5 text-[#172115]" />
            </div>
            <div className="flex items-center flex-wrap gap-2 text-sm">
              <span className="font-bold text-[#172115]">تم تسجيل مالك عقار جديد</span>
              <span className="text-[#A1AD9E]">—</span>
              <span className="px-3 py-1 rounded-xl bg-[#EAF0E6] text-xs font-semibold text-[#172115]">
                محمد العتيبي
              </span>
            </div>
          </div>
          <div className="text-xs text-[#7A8574] whitespace-nowrap shrink-0">
            منذ 10 دقائق
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between py-2 hover:bg-[#F9FAF7] px-2 -mx-2 rounded-2xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DCE6D7] flex items-center justify-center text-[#172115] shrink-0">
              <Building2 className="w-5 h-5 text-[#172115]" />
            </div>
            <div className="flex items-center flex-wrap gap-2 text-sm">
              <span className="font-bold text-[#172115]">تم إضافة عقار جديد</span>
              <span className="text-[#A1AD9E]">—</span>
              <span className="text-xs text-[#5C6958]">عمارة النخيل — الرياض</span>
              <span className="px-3 py-1 rounded-xl bg-[#EAF0E6] text-xs font-semibold text-[#5C6958]">
                12 وحدة
              </span>
            </div>
          </div>
          <div className="text-xs text-[#7A8574] whitespace-nowrap shrink-0">
            منذ 25 دقيقة
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-between py-2 hover:bg-[#F9FAF7] px-2 -mx-2 rounded-2xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DCE6D7] flex items-center justify-center text-[#172115] shrink-0">
              <Calendar className="w-5 h-5 text-[#172115]" />
            </div>
            <div className="flex items-center flex-wrap gap-2 text-sm">
              <span className="font-bold text-[#172115]">تم تسجيل 8 حجوزات جديدة</span>
              <span className="text-[#A1AD9E]">—</span>
              <span className="text-xs text-[#5C6958]">
                عبر قنوات الربط المباشر وقنوات التوزيع الرقمية (OTA)
              </span>
            </div>
          </div>
          <div className="text-xs text-[#7A8574] whitespace-nowrap shrink-0">
            منذ ساعة
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex items-center justify-between py-2 hover:bg-[#F9FAF7] px-2 -mx-2 rounded-2xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DCE6D7] flex items-center justify-center text-[#172115] shrink-0">
              <FileEdit className="w-5 h-5 text-[#172115]" />
            </div>
            <div className="flex items-center flex-wrap gap-2 text-sm">
              <span className="font-bold text-[#172115]">تم تحديث بيانات مالك عقار</span>
              <span className="text-[#A1AD9E]">—</span>
              <span className="text-xs text-[#5C6958]">
                خالد الحربي (تحديث الحساب المصرفي الآيبان والشهادة الضريبية)
              </span>
            </div>
          </div>
          <div className="text-xs text-[#7A8574] whitespace-nowrap shrink-0">
            منذ ساعتين
          </div>
        </div>
      </div>

      {/* Trust & Audit Banner Footer */}
      <div className="pt-4 mt-2 border-t border-[#F0F2EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A8574]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#347A4B] shrink-0" />
          <span className="text-xs">
            نظام المراقبة اللحظي يعمل بكفاءة 99.98% &rlm;▪&rlm; تم التحقق من جميع سجلات التدقيق
          </span>
        </div>

        <Link
          href="/dashboard/operations"
          className="font-medium text-[#2E3A2B] hover:text-[#172115] hover:underline flex items-center gap-1.5 text-xs transition-colors"
          dir="ltr"
        >
          <ChevronLeft className="w-4 h-4 text-[#2E3A2B]" />
          <span>سجل العمليات بالكامل</span>
        </Link>
      </div>
    </div>
  );
}
