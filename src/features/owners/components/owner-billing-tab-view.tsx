"use client";

import { useState, useMemo } from "react";
import {
  CreditCard,
  Download,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Building,
  ShieldCheck,
  FileText,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ActionDropdown } from "@/components/shared/action-dropdown";
import { TablePagination } from "@/components/shared/table-pagination";

interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  period: string;
  grossAmount: string;
  commissionRate: string;
  commissionAmount: string;
  netPayout: string;
  status: "paid" | "processing" | "pending";
  statusText: string;
  paymentMethod: string;
}

const defaultInvoices: InvoiceItem[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-0914",
    issueDate: "15 سبتمبر 2026",
    period: "01 - 15 سبتمبر 2026",
    grossAmount: "36,500 ر.س",
    commissionRate: "12%",
    commissionAmount: "4,380 ر.س",
    netPayout: "32,120 ر.س",
    status: "processing",
    statusText: "قيد التحويل البنكي",
    paymentMethod: "تحويل سريع (الراجحي)",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-0831",
    issueDate: "31 أغسطس 2026",
    period: "16 - 31 أغسطس 2026",
    grossAmount: "48,200 ر.س",
    commissionRate: "12%",
    commissionAmount: "5,784 ر.س",
    netPayout: "42,416 ر.س",
    status: "paid",
    statusText: "مسدد بالكامل",
    paymentMethod: "تحويل سريع (الراجحي)",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-0815",
    issueDate: "15 أغسطس 2026",
    period: "01 - 15 أغسطس 2026",
    grossAmount: "42,000 ر.س",
    commissionRate: "12%",
    commissionAmount: "5,040 ر.س",
    netPayout: "36,960 ر.س",
    status: "paid",
    statusText: "مسدد بالكامل",
    paymentMethod: "تحويل سريع (الراجحي)",
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-0731",
    issueDate: "31 يوليو 2026",
    period: "16 - 31 يوليو 2026",
    grossAmount: "39,800 ر.س",
    commissionRate: "12%",
    commissionAmount: "4,776 ر.س",
    netPayout: "35,024 ر.س",
    status: "paid",
    statusText: "مسدد بالكامل",
    paymentMethod: "تحويل سريع (الراجحي)",
  },
  {
    id: "inv-5",
    invoiceNumber: "INV-2026-0715",
    issueDate: "15 يوليو 2026",
    period: "01 - 15 يوليو 2026",
    grossAmount: "44,100 ر.س",
    commissionRate: "12%",
    commissionAmount: "5,292 ر.س",
    netPayout: "38,808 ر.س",
    status: "paid",
    statusText: "مسدد بالكامل",
    paymentMethod: "تحويل سريع (الراجحي)",
  },
];

