"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, Wrench } from "lucide-react";
import { OperationTask } from "../types";

interface OperationsTableProps {
  tasks: OperationTask[];
  onSelectTask?: (task: OperationTask) => void;
}

export function OperationsTable({ tasks, onSelectTask }: OperationsTableProps) {
  const getStatusBadge = (status: OperationTask["status"], label: string) => {
    switch (status) {
      case "needs_cleaning":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
            <span>{label}</span>
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span>{label}</span>
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
            <span>{label}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EBEBEB] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-[#F3F4F6] text-xs font-medium text-[#6B7280] bg-[#FAFBF9]">
              <th className="py-4 px-5">نوع العملية</th>
              <th className="py-4 px-5">رقم المهمة</th>
              <th className="py-4 px-5">الوحدة</th>
              <th className="py-4 px-5">العقار</th>
              <th className="py-4 px-5">المالك</th>
              <th className="py-4 px-5">تاريخ الإنشاء</th>
              <th className="py-4 px-5">الحالة</th>
              <th className="py-4 px-5">المسؤول</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6] text-sm">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-[#9CA3AF]">
                  لا توجد مهام أو بلاغات مطابقة لخيارات البحث الحالية
                </td>
              </tr>
            ) : (
              tasks.map((task) => {
                const isCleaning = task.type === "cleaning";
                const detailHref = isCleaning
                  ? `/dashboard/operations/cleaning/${task.id}`
                  : `/dashboard/operations/maintenance/${task.id}`;

                return (
                  <tr
                    key={task.id}
                    onClick={() => onSelectTask?.(task)}
                    className="hover:bg-[#F9FAF8] transition-colors cursor-pointer group"
                  >
                    {/* نوع العملية */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isCleaning
                              ? "bg-[#EAF3EA] text-[#1F3D2B]"
                              : "bg-[#F3F4F6] text-[#4B5563]"
                          }`}
                        >
                          {isCleaning ? (
                            <Sparkles className="w-4 h-4 text-[#1F3D2B]" />
                          ) : (
                            <Wrench className="w-4 h-4 text-[#4B5563]" />
                          )}
                        </div>
                        <span className="font-medium text-[#1F2937]">
                          {isCleaning ? "تنظيف" : "صيانة"}
                        </span>
                      </div>
                    </td>

                    {/* رقم المهمة */}
                    <td className="py-4 px-5">
                      <Link
                        href={detailHref}
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-[#1F2937] hover:text-[#1F3D2B] hover:underline"
                      >
                        {task.taskNumber}
                      </Link>
                    </td>

                    {/* الوحدة */}
                    <td className="py-4 px-5">
                      <div>
                        <p className="font-semibold text-[#1F2937]">{task.unitName}</p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{task.floor}</p>
                      </div>
                    </td>

                    {/* العقار */}
                    <td className="py-4 px-5">
                      <div>
                        <p className="font-medium text-[#374151]">{task.propertyName}</p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{task.city}</p>
                      </div>
                    </td>

                    {/* المالك */}
                    <td className="py-4 px-5">
                      <div>
                        <p className="font-medium text-[#374151]">{task.ownerName}</p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{task.ownerCode}</p>
                      </div>
                    </td>

                    {/* تاريخ الإنشاء */}
                    <td className="py-4 px-5 text-[#4B5563] whitespace-nowrap">
                      {task.createdAt}
                    </td>

                    {/* الحالة */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      {getStatusBadge(task.status, task.statusLabel)}
                    </td>

                    {/* المسؤول */}
                    <td className="py-4 px-5">
                      {task.assigneeCompany ? (
                        <div>
                          <p className="font-medium text-[#374151]">{task.assigneeName}</p>
                          <p className="text-xs text-[#9CA3AF] mt-0.5">
                            {task.assigneeCompany}
                          </p>
                        </div>
                      ) : (
                        <p
                          className={`font-medium ${
                            task.assigneeName?.includes("غير مسند")
                              ? "text-[#9CA3AF]"
                              : "text-[#374151]"
                          }`}
                        >
                          {task.assigneeName}
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer matching Figma 1:18788 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#F3F4F6] text-xs text-[#6B7280]">
        <div>
          <span>عرض 1 إلى 6 من أصل </span>
          <span className="font-bold text-[#1F2937]">842 حجز مسجل</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span>الصفوف لكل صفحة:</span>
            <span className="font-semibold text-[#1F2937] px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg">
              10 حجوزات
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
  );
}
