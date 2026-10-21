"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Download,
  Search,
  MoreVertical,
  CheckCircle2,
  Clock,
  Sparkles,
  Wrench,
  ShieldAlert,
  Send,
  Building2,
  ChevronLeft,
  ChevronRight,
  Share2,
  RotateCcw,
  Eye,
  Edit,
  Pause,
  Play,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { AutomationRule, AutomationMainTab } from "../../types";
import { initialAutomationRules } from "../../data/mock-automation";
import { AutomationTabsNav } from "../automation-tabs-nav";
import { PauseRuleModal } from "./modals/pause-rule-modal";
import { ActivateRuleModal } from "./modals/activate-rule-modal";
import { DeleteRuleModal } from "./modals/delete-rule-modal";

interface AutomationRulesViewProps {
  onSelectRule?: (ruleId: string) => void;
  onTabChange?: (tab: AutomationMainTab) => void;
}

export function AutomationRulesView({ onSelectRule, onTabChange }: AutomationRulesViewProps) {
  const [rules, setRules] = useState<AutomationRule[]>(initialAutomationRules);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "paused">("all");
  const [isEmptyPreview, setIsEmptyPreview] = useState(false);

  // Modals state
  const [activeRuleForModal, setActiveRuleForModal] = useState<AutomationRule | null>(null);
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [isActivateOpen, setIsActivateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const filteredRules = useMemo(() => {
    return rules.filter((rule) => {
      if (statusFilter === "active" && rule.status !== "active") return false;
      if (statusFilter === "paused" && rule.status !== "paused") return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          rule.title.toLowerCase().includes(q) ||
          rule.ruleCode.toLowerCase().includes(q) ||
          rule.triggerLabel.toLowerCase().includes(q) ||
          rule.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [rules, statusFilter, searchQuery]);

  const handleExport = () => {
    toast.success("جاري تصدير قائمة قواعد الأتمتة...");
  };

  const handleToggleStatus = (rule: AutomationRule) => {
    setActiveRuleForModal(rule);
    if (rule.status === "active") {
      setIsPauseOpen(true);
    } else {
      setIsActivateOpen(true);
    }
  };

  const handleDeleteRule = (rule: AutomationRule) => {
    setActiveRuleForModal(rule);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-5">
      {/* Top 3 Main Tabs Nav */}
      <AutomationTabsNav activeTab="rules" onTabChange={onTabChange} />

      {/* 1. Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1F2937]">قواعد الأتمتة</h2>
          <p className="text-xs text-[#6B7280] mt-1">
            إدارة القواعد والإجراءات التلقائية المرتبطة بالحجوزات والتشغيل وواتساب.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/dashboard/automation/rules/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#1F3D2B] text-white hover:bg-[#183022] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء قاعدة</span>
          </Link>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span>تصدير السجل</span>
          </button>

          {/* Toggle for empty state view testing */}
          <button
            type="button"
            onClick={() => setIsEmptyPreview(!isEmptyPreview)}
            className="px-2.5 py-1 text-xs text-[#1F3D2B] bg-[#EEF5EE] rounded-lg border border-[#DCE8DC] hover:underline"
          >
            {isEmptyPreview ? "عرض البيانات" : "معاينة فارغة [1:26315]"}
          </button>
        </div>
      </div>

      {/* Empty State View [1:26315] */}
      {isEmptyPreview || filteredRules.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 border border-[#EBEBEB] shadow-sm text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#F4F6F3] border border-[#EBEBEB] flex items-center justify-center text-[#1F3D2B] relative">
            <Share2 className="w-8 h-8" />
            <div className="absolute -top-1.5 -end-1.5 w-6 h-6 rounded-full bg-[#1F3D2B] text-white flex items-center justify-center text-xs font-bold">
              +
            </div>
          </div>

          <div className="max-w-md space-y-1.5">
            <h3 className="text-xl font-bold text-[#1F2937]">لا توجد قواعد أتمتة</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              لم يتم إنشاء أي قواعد أتمتة على المنصة حتى الآن. ابدأ بتهيئة سير العمل التلقائي لإرسال أكواد الدخول الذكية، تنبيهات المغادرة، وتعيين مهام التنظيف آلياً.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/dashboard/automation/rules/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1F3D2B] text-white text-xs font-bold hover:bg-[#183022] transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء قاعدة جديدة</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsEmptyPreview(false);
                setSearchQuery("");
                setStatusFilter("all");
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              <span>تحديث الصفحة</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 2. Filter Bar */}
          <div className="bg-white rounded-3xl p-3 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث باسم القاعدة، المحفّز، أو الإجراء..."
                className="w-full pl-4 pr-10 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-xs text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1F3D2B]"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
                  statusFilter === "all"
                    ? "bg-[#F3F4F6] text-[#111827] font-semibold border border-[#E5E7EB]"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                الكل ({rules.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("active")}
                className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
                  statusFilter === "active"
                    ? "bg-[#F3F4F6] text-[#111827] font-semibold border border-[#E5E7EB]"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                مفعلة (12)
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("paused")}
                className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
                  statusFilter === "paused"
                    ? "bg-[#F3F4F6] text-[#111827] font-semibold border border-[#E5E7EB]"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                متوقفة (2)
              </button>
            </div>
          </div>

          {/* 3. Rules Table */}
          <div className="bg-white rounded-3xl border border-[#EBEBEB] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-[#F3F4F6] text-xs font-medium text-[#6B7280] bg-[#FAFBF9]">
                    <th className="py-4 px-5">اسم القاعدة وتصنيفها</th>
                    <th className="py-4 px-5">المحفّز (Trigger)</th>
                    <th className="py-4 px-5">الإجراء المنفّذ (Action)</th>
                    <th className="py-4 px-5">النطاق المستهدف</th>
                    <th className="py-4 px-5">آخر تشغيل ومعدل النجاح</th>
                    <th className="py-4 px-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6] text-xs">
                  {filteredRules.map((rule) => {
                    const isPaused = rule.status === "paused";

                    return (
                      <tr
                        key={rule.id}
                        className="hover:bg-[#F9FAF8] transition-colors group"
                      >
                        {/* Name & Classification */}
                        <td className="py-4 px-5">
                          <div className="flex items-start gap-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#FAFBF9] border border-[#EBEBEB] text-[#4B5563] shrink-0 mt-0.5">
                              {rule.categoryLabel}
                            </span>
                            <div>
                              <Link
                                href={`/dashboard/automation/rules/${rule.id}`}
                                className="font-bold text-sm text-[#1F2937] hover:text-[#1F3D2B] hover:underline block"
                              >
                                {rule.title}
                              </Link>
                              <p className="text-[11px] text-[#9CA3AF] mt-0.5 max-w-xs leading-relaxed">
                                {rule.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Trigger */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#1F3D2B]" />
                            <span className="font-medium text-[#1F2937]">{rule.triggerLabel}</span>
                          </div>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <Send className="w-3.5 h-3.5 text-[#1F3D2B]" />
                            <span className="text-[#374151] font-medium">{rule.actionSummary}</span>
                          </div>
                        </td>

                        {/* Target Scope */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gray-50 border border-gray-200 text-[#374151]">
                            <Building2 className="w-3 h-3 text-gray-500" />
                            <span>{rule.scope}</span>
                          </div>
                        </td>

                        {/* Last Run & Success Rate */}
                        <td className="py-4 px-5 whitespace-nowrap">
                          <div>
                            <p className="font-medium text-[#1F2937]">{rule.lastExecution}</p>
                            {rule.bookingRef && (
                              <p className="text-[10px] text-[#9CA3AF] font-mono">({rule.bookingRef})</p>
                            )}
                            <p className="text-[10px] text-[#16A34A] font-semibold mt-0.5 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{rule.successRate}</span>
                            </p>
                          </div>
                        </td>

                        {/* Actions Menu */}
                        <td className="py-4 px-4 text-center relative">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenDropdownId(openDropdownId === rule.id ? null : rule.id)
                            }
                            className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors mx-auto"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {openDropdownId === rule.id && (
                            <div
                              className="absolute left-4 top-12 z-30 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 text-right text-xs divide-y divide-gray-50"
                              onClick={() => setOpenDropdownId(null)}
                            >
                              <div className="space-y-0.5 pb-1">
                                <Link
                                  href={`/dashboard/automation/rules/${rule.id}`}
                                  className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-50 text-gray-700"
                                >
                                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                                  <span>تفاصيل القاعدة</span>
                                </Link>
                                <Link
                                  href={`/dashboard/automation/rules/${rule.id}/edit`}
                                  className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-50 text-gray-700"
                                >
                                  <Edit className="w-3.5 h-3.5 text-gray-400" />
                                  <span>تعديل القاعدة</span>
                                </Link>
                              </div>

                              <div className="space-y-0.5 pt-1">
                                <button
                                  type="button"
                                  onClick={() => handleToggleStatus(rule)}
                                  className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-50 text-gray-700"
                                >
                                  {isPaused ? (
                                    <>
                                      <Play className="w-3.5 h-3.5 text-[#16A34A]" />
                                      <span>تفعيل القاعدة</span>
                                    </>
                                  ) : (
                                    <>
                                      <Pause className="w-3.5 h-3.5 text-amber-600" />
                                      <span>إيقاف القاعدة</span>
                                    </>
                                  )}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteRule(rule)}
                                  className="w-full px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-red-50 text-red-600"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>حذف القاعدة</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#F3F4F6] text-xs text-[#6B7280]">
              <div>
                <span>عرض 1 - 7 من أصل </span>
                <span className="font-bold text-[#1F2937]">14 قاعدة مسجلة في النظام</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span>الصفوف لكل صفحة:</span>
                  <span className="font-semibold text-[#1F2937] px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                    10 قواعد
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled
                    className="px-3 py-1 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>السابق</span>
                  </button>
                  <button
                    type="button"
                    className="w-7 h-7 rounded-lg bg-[#1F3D2B] text-white font-bold flex items-center justify-center"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1"
                  >
                    <span>التالي</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Confirmation Modals */}
      <PauseRuleModal
        isOpen={isPauseOpen}
        onClose={() => setIsPauseOpen(false)}
        rule={activeRuleForModal}
        onConfirm={() => {
          if (activeRuleForModal) {
            setRules(
              rules.map((r) =>
                r.id === activeRuleForModal.id ? { ...r, status: "paused" } : r
              )
            );
          }
        }}
      />

      <ActivateRuleModal
        isOpen={isActivateOpen}
        onClose={() => setIsActivateOpen(false)}
        rule={activeRuleForModal}
        onConfirm={() => {
          if (activeRuleForModal) {
            setRules(
              rules.map((r) =>
                r.id === activeRuleForModal.id ? { ...r, status: "active" } : r
              )
            );
          }
        }}
      />

      <DeleteRuleModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        rule={activeRuleForModal}
        onConfirm={() => {
          if (activeRuleForModal) {
            setRules(rules.filter((r) => r.id !== activeRuleForModal.id));
          }
        }}
      />
    </div>
  );
}