export function OwnerBillingTabView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "processing">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredInvoices = useMemo(() => {
    return defaultInvoices.filter((inv) => {
      if (filterStatus === "paid" && inv.status !== "paid") return false;
      if (filterStatus === "processing" && inv.status !== "processing") return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesNumber = inv.invoiceNumber.toLowerCase().includes(q);
        const matchesPeriod = inv.period.toLowerCase().includes(q);
        const matchesStatus = inv.statusText.toLowerCase().includes(q);
        return matchesNumber || matchesPeriod || matchesStatus;
      }
      return true;
    });
  }, [filterStatus, searchQuery]);

  const totalFiltered = filteredInvoices.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + pageSize);
  const fromIndex = totalFiltered === 0 ? 0 : startIndex + 1;
  const toIndex = Math.min(startIndex + pageSize, totalFiltered);

  const counts = useMemo(() => {
    return {
      all: defaultInvoices.length,
      paid: defaultInvoices.filter((i) => i.status === "paid").length,
      processing: defaultInvoices.filter((i) => i.status === "processing").length,
    };
  }, []);

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1. Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-[#172115] tracking-tight">
            الاشتراك والفوترة والحسابات المالية
          </h1>
          <p className="text-sm text-[#7D8A78] mt-1 font-normal leading-relaxed">
            إدارة باقة الاشتراك، سجل الفواتير والمستحقات، وإعدادات الحساب البنكي لتحويل العوائد المالية للمالك.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toast.info("جاري إعداد وتحميل كشف الحساب المالي المعتمد (PDF)...")}
            className="bg-white hover:bg-[#F9FAF7] border border-[#E2E6DC] text-[#172115] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#172115]" />
            <span>تصدير كشف الحساب (PDF)</span>
          </button>

          <button
            type="button"
            onClick={() => toast.success("الحساب البنكي وباقة الاشتراك محدثة وموثقة بنجاح")}
            className="bg-[#384633] hover:bg-[#2C3827] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>إعدادات الفوترة</span>
          </button>
        </div>
      </div>

      {/* 2. Financial Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Subscription Plan */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#7D8A78] font-medium">باقة الاشتراك الحالية</span>
            <span className="bg-[#E9F3E6] border border-[#CFDFCA] text-[#2E6B22] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              نشطة ومفعلة
            </span>
          </div>
          <div className="pt-1">
            <h3 className="text-2xl font-black text-[#172115]">الباقة الاحترافية (Pro)</h3>
            <p className="text-xs text-[#7D8A78] mt-1">تجديد سنوي تلقائي في 31 ديسمبر 2026</p>
          </div>
        </div>

        {/* Card 2: Commission Rate */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#7D8A78] font-medium">نسبة عمولة المنصة</span>
            <span className="bg-[#EFF2EB] border border-[#DFE4DA] text-[#5A6857] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              عمولة تشغيلية
            </span>
          </div>
          <div className="pt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#172115]">12%</span>
            </div>
            <p className="text-xs text-[#7D8A78] mt-1">تشمل الربط التقني، الأقفال، وتتبع المدفوعات</p>
          </div>
        </div>

        {/* Card 3: Transferable Balance */}
        <div className="bg-[#F1F5EB] rounded-3xl p-5 border border-[#CFD9CA] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#556350] font-medium">الرصيد القابل للتحويل</span>
            <span className="bg-[#E3ECD9] border border-[#BDD0B3] text-[#25501C] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              دورة أسبوعية
            </span>
          </div>
          <div className="pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-[#172115]">32,120</span>
              <span className="text-xs font-bold text-[#556350]">ر.س</span>
            </div>
            <p className="text-xs text-[#556350] mt-1">التحويل القادم مجدول في 22 سبتمبر 2026</p>
          </div>
        </div>

        {/* Card 4: Total Payouts Year to Date */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#7D8A78] font-medium">إجمالي المستحقات المسددة</span>
            <span className="bg-[#E9F3E6] border border-[#CFDFCA] text-[#2E6B22] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+18.4%</span>
            </span>
          </div>
          <div className="pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-[#172115]">184,250</span>
              <span className="text-xs font-bold text-[#7D8A78]">ر.س</span>
            </div>
            <p className="text-xs text-[#7D8A78] mt-1">محولة عبر الحساب البنكي المعتمد</p>
          </div>
        </div>
      </div>

      {/* 3. Subscription Features & Bank Account Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col (RTL Right): Plan Features Card (col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EEF2E6] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F0F4EC] border border-[#DEE6D8] flex items-center justify-center text-[#34432E]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172115]">
                  مزايا باقة الإدارة التشغيلية
                </h2>
                <p className="text-xs text-[#7D8A78]">
                  الباقة المتقدمة لإدارة العقارات والوحدات الفندقية
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#384633] bg-[#F0F4EC] px-3 py-1 rounded-xl border border-[#DEE6D8]">
              شاملة الصيانة التقنية
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              "إدارة عدد غير محدود من العقارات والوحدات",
              "المزامنة اللحظية مع Booking.com وAirbnb",
              "نظام الأقفال الذكية وتوليد الأكواد التلقائي",
              "أتمتة إشعارات ورسائل النزلاء عبر واتساب",
              "تقارير محاسبية دورية وإقرارات ضريبية",
              "فريق دعم مخصص للملاك على مدار الساعة",
            ].map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F9FAF7] border border-[#E9EFE5] text-xs text-[#172115] font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-[#384633] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col (RTL Left): Verified Bank Account Card (col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EEF2E6] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F0F4EC] border border-[#DEE6D8] flex items-center justify-center text-[#34432E]">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172115]">
                  الحساب البنكي المعتمد للتحويل
                </h2>
                <p className="text-xs text-[#7D8A78]">
                  يتم إيداع العوائد تلقائياً حسب الدورة المحاسبية
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-[#F0F4EC]">
              <span className="text-[#7D8A78]">اسم البنك:</span>
              <span className="font-bold text-[#172115]">مصرف الراجحي (Al Rajhi Bank)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#F0F4EC]">
              <span className="text-[#7D8A78]">اسم المستفيد المعتمد:</span>
              <span className="font-bold text-[#172115]">خالد بن فهد العتيبي</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-[#F0F4EC]">
              <span className="text-[#7D8A78]">رقم الآيبان (IBAN):</span>
              <span className="font-mono font-bold text-[#172115]" dir="ltr">
                SA44 8000 0204 1234 5678 9000
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-[#7D8A78]">دورة التحويل:</span>
              <span className="font-bold text-[#2E6B22]">كل يوم ثلاثاء أسبوعياً</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Invoices & Settlements Table Section */}
      <div className="space-y-4">
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-3 border border-[#E2E6DC] flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
          {/* Search Input */}
          <div className="relative w-full md:w-[440px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم الفاتورة، الفترة، أو الحالة..."
              className="w-full h-11 pe-4 ps-11 rounded-2xl bg-[#F0F4EC] border border-transparent text-xs text-[#172115] placeholder:text-[#7D8A78] focus:bg-white focus:border-[#CCD5C5] focus:outline-none transition-all placeholder:text-right"
            />
            <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D8A78]">
              <Search className="w-4 h-4" />
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F0F4EC] rounded-2xl overflow-x-auto no-scrollbar w-full md:w-auto">
            {[
              { id: "all", label: `الكل (${counts.all})` },
              { id: "paid", label: `مسددة (${counts.paid})` },
              { id: "processing", label: `قيد التحويل (${counts.processing})` },
            ].map((tab) => {
              const isActive = filterStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterStatus(tab.id as any)}
                  className={cn(
                    "px-4 py-1.5 rounded-xl text-xs transition-all whitespace-nowrap cursor-pointer select-none",
                    isActive
                      ? "bg-white text-[#172115] font-bold shadow-2xs"
                      : "text-[#717E6E] hover:text-[#172115] font-medium"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-[#E2E6DC] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-[#E2E6DC] text-[#7D8A78] text-xs font-bold bg-white">
                  <th className="px-5 py-4 whitespace-nowrap text-right">رقم الفاتورة</th>
                  <th className="px-4 py-4 whitespace-nowrap text-right">تاريخ الإصدار</th>
                  <th className="px-4 py-4 whitespace-nowrap text-right">الفترة المحاسبية</th>
                  <th className="px-4 py-4 whitespace-nowrap text-right">إجمالي الإيرادات</th>
                  <th className="px-4 py-4 whitespace-nowrap text-right">عمولة المنصة</th>
                  <th className="px-4 py-4 whitespace-nowrap text-right">صافي المحول للمالك</th>
                  <th className="px-4 py-4 whitespace-nowrap text-center">الحالة</th>
                  <th className="px-4 py-4 whitespace-nowrap text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF2E6]">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-12 text-[#7D8A78] text-xs font-medium"
                    >
                      لا توجد فواتير مطابقة لمعايير البحث
                    </td>
                  </tr>
                ) : (
                  paginatedInvoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-[#F6F8F4]/70 transition-colors"
                    >
                      {/* 1. رقم الفاتورة */}
                      <td className="px-5 py-4 whitespace-nowrap font-mono font-bold text-xs sm:text-sm text-[#172115]">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#7D8A78]" />
                          <span>{inv.invoiceNumber}</span>
                        </div>
                      </td>

                      {/* 2. تاريخ الإصدار */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-[#172115] font-medium">
                        {inv.issueDate}
                      </td>

                      {/* 3. الفترة المحاسبية */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-[#7D8A78]">
                        {inv.period}
                      </td>

                      {/* 4. إجمالي الإيرادات */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs font-bold text-[#172115]">
                        {inv.grossAmount}
                      </td>

                      {/* 5. عمولة المنصة */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-[#7D8A78]">
                        <span className="font-medium">{inv.commissionAmount}</span>
                        <span className="text-[11px] text-[#A0ACA0] me-1">
                          ({inv.commissionRate})
                        </span>
                      </td>

                      {/* 6. صافي المحول للمالك */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm font-black text-[#172115]">
                        {inv.netPayout}
                      </td>

                      {/* 7. الحالة */}
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        {inv.status === "paid" ? (
                          <span className="inline-flex items-center gap-1.5 bg-[#E9F3E6] border border-[#CFDFCA] text-[#2E6B22] text-xs font-bold px-3 py-1 rounded-full">
                            <span>{inv.statusText}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B22]" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 bg-[#FFF8E6] border border-[#F3DFB1] text-[#9A6B0A] text-xs font-bold px-3 py-1 rounded-full">
                            <span>{inv.statusText}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9A6B0A]" />
                          </span>
                        )}
                      </td>

                      {/* 8. الإجراءات */}
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              toast.info(`جاري تحميل الفاتورة رقم ${inv.invoiceNumber} (PDF)...`)
                            }
                            className="bg-[#F0F4EC] hover:bg-[#E3ECD9] text-[#172115] border border-[#DEE6D8] rounded-xl px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-[#384633]" />
                            <span>تحميل</span>
                          </button>

                          <ActionDropdown
                            triggerIcon="vertical"
                            items={[
                              {
                                label: "تفاصيل الفاتورة",
                                icon: Eye,
                                onClick: () =>
                                  toast.info(`عرض تفاصيل الفاتورة: ${inv.invoiceNumber}`),
                              },
                              {
                                label: "تحميل بصيغة PDF",
                                icon: Download,
                                onClick: () =>
                                  toast.info(`تحميل الفاتورة ${inv.invoiceNumber}`),
                              },
                              {
                                label: "إعادة إرسال إشعار الدفع",
                                icon: SlidersHorizontal,
                                onClick: () =>
                                  toast.success(`تم إرسال إشعار الفاتورة إلى بريد المالك`),
                              },
                            ]}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <TablePagination
            currentPage={activePage}
            totalPages={totalPages}
            totalCount={defaultInvoices.length}
            fromIndex={fromIndex}
            toIndex={toIndex}
            pageSize={pageSize}
            pageSizeOptions={[5, 10, 20, 50]}
            onPageChange={(page) => setCurrentPage(page)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            entityName="فاتورة"
            pluralEntityName="فواتير"
            registeredLabel="مسجلة"
          />
        </div>
      </div>
    </div>
  );
}
