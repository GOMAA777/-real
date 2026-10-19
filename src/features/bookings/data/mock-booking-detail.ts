import { BookingDetail } from "../types";

export const defaultBookingDetail: BookingDetail = {
  id: "bk-1048",
  bookingCode: "BK-1048",
  status: "active",
  statusText: "حالي ومؤكد",

  guest: {
    name: "خالد بن فهد العتيبي",
    initials: "خ.ع",
    verified: true,
    badgeText: "ضيف معتمد",
    phone: "+966 50 123 4567",
    email: "khaled.otb@example.com",
    nationality: "سعودي",
    idVerification: "إثبات الهوية موثق (أبشر)",
  },

  smartLock: {
    unitNumber: "204",
    pinCode: "582049",
    maskedCode: "••••••",
    scheduleText: "مبرمج ومجدول للتفعيل تلقائياً عند 03:00 م",
    connected: true,
  },

  stay: {
    checkInDate: "18 سبتمبر 2026",
    checkInTime: "03:00 مساءً (دخول ذاتي)",
    checkOutDate: "21 سبتمبر 2026",
    checkOutTime: "12:00 ظهراً",
    nightsCount: 3,
    guestsCount: 2,
    guestsDescription: "بالغين (إقامة عائلية)",
    cancellationPolicy: "شروط الإلغاء: إلغاء مرن مجاني حتى 48 ساعة قبل موعد تسجيل الوصول.",
  },

  assigned: {
    propertyName: "عمارة النخيل السكنية",
    propertyCode: "PR-1048",
    propertyLocation: "الرياض • حي العليا",
    propertyId: "1",
    ownerName: "محمد بن سعود العتيبي",
    ownerId: "1",
    falLicense: "1200028491",
    unitNumber: "204",
    unitTitle: "وحدة 204 — جناح تنفيذي فاخر",
    unitFloor: "الدور الثاني",
    unitView: "إطلالة أمامية على الشارع الرئيسي",
    unitSpecs: "غرفة نوم ماستر + صالة معيشة + مطبخ متكامل • نظام دخول ذكي متصل • إنترنت فائق السرعة",
    operationalStatus: "محجوزة تشغيلياً",
  },

  financial: {
    totalAmount: 2450.0,
    collectedAmount: 2450.0,
    remainingAmount: 0.0,
    currency: "ر.س",
    paymentStatus: "مدفوع بالكامل",
    baseStayRate: 650.0,
    baseStayNights: 3,
    baseStayTotal: 1950.0,
    cleaningFee: 180.0,
    vatAmount: 320.0,
    vatRate: 15,
    paymentMethod: "البطاقة الائتمانية عبر ...",
  },

  automation: {
    channelStatus: "قناة نشطة وموثقة",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "1. رسالة تأكيد الحجز والترحيب",
        description: "تم إرسال القسيمة وتفاصيل الحجز واللوكيشن إلى النزيل بنجاح",
        timestamp: "15 سبت • 11:33 ص",
        status: "completed",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "2. بيانات الدخول وكود القفل الإلكتروني",
        description: "مجدولة للإرسال التلقائي قبل موعد الوصول بـ 3 ساعات",
        timestamp: "18 سبت • 12:00 م",
        status: "scheduled",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "3. تذكير موعد المغادرة وتقييم الإقامة",
        description: "مجدولة للإرسال صباح يوم المغادرة لإتمام إجراءات الخروج الذاتي",
        timestamp: "21 سبت • 09:00 ص",
        status: "scheduled",
      },
    ],
  },

  activityLog: [
    {
      id: "act-1",
      title: "تحديث بيانات الحجز والربط المالي",
      timestamp: "15 سبتمبر 2026 • 11:35 ص",
    },
    {
      id: "act-2",
      title: "إرسال رسالة التأكيد عبر WhatsApp",
      timestamp: "15 سبتمبر 2026 • 11:33 ص",
    },
    {
      id: "act-3",
      title: "تعيين الوحدة 204 وتأكيد التوافر",
      timestamp: "15 سبتمبر 2026 • 11:32 ص",
    },
    {
      id: "act-4",
      title: "تم إنشاء الحجز عبر Whatsapp",
      timestamp: "15 سبتمبر 2026 • 11:32 ص • API Sync",
    },
  ],
};

