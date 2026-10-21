"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Eye,
  Pause,
  Play,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  ShieldCheck,
  MessageSquare,
  Send,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";
import { WhatsAppTemplate, AutomationMainTab } from "../../types";
import { initialWhatsAppTemplates } from "../../data/mock-automation";
import { AutomationTabsNav } from "../automation-tabs-nav";
import { PreviewTemplateModal } from "./modals/preview-template-modal";
import { PauseTemplateModal } from "./modals/pause-template-modal";

interface WhatsAppTemplatesViewProps {
  onTabChange?: (tab: AutomationMainTab) => void;
}

export function WhatsAppTemplatesView({ onTabChange }: WhatsAppTemplatesViewProps) {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(initialWhatsAppTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Force empty state toggle for testing Figma node 1:26523
  const [forceEmpty, setForceEmpty] = useState(false);

  // Modals state
  const [previewTemplate, setPreviewTemplate] = useState<WhatsAppTemplate | null>(null);
  const [pauseTargetTemplate, setPauseTargetTemplate] = useState<WhatsAppTemplate | null>(null);

  const categories = [
    { id: "all", label: "الكل", count: templates.length },
    { id: "bookings", label: "الحجوزات", count: templates.filter((t) => t.category === "bookings").length },
    { id: "arrival", label: "الوصول", count: templates.filter((t) => t.category === "arrival").length },
    { id: "door_pin", label: "كود الدخول", count: templates.filter((t) => t.category === "door_pin").length },
    { id: "departure", label: "المغادرة", count: templates.filter((t) => t.category === "departure").length },
  ];

  const filteredTemplates = useMemo(() => {
    if (forceEmpty) return [];

    return templates.filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.templateCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.triggerLabel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || template.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "all" || template.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [templates, searchQuery, selectedCategory, selectedStatus, forceEmpty]);

  const handlePauseConfirm = () => {
    if (!pauseTargetTemplate) return;
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === pauseTargetTemplate.id
          ? { ...t, status: "paused", statusLabel: "متوقفة" }
          : t
      )
    );
    toast.success(`تم إيقاف قالب واتساب (${pauseTargetTemplate.templateCode}) بنجاح.`);
    setPauseTargetTemplate(null);
  };

  const handleActivateTemplate = (tpl: WhatsAppTemplate) => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === tpl.id ? { ...t, status: "active", statusLabel: "مفعلة" } : t
      )
    );
    toast.success(`تم تفعيل قالب واتساب (${tpl.templateCode}) بنجاح.`);
  };

  return (
    <div className="space-y-6">
      {/* 3 Main Tabs Nav (with templates active) */}
      <AutomationTabsNav activeTab="templates" onTabChange={onTabChange} />

      {/* Main Container Card [1:23918] */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-6">
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F3F4F6]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#181d17]">قوالب واتساب المعتمدة</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#d8e8cb] text-[#34422a] border border-[#c6dcbe] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4b5940]" />
                Meta Cloud API معتمد وموثق
              </span>
            </div>
            <p className="text-xs text-[#454840] mt-1">
              إدارة وتخصيص قوالب رسائل WhatsApp الرسمية المعتمدة عبر Meta Cloud API للمنظومة المركزية.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Empty state debug toggle */}
            <button
              type="button"
              onClick={() => setForceEmpty(!forceEmpty)}
              className="px-3 py-2 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {forceEmpty ? "عرض القوالب (8)" : "معاينة حالة لا توجد قوالب"}
            </button>

            <Link
              href="/dashboard/automation/templates/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#4b5940] hover:bg-[#3d4934] text-white shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء قالب واتساب</span>
            </Link>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Categories Bar */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#34422a] text-white shadow-xs"
                    : "bg-[#FAFBF9] text-[#454840] hover:bg-gray-100"
                }`}
              >
                <span>{cat.label}</span>
                <span className="ms-1.5 text-[10px] opacity-80">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Search Input & Status filter */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="البحث في القوالب والرموز البرمجية..."
                className="w-full h-10 pr-10 pl-4 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4b5940] transition-colors"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 px-3 rounded-xl border border-gray-200 text-xs text-[#454840] bg-white focus:outline-none focus:border-[#4b5940] transition-colors"
            >
              <option value="all">كافة الحالات</option>
              <option value="active">مفعلة فقط</option>
              <option value="paused">متوقفة فقط</option>
              <option value="draft">مسودات</option>
            </select>
          </div>
        </div>

        {/* Templates Table / Empty State */}
        {filteredTemplates.length === 0 ? (
          /* Empty State [1:26523] */
          <div className="p-12 text-center rounded-3xl border border-dashed border-gray-200 bg-[#FAFBF9] space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#ebefe6] text-[#4b5940] flex items-center justify-center mx-auto">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-base font-bold text-[#181d17]">لا توجد قوالب واتساب</h3>
              <p className="text-xs text-[#454840] leading-relaxed">
                لم يتم العثور على أي قوالب تطابق معايير البحث المحددة أو لم تقم بإنشاء قوالب في هذا التصنيف بعد.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                  setForceEmpty(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                إعادة ضبط الفلاتر
              </button>
              <Link
                href="/dashboard/automation/templates/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#4b5940] text-white hover:bg-[#3d4934] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إنشاء قالب جديد</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Templates Table [1:23918] */
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-[#FAFBF9] border-b border-gray-100 text-[#454840] font-bold">
                  <th className="py-3.5 pr-4">اسم القالب والرمز</th>
                  <th className="py-3.5 px-3">التصنيف</th>
                  <th className="py-3.5 px-3">المحفز المرتبط</th>
                  <th className="py-3.5 px-3">اللغة والحقول</th>
                  <th className="py-3.5 px-3">الحالة والاعتماد</th>
                  <th className="py-3.5 px-3">آخر تعديل</th>
                  <th className="py-3.5 pl-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[#181d17]">
                {filteredTemplates.map((template) => (
                  <tr
                    key={template.id}
                    className="hover:bg-[#FAFBF9]/80 transition-colors group"
                  >
                    {/* Name & Code */}
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#ebefe6] text-[#4b5940] flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#181d17] group-hover:text-[#4b5940] transition-colors">
                            {template.title}
                          </div>
                          <div className="font-mono text-[11px] text-[#454840] mt-0.5">
                            {template.templateCode}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-3">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#ebefe6] text-[#34422a]">
                        {template.categoryLabel}
                      </span>
                    </td>

                    {/* Trigger */}
                    <td className="py-4 px-3">
                      <div className="text-xs text-[#181d17] font-medium">
                        {template.triggerLabel}
                      </div>
                    </td>

                    {/* Language & Variables */}
                    <td className="py-4 px-3">
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-[#181d17]">{template.language}</div>
                        <div className="text-[11px] text-gray-400">
                          {template.variables.length} حقول متغيرة
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-3">
                      {template.status === "active" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#d8e8cb] text-[#34422a]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4b5940]" />
                          معتمد نشط
                        </span>
                      ) : template.status === "paused" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          متوقف مؤقتاً
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
                          مسودة
                        </span>
                      )}
                    </td>

                    {/* Last Modified */}
                    <td className="py-4 px-3 text-[#454840]">
                      <div className="text-xs">{template.lastModifiedDate}</div>
                      <div className="text-[11px] text-gray-400">{template.lastModifiedAuthor}</div>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 pl-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Preview button */}
                        <button
                          type="button"
                          onClick={() => setPreviewTemplate(template)}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#ebefe6] text-[#454840] hover:text-[#34422a] flex items-center justify-center transition-colors"
                          title="معاينة الرسالة"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Pause or Activate button */}
                        {template.status === "active" ? (
                          <button
                            type="button"
                            onClick={() => setPauseTargetTemplate(template)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-amber-50 text-gray-600 hover:text-amber-700 flex items-center justify-center transition-colors"
                            title="إيقاف القالب"
                          >
                            <Pause className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleActivateTemplate(template)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 flex items-center justify-center transition-colors"
                            title="تفعيل القالب"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <PreviewTemplateModal
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          template={previewTemplate}
        />
      )}

      {/* Pause Modal */}
      {pauseTargetTemplate && (
        <PauseTemplateModal
          isOpen={!!pauseTargetTemplate}
          onClose={() => setPauseTargetTemplate(null)}
          onConfirm={handlePauseConfirm}
          templateCode={pauseTargetTemplate.templateCode}
          templateTitle={pauseTargetTemplate.title}
        />
      )}
    </div>
  );
}
