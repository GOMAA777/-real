import { MainBookingItem } from "../types";

export const defaultMainBookings: MainBookingItem[] = [
  {
    id: "1",
    bookingCode: "BK-10482",
    guest: {
      name: "خالد العتيبي",
      phone: "+966 50 123 4567",
      avatarLetter: "خ",
    },
    propertyName: "عمارة النخيل (الرياض)",
    unit: {
      unitNumber: "وحدة 204",
      unitType: "استوديو فاخر",
    },
    checkIn: {
      date: "18 سبتمبر 2026",
      time: "تسجيل من 03:00 م",
    },
    checkOut: {
      date: "21 سبتمبر 2026",
      nights: "3 ليالٍ",
    },
    source: "Booking.com",
    amount: {
      total: "2,450 ر.س",
      paymentStatus: "مدفوع إلكترونياً",
    },
    status: "upcoming",
    statusLabel: "قادم",
  },
  {
    id: "2",
    bookingCode: "BK-10483",
    guest: {
      name: "سارة المنصور",
      phone: "+966 55 987 6543",
      avatarLetter: "س",
    },
    propertyName: "عمارة النخيل (الرياض)",
    unit: {
      unitNumber: "وحدة 102",
      unitType: "شقة غرفتين",
    },
    checkIn: {
      date: "16 سبتمبر 2026",
      time: "تسجيل من 02:00 م",
    },
    checkOut: {
      date: "20 سبتمبر 2026",
      nights: "4 ليالٍ",
    },
    source: "Booking.com",
    amount: {
      total: "3,800 ر.س",
      paymentStatus: "مدفوع إلكترونياً",
    },
    status: "active",
    statusLabel: "حالي",
  },
  {
    id: "3",
    bookingCode: "BK-10484",
    guest: {
      name: "عبدالله الشمري",
      phone: "+966 54 321 0987",
      avatarLetter: "ع",
    },
    propertyName: "أبراج العليا الفندقية",
    unit: {
      unitNumber: "وحدة 501",
      unitType: "جناح تنفيذي",
    },
    checkIn: {
      date: "17 سبتمبر 2026",
      time: "تسجيل من 04:00 م",
    },
    checkOut: {
      date: "22 سبتمبر 2026",
      nights: "5 ليالٍ",
    },
    source: "Airbnb",
    amount: {
      total: "5,200 ر.س",
      paymentStatus: "مدفوع إلكترونياً",
    },
    status: "active",
    statusLabel: "حالي",
  },
  {
    id: "4",
    bookingCode: "BK-10485",
    guest: {
      name: "فاطمة القحطاني",
      phone: "+966 56 456 7890",
      avatarLetter: "ف",
    },
    propertyName: "عمارة النخيل (الرياض)",
    unit: {
      unitNumber: "وحدة 305",
      unitType: "استوديو فاخر",
    },
    checkIn: {
      date: "10 سبتمبر 2026",
      time: "تسجيل من 03:00 م",
    },
    checkOut: {
      date: "14 سبتمبر 2026",
      nights: "4 ليالٍ",
    },
    source: "Booking.com",
    amount: {
      total: "2,900 ر.س",
      paymentStatus: "مدفوع إلكترونياً",
    },
    status: "completed",
    statusLabel: "منتهي",
  },
  {
    id: "5",
    bookingCode: "BK-10486",
    guest: {
      name: "محمد الدوسري",
      phone: "+966 50 888 9999",
      avatarLetter: "م",
    },
    propertyName: "مجمع الواحة السكني",
    unit: {
      unitNumber: "وحدة 108",
      unitType: "شقة فندقية",
    },
    checkIn: {
      date: "05 سبتمبر 2026",
      time: "تسجيل من 01:00 م",
    },
    checkOut: {
      date: "08 سبتمبر 2026",
      nights: "3 ليالٍ",
    },
    source: "مباشر",
    amount: {
      total: "1,950 ر.س",
      paymentStatus: "نقداً عند الوصول",
    },
    status: "completed",
    statusLabel: "منتهي",
  },
  {
    id: "6",
    bookingCode: "BK-10487",
    guest: {
      name: "نورة السبيعي",
      phone: "+966 53 111 2222",
      avatarLetter: "ن",
    },
    propertyName: "عمارة النخيل (الرياض)",
    unit: {
      unitNumber: "وحدة 204",
      unitType: "استوديو فاخر",
    },
    checkIn: {
      date: "12 سبتمبر 2026",
      time: "تسجيل من 03:00 م",
    },
    checkOut: {
      date: "15 سبتمبر 2026",
      nights: "3 ليالٍ",
    },
    source: "Booking.com",
    amount: {
      total: "2,450 ر.س",
      paymentStatus: "مسترد بالكامل",
    },
    status: "cancelled",
    statusLabel: "ملغى",
  },
];
