import { BookingActivityEvent, BookingActivitySummary } from "../types/activity";

export const defaultBookingActivitySummary: BookingActivitySummary = {
  bookingCode: "BK-10482",
  propertyName: "عمارة النخيل",
  unitNumber: "و-204",
  guestName: "خالد العتيبي",
  totalAmount: "2,450 ر.س",
  ownerName: "محمد العتيبي",
  totalEvents: 5,
  uniqueActors: 3,
  systemErrors: 0,
  integrityScore: "100% مطابق",
  propertyDetails: {
    name: "عمارة النخيل الفندقية",
    address: "حي النخيل، طريق الإمام سعود، الرياض",
    unitSpec: "وحدة 204 • جناح تنفيذي",
    image: "/properties/nakheel_hd.jpg",
    status: "عقار نشط",
  },
};

export const defaultBookingActivityEvents: BookingActivityEvent[] = [
  {
    id: "evt-1",
    title: "تم إلغاء الحجز ومعالجة الاسترداد",
    category: "cancellation",
    categoryBadge: "إلغاء إداري",
    categoryBadgeClass: "bg-[#FDF2F2] text-[#D9383A] border border-[#FECDCA]",
    timestamp: "18 سبتمبر 2026 — 02:45 م",
    actor: {
      name: "محمد أحمد",
      role: "مدير المنصة (لوحة الإدارة المركزية)",
      initials: "م",
      type: "admin",
    },
    description:
      'سبب الإلغاء: "طلب العميل المباشر". تم تحرير الوحدة 204 وإعادة إدراجها شاغرة في التقويم الموحّد، إلغاء صلاحية كود الدخول الذكي للباب رقم #4820، وبدء إجراءات التسوية المالية واسترداد المبلغ عبر بوابة الدفع.',
    timelineIconType: "cancel",
    footerLeft: {
      text: "AUTH_CANCEL_REQ #REF-8849",
      iconType: "auth",
    },
    footerRight: {
      text: "الأثر المالي: استرداد 2,450 ر.س",
      iconType: "financial",
    },
  },
  {
    id: "evt-2",
    title: "تم تعديل وقت الوصول المجدول",
    category: "dates",
    categoryBadge: "تعديل بيانات",
    categoryBadgeClass: "bg-[#EFF4EA] text-[#4E5D49] border border-[#DEE7D7]",
    timestamp: "16 سبتمبر 2026 — 04:15 م",
    actor: {
      name: "محمد أحمد",
      role: "مدير المنصة",
      initials: "م",
      type: "admin",
    },
    description:
      "تعديل موعد تسجيل الدخول من 03:00 م إلى 02:00 م تلبية لطلب النزيل المسبق عبر المحادثة المباشرة، وتحديث موعد تفعيل الكود الرقمي ومواعيد تنظيف الوحدة وفقاً لذلك.",
    timelineIconType: "clock",
  },
  {
    id: "evt-3",
    title: "تم إرسال رسالة تأكيد الحجز",
    category: "messages",
    categoryBadge: "أتمتة ورسائل",
    categoryBadgeClass: "bg-[#EFF4EA] text-[#2E7D32] border border-[#DEE7D7]",
    timestamp: "15 سبتمبر 2026 — 11:33 ص",
    actor: {
      name: "النظام المؤتمت",
      role: "WhatsApp Business API Webhook",
      initials: "BOT",
      type: "system",
    },
    description:
      "تم تسليم وقراءة الرسالة بنجاح للرقم +966 50 123 4567. محتوى الرسالة تضمّن تفاصيل الحجز، رابط إحداثيات موقع عمارة النخيل على الخريطة، ودليل الإرشادات الفندقية.",
    timelineIconType: "message",
    footerLeft: {
      text: "MSG_ID: wa-99201948",
      iconType: "id",
    },
    footerRight: {
      text: "الحالة: قُرئت (11:34 ص)",
      iconType: "read",
    },
  },
  {
    id: "evt-4",
    title: "تم تعيين وتثبيت الوحدة 204",
    category: "assignment",
    categoryBadge: "تعيين وإسناد",
    categoryBadgeClass: "bg-[#EFF4EA] text-[#4E5D49] border border-[#DEE7D7]",
    timestamp: "15 سبتمبر 2026 — 11:32 ص",
    actor: {
      name: "محمد العتيبي",
      role: "مالك العقار (من بوابة المالك)",
      initials: "ع",
      type: "owner",
    },
    description:
      'تحديد الوحدة المخصصة "جناح تنفيذي رقم 204" وتأكيد حجب التوافر تلقائياً في التقويم السحابي لمنع التعارض مع القنوات الأخرى (iCal Sync).',
    timelineIconType: "unit",
    footerRight: {
      text: "تم تحديث مؤشر الإشغال في عمارة النخيل إلى 84%",
      iconType: "check",
    },
  },
  {
    id: "evt-5",
    title: "تم إنشاء الحجز وتأكيد الدفع الإلكتروني",
    category: "assignment",
    categoryBadge: "إنشاء حجز",
    categoryBadgeClass: "bg-[#EFF4EA] text-[#2E7D32] border border-[#DEE7D7]",
    timestamp: "15 سبتمبر 2026 — 11:30 ص",
    actor: {
      name: "نظام المنصة",
      role: "تكامل whatsapp.com",
      initials: "API",
      type: "system",
    },
    description:
      "إنشاء الحجز برقم مرجعي خارجي BC-992384102 بقيمة إجمالية قدرها 2,450 ر.س لـ 3 ليال (من 18 إلى 21 سبتمبر 2026). تأكيد الدفع عبر بوابة Mada/Visa المعتمدة، واحتساب رسوم الوساطة النظامية.",
    timelineIconType: "create",
    footerPills: [
      {
        text: "بوابة الدفع: بنك الراجحي - دفع مؤكد",
        iconType: "shield",
      },
      {
        text: "فاتورة ضريبية مبسطة رقم #INV-2048",
        iconType: "bill",
      },
    ],
  },
];
