import { WhatsAppMessageItem } from "../types/whatsapp";

export const defaultWhatsAppMessages: WhatsAppMessageItem[] = [
  {
    id: "msg-1",
    messageId: "msg_wa_9948270812",
    recipientPhone: "+966 50 123 4567",
    templateName: "sa_booking_confirmed",
    language: "العربية (ar_SA)",
    title: "رسالة تأكيد الحجز الفوري",
    categoryBadge: "تأكيد الحجز",
    status: "read",
    statusText: "تمت القراءة",
    timestamp: "15 سبتمبر 2026 — 11:33 ص",
    bubbleText:
      "أهلاً خالد العتيبي، تم تأكيد حجزك في عمارة النخيل (الوحدة 204) من 18 إلى 21 سبتمبر. نتطلع لاستضافتك ونتمنى لك إقامة ممتعة..",
    previewBubbleText: {
      sender: "ابراج لإدارة العقارات والأصول",
      greeting: "مرحباً بك أخي خالد العتيبي،",
      body: "يسعدنا تأكيد حجزك في عمارة النخيل (الوحدة 204). نتطلع لاستضافتك ونتمنى لك إقامة مميزة.",
      validityNote: "فترة الإقامة: 18 سبتمبر 2026 إلى 21 سبتمبر 2026.",
      helpNote: "لأي استفسار بخصوص موقع العقار أو تسجيل الوصول يرجى الرد على هذه المحادثة.",
      time: "11:33 ص",
    },
    footerInfo: {
      template: "sa_booking_confirmed",
      leftNote: "Meta Cloud API • Twilio Gateway",
      leftIconType: "api",
    },
    timeline: [
      {
        title: "تم إنشاء الرسالة وإرسالها إلى Meta API",
        timestamp: "11:33:02 ص",
        subtext: "معالجة سريعة (Latency: 74ms)",
      },
      {
        title: "تم الإرسال بنجاح من خوادم WhatsApp",
        timestamp: "11:33:08 ص",
        subtext: "ACK 200 المستلم: OK",
      },
      {
        title: "تم التسليم لجهاز المستلم",
        timestamp: "11:33:15 ص",
        subtext: "الجهاز متصل بالإنترنت",
      },
      {
        title: "تمت القراءة بواسطة النزيل",
        timestamp: "11:34:02 ص",
        subtext: "فتح المحادثة عبر التطبيق",
      },
    ],
  },
  {
    id: "msg-2",
    messageId: "msg_wa_9948271049",
    recipientPhone: "+966 50 123 4567",
    templateName: "sa_checkin_instructions_v2",
    language: "العربية (ar_SA)",
    title: "رسالة بيانات الدخول والكود الذكي",
    categoryBadge: "بيانات الدخول",
    status: "delivered",
    statusText: "تم التسليم",
    timestamp: "18 سبتمبر 2026 — 02:00 م",
    bubbleText:
      "مرحباً بك! كود الدخول الخاص بك للوحدة 204 هو 8429#، صالح اعتباراً من اليوم 03:00 م. يرجى إدخال الرمز متبوعاً بعلامة (#)..",
    previewBubbleText: {
      sender: "ابراج لإدارة العقارات والأصول",
      greeting: "مرحباً بك أخي خالد العتيبي، يسعدنا وصولك المرتقب لعمارة النخيل (الوحدة 204).",
      body: "رمز الدخول الذكي للباب الرئيسي وباب الوحدة هو:",
      codeLabel: "رمز الدخول الذكي",
      codeValue: "8429#",
      validityNote: "صالح اعتباراً من اليوم 18 سبتمبر الساعة 03:00 عصراً.",
      helpNote: "لأي مساعدة يرجى الرد المباشر على هذه المحادثة.",
      time: "02:00 م",
    },
    footerInfo: {
      template: "sa_checkin_instructions_v2",
      leftNote: "قفل ذكي Yale Linus • مزامنة تلقائية",
      leftIconType: "lock",
    },
    timeline: [
      {
        title: "تم إنشاء الرسالة وإرسالها إلى Meta API",
        timestamp: "02:00:05 م",
        subtext: "معالجة سريعة (Latency: 82ms)",
      },
      {
        title: "تم الإرسال بنجاح من خوادم WhatsApp",
        timestamp: "02:00:12 م",
        subtext: "ACK 200 المستلم: OK",
      },
      {
        title: "تم التسليم لجهاز المستلم",
        timestamp: "02:00:24 م",
        subtext: "الجهاز متصل بالإنترنت",
      },
      {
        title: "تمت القراءة بواسطة النزيل",
        timestamp: "02:04:18 م",
        subtext: "فتح المحادثة عبر التطبيق",
      },
    ],
  },
  {
    id: "msg-3",
    messageId: "msg_wa_9948271288",
    recipientPhone: "+966 50 123 4567",
    templateName: "sa_cancellation_ack",
    language: "العربية (ar_SA)",
    title: "رسالة إشعار إلغاء الحجز",
    categoryBadge: "إشعار الإلغاء",
    status: "sent",
    statusText: "تم الإرسال",
    timestamp: "18 سبتمبر 2026 — 02:45 م",
    bubbleText:
      "نحيطكم علماً بأنه تم إلغاء الحجز BK-10482 بناءً على طلبكم، وسيتم معالجة الاسترداد المالي وفق السياسة المعتمدة خلال 3 أيام عمل..",
    previewBubbleText: {
      sender: "ابراج لإدارة العقارات والأصول",
      greeting: "عزيزي العميل،",
      body: "نحيطكم علماً بأنه تم إلغاء الحجز BK-10482 بناءً على طلبكم، وسيتم معالجة الاسترداد المالي وفق السياسة المعتمدة خلال 3 أيام عمل.",
      validityNote: "تم إلغاء صلاحية كود الدخول الذكي للوحدة تلقائياً.",
      helpNote: "فريق الدعم الفني جاهز للإجابة عن أي استفسار عبر المحادثة.",
      time: "02:45 م",
    },
    footerInfo: {
      template: "sa_cancellation_ack",
      leftNote: "معالجة آلية للعمليات المالية",
      leftIconType: "financial",
    },
    timeline: [
      {
        title: "تم إنشاء الرسالة وإرسالها إلى Meta API",
        timestamp: "02:45:01 م",
        subtext: "معالجة الطلب (Latency: 91ms)",
      },
      {
        title: "تم الإرسال بنجاح من خوادم WhatsApp",
        timestamp: "02:45:08 م",
        subtext: "ACK 200 المستلم: OK",
      },
      {
        title: "تم التسليم لجهاز المستلم",
        timestamp: "02:45:20 م",
        subtext: "تم تأكيد الاستلام لدى الشبكة",
      },
    ],
  },
  {
    id: "msg-4",
    messageId: "msg_wa_9948271420",
    recipientPhone: "+966 50 123 4567",
    templateName: "sa_checkout_reminder",
    language: "العربية (ar_SA)",
    title: "رسالة تذكير المغادرة وإجراءات الخروج",
    categoryBadge: "تذكير المغادرة",
    status: "cancelled_schedule",
    statusText: "تم إلغاء الجدولة آلياً",
    timestamp: "المجدول: 21 سبتمبر 2026 — 10:00 ص",
    bubbleText:
      "تذكير: موعد تسجيل المغادرة غداً الساعة 12:00 ظهراً. نرجو منكم التأكد من إغلاق النوافذ وإعادة المفتاح لمكانه المخصص..",
    previewBubbleText: {
      sender: "ابراج لإدارة العقارات والأصول",
      greeting: "أهلاً بك،",
      body: "تذكير بموعد تسجيل المغادرة غداً الساعة 12:00 ظهراً. نرجو منكم التأكد من إغلاق النوافذ وإعادة المفتاح لمكانه المخصص.",
      validityNote: "سيتم انتهاء صلاحية كود الدخول الساعة 12:30 ظهراً.",
      helpNote: "نتمنى لكم رحلة عودة آمنة ونتطلع لاستضافتكم مجدداً.",
      time: "10:00 ص",
    },
    footerInfo: {
      template: "sa_checkout_reminder",
      leftNote: "ألغيت تلقائياً بسبب إلغاء الحجز المرجعي",
      leftIconType: "info",
    },
    timeline: [
      {
        title: "تمت جدولة الرسالة آلياً في النظام",
        timestamp: "18 سبتمبر 2026 — 03:00 م",
        subtext: "جدولة مسبقة لموعد ما قبل الخروج بـ 24 ساعة",
      },
      {
        title: "تم إلغاء الجدولة آلياً",
        timestamp: "18 سبتمبر 2026 — 02:45 م",
        subtext: "بسبب إلغاء الحجز المرجعي رقم BK-10482",
      },
    ],
  },
  {
    id: "msg-5",
    messageId: "msg_wa_9948270500",
    recipientPhone: "+966 50 123 4567",
    templateName: "sa_feedback_survey",
    language: "العربية (ar_SA)",
    title: "رسالة استبيان تقييم الإقامة وتجربة النزيل",
    categoryBadge: "تقييم الإقامة",
    status: "failed",
    statusText: "فشل الإرسال",
    timestamp: "16 سبتمبر 2026 — 04:15 م",
    bubbleText:
      "شاركنا رأيك في إقامتك! تقييمك يساعدنا على تقديم أفضل تجربة ضيافة ممكنة..",
    previewBubbleText: {
      sender: "ابراج لإدارة العقارات والأصول",
      greeting: "مرحباً بك،",
      body: "يسعدنا معرفة تقييمكم للإقامة ومستوى الخدمات المقدمة. رأيكم يهمنا لتطوير تجارب الضيافة.",
      validityNote: "الرابط صالح لمدة 7 أيام.",
      helpNote: "شكراً لاختياركم منصة أبراج.",
      time: "04:15 م",
    },
    footerInfo: {
      template: "sa_feedback_survey",
      leftNote: "خطأ استجابة المزود 429",
      leftIconType: "info",
    },
    errorReason:
      "سبب الفشل: خطأ في استجابة الخادم 429 - تجاوز حد المحاولات المؤقت عبر بوابة مزود الرسائل (Rate Limit Exceeded).",
    timeline: [
      {
        title: "محاولة إرسال الرسالة إلى مزود WhatsApp",
        timestamp: "04:15:02 م",
        subtext: "POST /v18.0/messages (Twilio/Meta)",
      },
      {
        title: "استجابة الخطأ من الخادم 429",
        timestamp: "04:15:05 م",
        subtext: "Rate limit exceeded. Temporary backoff required.",
      },
    ],
  },
];
