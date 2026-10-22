import {
  Home,
  LayoutGrid,
  Users2,
  Building2,
  CalendarDays,
  Wrench,
  Zap,
  MessageSquare,
  Users,
  Receipt,
  BarChart3,
  SlidersHorizontal,
  UserCircle2,
  Sparkles,
  History,
  FileText,
  LucideIcon,
} from "lucide-react";

export interface RouteMeta {
  title: string;
  icon?: LucideIcon;
  badge?: string;
}

// Static segment translations
export const STATIC_SEGMENT_TITLES: Record<string, RouteMeta> = {
  dashboard: { title: "الرئيسية", icon: LayoutGrid },
  owners: { title: "أصحاب العقارات", icon: Users2 },
  properties: { title: "العقارات", icon: Building2 },
  units: { title: "الوحدات السكنية", icon: Home },
  bookings: { title: "الحجوزات", icon: CalendarDays },
  operations: { title: "العمليات والتشغيل", icon: Wrench },
  cleaning: { title: "مهام التنظيف", icon: Sparkles },
  maintenance: { title: "بلاغات الصيانة", icon: Wrench },
  log: { title: "سجل التشغيل الكامل", icon: History },
  automation: { title: "الأتمتة والرسائل", icon: Zap },
  rules: { title: "قواعد الأتمتة", icon: SlidersHorizontal },
  templates: { title: "قوالب واتساب", icon: MessageSquare },
  logs: { title: "سجل التنفيذ التشغيلي", icon: History },
  team: { title: "فريق العمل", icon: Users },
  billing: { title: "الاشتراكات والفوترة", icon: Receipt },
  pricing: { title: "إعدادات التسعير وسعة الشقق", icon: SlidersHorizontal },
  reports: { title: "التقارير والإحصائيات", icon: BarChart3 },
  settings: { title: "الإعدادات العامة", icon: SlidersHorizontal },
  profile: { title: "الملف الشخصي", icon: UserCircle2 },
  guests: { title: "بيانات العميل", icon: Users },
  whatsapp: { title: "سجل رسائل WhatsApp", icon: MessageSquare },
  activity: { title: "سجل النشاط", icon: History },
  styleguide: { title: "دليل التصميم والمكونات", icon: SlidersHorizontal },
};

/**
 * Resolves the display title for a single route pathname
 */
export function resolveRouteTitle(pathname: string): { title: string; badge?: string } {
  const clean = (pathname || "").replace(/^\/Edaret_Amlak/, "").replace(/\/+$/, "") || "/";
  if (clean === "/" || clean === "/dashboard") {
    return { title: "الرئيسية" };
  }

  const segments = clean.split("/").filter(Boolean);
  // remove "dashboard" prefix from consideration
  const meaningful = segments.filter((s) => s !== "dashboard");

  if (meaningful.length === 0) {
    return { title: "الرئيسية" };
  }

  const lastSeg = meaningful[meaningful.length - 1];
  const prevSeg = meaningful.length > 1 ? meaningful[meaningful.length - 2] : "";

  // 1. Actions / Specific keywords
  if (lastSeg === "edit") {
    if (prevSeg === "rules") return { title: "تعديل قاعدة الأتمتة" };
    if (prevSeg === "bookings" || meaningful.includes("bookings")) return { title: "تعديل الحجز" };
    return { title: "تعديل" };
  }

  if (lastSeg === "new") {
    if (prevSeg === "properties") return { title: "إضافة عقار جديد" };
    if (prevSeg === "bookings") return { title: "إضافة حجز جديد" };
    if (prevSeg === "owners") return { title: "إضافة صاحب عقار" };
    if (prevSeg === "units") return { title: "إضافة وحدة جديدة" };
    if (prevSeg === "maintenance") return { title: "إنشاء بلاغ صيانة جديد" };
    if (prevSeg === "cleaning") return { title: "إنشاء مهمة تنظيف جديدة" };
    if (prevSeg === "rules") return { title: "إنشاء قاعدة أتمتة جديدة" };
    if (prevSeg === "templates") return { title: "إنشاء قالب واتساب جديد" };
    return { title: "إضافة جديد" };
  }

  if (lastSeg === "activity") {
    if (clean.includes("properties")) {
      return { title: "سجل أحداث العقار" };
    }
    return { title: "سجل نشاط الحجز" };
  }

  if (lastSeg === "whatsapp") {
    return { title: "سجل رسائل WhatsApp" };
  }

  if (lastSeg === "empty") {
    return { title: "قائمة الحجوزات (فارغة)" };
  }

  // 2. Known static dictionary
  if (STATIC_SEGMENT_TITLES[lastSeg]) {
    return { title: STATIC_SEGMENT_TITLES[lastSeg].title };
  }

  // 3. Dynamic IDs resolution based on parent section
  if (prevSeg === "properties") {
    return { title: "عمارة النخيل الفاخرة", badge: `#${lastSeg === "1" ? "014" : lastSeg}` };
  }
  if (prevSeg === "owners") {
    return { title: "محمد بن سالم العتيبي", badge: `#${lastSeg === "1" ? "PO-8821" : lastSeg}` };
  }
  if (prevSeg === "bookings") {
    return { title: "تفاصيل الحجز", badge: `#${lastSeg === "1" ? "BK-10482" : lastSeg}` };
  }
  if (prevSeg === "units") {
    return { title: "وحدة 204", badge: `#${lastSeg === "1" ? "U-204" : lastSeg}` };
  }
  if (prevSeg === "guests") {
    return { title: "خالد العتيبي", badge: `#${lastSeg === "1" ? "GUST-89324" : lastSeg}` };
  }
  if (prevSeg === "cleaning") {
    return { title: `مهمة تنظيف ${lastSeg}`, badge: `#${lastSeg}` };
  }
  if (prevSeg === "maintenance") {
    return { title: `بلاغ صيانة ${lastSeg}`, badge: `#${lastSeg}` };
  }
  if (prevSeg === "rules") {
    return { title: "تفاصيل قاعدة الأتمتة", badge: `#${lastSeg}` };
  }
  if (prevSeg === "templates") {
    return { title: "تفاصيل قالب واتساب", badge: `#${lastSeg}` };
  }
  if (prevSeg === "logs") {
    return { title: "تفاصيل سجل التنفيذ", badge: `#${lastSeg}` };
  }
  if (prevSeg === "billing") {
    return { title: "تفاصيل الاشتراك", badge: `#${lastSeg.startsWith("SUB-") ? lastSeg : `SUB-${lastSeg}`}` };
  }

  return { title: lastSeg };
}

export interface FallbackTrailItem {
  title: string;
  href: string;
  badge?: string;
}

/**
 * Builds a hierarchical fallback trail for a direct URL visit
 */
export function generateFallbackTrail(pathname: string): FallbackTrailItem[] {
  const clean = (pathname || "").replace(/^\/Edaret_Amlak/, "").replace(/\/+$/, "") || "/";
  if (clean === "/" || clean === "/dashboard") {
    return [{ title: "الرئيسية", href: "/dashboard" }];
  }

  const rawSegments = clean.split("/").filter(Boolean);
  const segments = rawSegments.filter((s) => s !== "dashboard");

  const trail: FallbackTrailItem[] = [
    { title: "الرئيسية", href: "/dashboard" },
  ];

  let accumulated = "/dashboard";
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    accumulated += `/${seg}`;
    const { title, badge } = resolveRouteTitle(accumulated);
    trail.push({
      title,
      href: accumulated,
      badge,
    });
  }

  return trail;
}
