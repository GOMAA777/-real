"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  ExternalLink,
  ChevronDown,
  Layers,
  MessageSquare,
  Wrench,
  ShieldAlert,
  Smartphone,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { ExecutionLog, AutomationMainTab } from "../../types";
import { initialExecutionLogs } from "../../data/mock-automation";
import { AutomationTabsNav } from "../automation-tabs-nav";
import { RetryExecutionModal } from "./modals/retry-execution-modal";

interface ExecutionLogsViewProps {
  onTabChange?: (tab: AutomationMainTab) => void;
}

export function ExecutionLogsView({ onTabChange }: ExecutionLogsViewProps) {
  const [logs, setLogs] = useState<ExecutionLog[]>(initialExecutionLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Retry modal state
  const [retryTargetLog, setRetryTargetLog] = useState<ExecutionLog | null>(null);

  const statusCounts = useMemo(() => {
    return {
      all: 1420,
      success: 1388,
      failed: 18,
      in_progress: 14,
    };
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.logCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ruleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.propertyName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || log.status === statusFilter;

      const matchesAction =
        actionFilter === "all" || log.actionType === actionFilter;

      return matchesSearch && matchesStatus && matchesAction;
    });
  }, [logs, searchQuery, statusFilter, actionFilter]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("تم تحديث سجل التنفيذ التشغيلي وجلب آخر العمليات اللحظية.");
    }, 600);
  };

  const handleExport = () => {
    toast.info("جارٍ تجهيز ملف سجل العمليات بصيغة CSV...");
    setTimeout(() => {
      toast.success("تم تصدير سجل التنفيذ بنجاح!");
    }, 800);
  };

  const handleRetryConfirm = () => {
    if (!retryTargetLog) return;
    setLogs((prev) =>
      prev.map((l) =>
        l.id === retryTargetLog.id
          ? {
              ...l,
              status: "success",
              statusSummary: "تمت إعادة المحاولة وتسليم الرسالة بنجاح عبر SMS Fallback",
              responseTime: "2.1 ثانية",
            }
          : l
      )
    );
    toast.success(`تمت إعادة محاولة إرسال العملية (${retryTargetLog.logCode}) بنجاح!`);
    setRetryTargetLog(null);
  };

  return (
    <div className="space-y-6">
      {/* 3 Main Tabs Nav (with logs active) */}
      <AutomationTabsNav activeTab="logs" onTabChange={onTabChange} />

      {/* Main Container Card [1:25186] */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-6">
        {/* Header & Main Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F3F4F6]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#181d17]">سجل التنفيذ التشغيلي والرسائل</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#dfe4db] text-[#454840]">
                1,420 عملية مسجلة
              </span>
            </div>
            <p className="text-xs text-[#454840] mt-1">
              متابعة حية وفورية لجميع أحداث التشغيل وقواعد الأتمتة ورسائل واتساب المنفذة لحظياً.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#4b5940] ${isRefreshing ? "animate-spin" : ""}`} />
              <span>تحديث السجل</span>
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#FAFBF9] hover:bg-gray-100 text-[#181d17] border border-gray-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#4b5940]" />
              <span>تصدير السجل</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === "all"
                  ? "bg-[#34422a] text-white shadow-xs"
                  : "bg-[#FAFBF9] text-[#454840] hover:bg-gray-100"
              }`}
            >
              <span>الكل</span>
              <span className="ms-1 text-[10px] opacity-80">(1,420)</span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("success")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === "success"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-[#FAFBF9] text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              <span>ناجحة</span>
              <span className="ms-1 text-[10px] opacity-80">(1,388)</span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("failed")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === "failed"
                  ? "bg-red-700 text-white shadow-xs"
                  : "bg-[#FAFBF9] text-red-800 hover:bg-red-50"
              }`}
            >
              <span>فاشلة / بحاجة تدقيق</span>
              <span className="ms-1 text-[10px] opacity-80">(18)</span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("in_progress")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === "in_progress"
                  ? "bg-blue-700 text-white shadow-xs"
                  : "bg-[#FAFBF9] text-blue-800 hover:bg-blue-50"
              }`}
            >
              <span>قيد المعالجة</span>
              <span className="ms-1 text-[10px] opacity-80">(14)</span>
            </button>
          </div>

          {/* Search and Action Filter */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="البحث برقم العملية، الضيف، الحجز..."
                className="w-full h-10 pr-10 pl-4 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4b5940] transition-colors"
              />
            </div>

            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-gray-200 text-xs text-[#454840] bg-white focus:outline-none focus:border-[#4b5940] transition-colors"
            >
              <option value="all">كافة القنوات</option>
              <option value="whatsapp">WhatsApp Cloud</option>
              <option value="cleaning_task">مهام التشغيل (Cleaning)</option>
              <option value="smart_lock">الأقفال الذكية</option>
              <option value="security_alert">تنبيهات الأمان</option>
            </select>
          </div>
        </div>

        {/* Execution Logs Table [1:25186] */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-[#FAFBF9] border-b border-gray-100 text-[#454840] font-bold">
                <th className="py-3.5 pr-4">معرّف العملية</th>
                <th className="py-3.5 px-3">التوقيت</th>
                <th className="py-3.5 px-3">القاعدة والمحفز</th>
                <th className="py-3.5 px-3">النزيل والحجز</th>
                <th className="py-3.5 px-3">العقار والوحدة</th>
                <th className="py-3.5 px-3">الإجراء والقناة</th>
                <th className="py-3.5 px-3">الحالة والزمن</th>
                <th className="py-3.5 pl-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#181d17]">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-[#FAFBF9]/80 transition-colors group"
                >
                  {/* Log Code */}
                  <td className="py-4 pr-4">
                    <span className="font-mono font-bold text-xs text-[#181d17]">
                      {log.logCode}
                    </span>
                  </td>

                  {/* Date & Time */}
                  <td className="py-4 px-3 text-[#454840]">
                    <div className="font-semibold text-xs text-[#181d17]">{log.time}</div>
                    <div className="text-[11px] text-gray-400">{log.date}</div>
                  </td>

                  {/* Rule & Trigger */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-xs text-[#181d17]">{log.ruleName}</div>
                    <div className="text-[11px] text-[#454840] mt-0.5">{log.triggerDetails}</div>
                  </td>

                  {/* Guest & Booking */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-xs text-[#181d17]">{log.guestName}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#454840] mt-0.5">
                      <span className="font-mono font-bold text-[#34422a]">{log.bookingId}</span>
                      <span>•</span>
                      <span className="font-mono text-gray-400">{log.guestPhone}</span>
                    </div>
                  </td>

                  {/* Property & Unit */}
                  <td className="py-4 px-3 text-[#454840]">
                    <div className="font-semibold text-xs text-[#181d17]">{log.propertyName}</div>
                    <div className="text-[11px] text-gray-500">{log.unitName}</div>
                  </td>

                  {/* Action Badge */}
                  <td className="py-4 px-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#ebefe6] text-[#34422a]">
                      {log.actionBadgeLabel}
                    </span>
                  </td>

                  {/* Status & Response Time */}
                  <td className="py-4 px-3">
                    {log.status === "success" ? (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          نجح
                        </span>
                        <div className="text-[10px] text-gray-400 font-mono">
                          {log.responseTime || "1.2 ثانية"}
                        </div>
                      </div>
                    ) : log.status === "failed" ? (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                          <AlertCircle className="w-3 h-3 text-red-600" />
                          فشل
                        </span>
                        <div className="text-[10px] text-red-600 font-medium">خطأ مزود الخدمة</div>
                      </div>
                    ) : (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          <Clock className="w-3 h-3 text-blue-600" />
                          قيد المعالجة
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 pl-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* View Details link */}
                      <Link
                        href={`/dashboard/automation/logs/${log.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-[#ebefe6] text-[#454840] hover:text-[#34422a] text-[11px] font-semibold transition-colors"
                      >
                        <span>عرض التفاصيل</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      {/* Retry button for failed logs */}
                      {log.status === "failed" && (
                        <button
                          type="button"
                          onClick={() => setRetryTargetLog(log)}
                          className="px-2 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                          title="إعادة محاولة"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>إعادة</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Retry Modal */}
      {retryTargetLog && (
        <RetryExecutionModal
          isOpen={!!retryTargetLog}
          onClose={() => setRetryTargetLog(null)}
          onConfirm={handleRetryConfirm}
          log={retryTargetLog}
        />
      )}
    </div>
  );
}