export const cancelledBookingDetail: BookingDetail = {
  id: "bk-10482",
  bookingCode: "BK-10482",
  status: "cancelled",
  statusText: "ملغى",

  guest: {
    name: "خالد بن فهد العتيبي",
    initials: "خ.ع",
    verified: true,
    badgeText: "ضيف معتمد",
    phone: "+966 50 123 4567",
    email: "khaled.otb@example.com",
    nationality: "سعودي",
    idVerification: "إثبات الهوية موثق (أبشر)",
  },

  smartLock: {
    unitNumber: "204",
    pinCode: "582049",
    maskedCode: "••••••",
    scheduleText: "تم إلغاء التفعيل: 16 سبتمبر ▪ 02:45 م",
    connected: false,
  },

  stay: {
    checkInDate: "18 سبتمبر 2026",
    checkInTime: "03:00 مساءً",
    checkOutDate: "21 سبتمبر 2026",
    checkOutTime: "12:00 ظهراً",
    nightsCount: 3,
    guestsCount: 2,
    guestsDescription: "ضيوف بالغين (بدون مرافقين إضافيين)",
    cancellationPolicy: "سياسة الإلغاء المطبقة: مرنة (استرداد كامل)",
  },

  assigned: {
    propertyName: "عمارة النخيل السكنية",
    propertyCode: "PR-1048",
    propertyLocation: "الرياض • حي العليا",
    propertyId: "1",
    ownerName: "محمد بن سعود العتيبي",
    ownerId: "1",
    falLicense: "1200028491",
    unitNumber: "204",
    unitTitle: "وحدة 204 — جناح تنفيذي فاخر",
    unitFloor: "الدور الثاني",
    unitView: "إطلالة أمامية على الشارع الرئيسي",
    unitSpecs: "غرفة نوم ماستر + صالة معيشة + مطبخ متكامل • نظام دخول ذكي متصل • إنترنت فائق السرعة",
    operationalStatus: "محجوزة تشغيلياً",
  },

  financial: {
    totalAmount: 2450.0,
    collectedAmount: 2450.0,
    remainingAmount: 0.0,
    currency: "ر.س",
    paymentStatus: "قيد التسوية الآلية عبر القناة",
    baseStayRate: 700.0,
    baseStayNights: 3,
    baseStayTotal: 2100.0,
    cleaningFee: 150.0,
    vatAmount: 200.0,
    vatRate: 15,
    paymentMethod: "قيد التسوية الآلية عبر القناة",
  },

  automation: {
    channelStatus: "قناة نشطة وموثقة",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "1. رسالة تأكيد الحجز والترحيب",
        description: "تم إرسال القسيمة وتفاصيل الحجز واللوكيشن إلى النزيل بنجاح",
        timestamp: "15 سبت • 11:33 ص",
        status: "completed",
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "2. بيانات الدخول وكود القفل الإلكتروني",
        description: "مجدولة للإرسال التلقائي قبل موعد الوصول بـ 3 ساعات",
        timestamp: "18 سبت • 12:00 م",
        status: "scheduled",
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "3. إشعار تأكيد إلغاء الحجز",
        description: "تم إرسال إشعار الإلغاء الفوري للنزيل والمالك آلياً.",
        timestamp: "21 سبت • 09:00 ص",
        status: "scheduled",
      },
    ],
  },

  activityLog: [
    {
      id: "act-0",
      title: "تم إلغاء الحجز بواسطة مدير المنصة",
      timestamp: "15 سبتمبر 2026 • 11:35 ص",
    },
    {
      id: "act-1",
      title: "إرسال رسالة التأكيد عبر WhatsApp",
      timestamp: "15 سبتمبر 2026 • 11:33 ص",
    },
    {
      id: "act-2",
      title: "تعيين الوحدة 204 وتأكيد التوافر",
      timestamp: "15 سبتمبر 2026 • 11:32 ص",
    },
    {
      id: "act-3",
      title: "تم إنشاء الحجز عبر Whatsapp",
      timestamp: "15 سبتمبر 2026 • 11:32 ص • API Sync",
    },
  ],
};
