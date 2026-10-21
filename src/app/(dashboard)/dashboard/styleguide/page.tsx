"use client";

import React, { useState } from "react";
import {
  Wand2,
  Shapes,
  Tag,
  Trash2,
  Pencil,
  Search,
  Home,
  User,
  Check,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  CircleIconButton,
  SquareIconButton,
  IconLabelButton,
  DesignSystemSearchInput,
  FloatingNavPillBar,
  DesignSystemAccentBars,
} from "@/components/shared/design-system-elements";

export default function StyleguidePage() {
  const [activeNavId, setActiveNavId] = useState("home");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    toast.success(`تم نسخ لون ${label} (${hex})`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const navItems = [
    { id: "home", icon: Home, label: "الرئيسية" },
    { id: "search", icon: Search, label: "البحث" },
    { id: "user", icon: User, label: "الحساب" },
  ];

  return (
    <div className="space-y-8 font-cairo max-w-7xl mx-auto pb-16" dir="rtl">
      {/* Page Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCE2D7] shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252A24] tracking-tight">
          دليل الهوية البصرية ونظام التصميم (Design System)
        </h1>
        <p className="text-xs sm:text-sm text-[#687163] mt-1.5 leading-relaxed">
          تطبيق الألوان الأساسية، الخطوط، وتشكيلة الأيقونات المعتمدة لكافة واجهات منصة أبراج لإدارة الأملاك.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* THE MASTER DESIGN SYSTEM CANVAS (Matches the user's reference image exactly) */}
      {/* ========================================================================= */}
      <div className="bg-[#EFF2EB] p-6 sm:p-10 rounded-[32px] border-2 border-[#DCE2D7] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* COLUMN 1: COLOR PALETTES */}
          <div className="space-y-4">
            {/* 1. Primary Swatch Card */}
            <div className="bg-[#4B5940] text-white p-5 rounded-3xl shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm tracking-wide">Primary</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard("#4B5940", "Primary")}
                  className="px-2 py-0.5 rounded-md bg-white/20 hover:bg-white/30 text-xs font-mono font-bold flex items-center gap-1 transition-all"
                >
                  <span>#4B5940</span>
                  {copiedColor === "#4B5940" ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white/80" />}
                </button>
              </div>
              {/* Tonal Ramp */}
              <div className="grid grid-cols-10 h-7 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-[#171D14]" />
                <div className="bg-[#222B1E]" />
                <div className="bg-[#303A2C]" />
                <div className="bg-[#3E4A35]" />
                <div className="bg-[#4B5940]" />
                <div className="bg-[#627355]" />
                <div className="bg-[#809272]" />
                <div className="bg-[#A4B697]" />
                <div className="bg-[#CBD7C1]" />
                <div className="bg-[#F2F6EF]" />
              </div>
            </div>

            {/* 2. Secondary Swatch Card */}
            <div className="bg-[#C9B99A] text-[#252A24] p-5 rounded-3xl shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm tracking-wide">Secondary</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard("#C9B99A", "Secondary")}
                  className="px-2 py-0.5 rounded-md bg-black/10 hover:bg-black/20 text-xs font-mono font-bold flex items-center gap-1 transition-all"
                >
                  <span>#C9B99A</span>
                  {copiedColor === "#C9B99A" ? <Check className="w-3 h-3 text-[#252A24]" /> : <Copy className="w-3 h-3 text-[#252A24]/80" />}
                </button>
              </div>
              {/* Tonal Ramp */}
              <div className="grid grid-cols-10 h-7 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-[#3C3224]" />
                <div className="bg-[#564733]" />
                <div className="bg-[#7A684C]" />
                <div className="bg-[#9E8664]" />
                <div className="bg-[#B8A381]" />
                <div className="bg-[#C9B99A]" />
                <div className="bg-[#D8CCA5]" />
                <div className="bg-[#E7DFCE]" />
                <div className="bg-[#F3EFE7]" />
                <div className="bg-[#FAF8F3]" />
              </div>
            </div>

            {/* 3. Tertiary Swatch Card */}
            <div className="bg-[#303A2C] text-white p-5 rounded-3xl shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm tracking-wide">Tertiary</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard("#303A2C", "Tertiary")}
                  className="px-2 py-0.5 rounded-md bg-white/20 hover:bg-white/30 text-xs font-mono font-bold flex items-center gap-1 transition-all"
                >
                  <span>#303A2C</span>
                  {copiedColor === "#303A2C" ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white/80" />}
                </button>
              </div>
              {/* Tonal Ramp */}
              <div className="grid grid-cols-10 h-7 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-[#141812]" />
                <div className="bg-[#1D241B]" />
                <div className="bg-[#273024]" />
                <div className="bg-[#303A2C]" />
                <div className="bg-[#42503D]" />
                <div className="bg-[#596A53]" />
                <div className="bg-[#75876F]" />
                <div className="bg-[#99A993]" />
                <div className="bg-[#C3CEBE]" />
                <div className="bg-[#F1F4EF]" />
              </div>
            </div>

            {/* 4. Neutral Swatch Card */}
            <div className="bg-[#252A24] text-white p-5 rounded-3xl shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm tracking-wide">Neutral</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard("#252A24", "Neutral")}
                  className="px-2 py-0.5 rounded-md bg-white/20 hover:bg-white/30 text-xs font-mono font-bold flex items-center gap-1 transition-all"
                >
                  <span>#252A24</span>
                  {copiedColor === "#252A24" ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white/80" />}
                </button>
              </div>
              {/* Tonal Ramp */}
              <div className="grid grid-cols-10 h-7 rounded-xl overflow-hidden shadow-2xs">
                <div className="bg-[#131612]" />
                <div className="bg-[#1C201B]" />
                <div className="bg-[#252A24]" />
                <div className="bg-[#3E443C]" />
                <div className="bg-[#586055]" />
                <div className="bg-[#727C6E]" />
                <div className="bg-[#939D8F]" />
                <div className="bg-[#B6BFB2]" />
                <div className="bg-[#DCE2D7]" />
                <div className="bg-[#F7F9F5]" />
              </div>
            </div>
          </div>

          {/* COLUMN 2: TYPOGRAPHY CARDS (Headline, Body, Label) */}
          <div className="space-y-4">
            {/* Headline Card */}
            <div className="bg-[#F7F9F5] p-6 rounded-3xl border border-[#DCE2D7] shadow-xs flex flex-col justify-between h-[152px]">
              <div className="flex items-center justify-between text-xs text-[#687163] font-semibold">
                <span>Headline</span>
                <span>Cairo</span>
              </div>
              <div className="text-5xl font-black text-[#252A24] tracking-tight">
                Aa
              </div>
            </div>

            {/* Body Card */}
            <div className="bg-[#F7F9F5] p-6 rounded-3xl border border-[#DCE2D7] shadow-xs flex flex-col justify-between h-[152px]">
              <div className="flex items-center justify-between text-xs text-[#687163] font-semibold">
                <span>Body</span>
                <span>Cairo</span>
              </div>
              <div className="text-5xl font-normal text-[#252A24] tracking-tight">
                Aa
              </div>
            </div>

            {/* Label Card */}
            <div className="bg-[#F7F9F5] p-6 rounded-3xl border border-[#DCE2D7] shadow-xs flex flex-col justify-between h-[152px]">
              <div className="flex items-center justify-between text-xs text-[#687163] font-semibold">
                <span>Label</span>
                <span>Cairo</span>
              </div>
              <div className="text-5xl font-semibold text-[#252A24] tracking-tight">
                Aa
              </div>
            </div>
          </div>

          {/* COLUMN 3: BUTTONS & ACCENT BARS */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Button Variants Card */}
            <div className="bg-[#F7F9F5] p-6 rounded-3xl border border-[#DCE2D7] shadow-xs space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="inverted">Inverted</Button>
                <Button variant="outline">Outlined</Button>
              </div>
            </div>

            {/* Accent Bars Card */}
            <div className="bg-[#F7F9F5] p-6 rounded-3xl border border-[#DCE2D7] shadow-xs flex flex-col justify-center h-[152px]">
              <DesignSystemAccentBars />
            </div>

            {/* Icon + Pill Buttons */}
            <div className="bg-[#F7F9F5] p-6 rounded-3xl border border-[#DCE2D7] shadow-xs flex items-center justify-around h-[152px]">
              {/* Square Rounded Icon Button (Pencil) */}
              <SquareIconButton icon={Pencil} />
              {/* Icon Label Button (Pencil + Label) */}
              <IconLabelButton icon={Pencil} label="Label" />
            </div>
          </div>

          {/* COLUMN 4: SEARCH, FLOATING PILL NAV & CIRCULAR ACTION ICONS */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Search Input Card */}
            <div className="bg-[#F7F9F5] p-6 rounded-3xl border border-[#DCE2D7] shadow-xs flex items-center justify-center h-[115px]">
              <DesignSystemSearchInput placeholder="Search" />
            </div>

            {/* Floating Nav Pill Card */}
            <div className="bg-[#F7F9F5] p-6 rounded-3xl border border-[#DCE2D7] shadow-xs flex items-center justify-center h-[152px]">
              <FloatingNavPillBar
                items={navItems}
                activeId={activeNavId}
                onSelect={(id) => setActiveNavId(id)}
              />
            </div>

            {/* The 4 Circular Icon Action Buttons (Magic, Shapes, Tag, Trash) */}
            <div className="bg-[#F7F9F5] p-6 rounded-3xl border border-[#DCE2D7] shadow-xs flex items-center justify-center gap-3 h-[152px]">
              <CircleIconButton
                variant="primary"
                icon={Wand2}
                title="Primary Action (Wand)"
              />
              <CircleIconButton
                variant="secondary"
                icon={Shapes}
                title="Secondary / Categories (Shapes)"
              />
              <CircleIconButton
                variant="tertiary"
                icon={Tag}
                title="Tertiary / Tag"
              />
              <CircleIconButton
                variant="destructive"
                icon={Trash2}
                title="Destructive / Trash"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
