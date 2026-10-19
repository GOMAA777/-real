"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreVertical, ChevronRight, ChevronLeft, Eye, SlidersHorizontal, Building2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Owner, OwnerStatus } from "../types";
import { OwnersFilters } from "./owners-filters";
import {
  OwnersAdvancedFilterDrawer,
  type AdvancedFilterState,
} from "./owners-advanced-filter-drawer";
import { ActionDropdown } from "@/components/shared/action-dropdown";
import { TableDateCell } from "@/components/shared/table-date-cell";

const initialOwners: Owner[] = [
  {
    id: "1",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "2",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "3",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "pending",
  },
  {
    id: "4",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "5",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "inactive",
  },
  {
    id: "6",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "7",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "8",
    name: "خالد الحربي",
    initials: "خح",
    email: "k.harbi@investment.com",
    phone: "055 319 8241",
    propertiesCount: 1,
    unitsCount: 12,
    registrationDate: "15 سبتمبر 2026",
    relativeTime: "(أمس)",
    status: "active",
  },
  {
    id: "9",
    name: "سارة القحطاني",
    initials: "سق",
    email: "sara.q@holding.sa",
    phone: "054 991 3024",
    propertiesCount: 2,
    unitsCount: 28,
    registrationDate: "14 سبتمبر 2026",
    relativeTime: "14 سبتمبر",
    status: "pending",
  },
  {
    id: "10",
    name: "عبدالله المطيري",
    initials: "عم",
    email: "a.mutairi@properties.sa",
    phone: "056 120 4490",
    propertiesCount: 5,
    unitsCount: 60,
    registrationDate: "13 سبتمبر 2026",
    relativeTime: "13 سبتمبر",
    status: "active",
  },
  {
    id: "11",
    name: "فهد الدوسري",
    initials: "فد",
    email: "f.dossary@domain.sa",
    phone: "050 782 1190",
    propertiesCount: 4,
    unitsCount: 36,
    registrationDate: "12 سبتمبر 2026",
    relativeTime: "12 سبتمبر",
    status: "active",
  },
  {
    id: "12",
    name: "ريم الغامدي",
    initials: "رغ",
    email: "reem.g@realty.sa",
    phone: "053 440 8821",
    propertiesCount: 2,
    unitsCount: 18,
    registrationDate: "11 سبتمبر 2026",
    relativeTime: "11 سبتمبر",
    status: "inactive",
  },
  {
    id: "13",
    name: "سلطان الشهري",
    initials: "سش",
    email: "s.shehri@domain.sa",
    phone: "055 601 2234",
    propertiesCount: 3,
    unitsCount: 30,
    registrationDate: "10 سبتمبر 2026",
    relativeTime: "10 سبتمبر",
    status: "active",
  },
  {
    id: "14",
    name: "نورة الشمري",
    initials: "نش",
    email: "noura.sh@capital.sa",
    phone: "054 220 9811",
    propertiesCount: 1,
    unitsCount: 8,
    registrationDate: "09 سبتمبر 2026",
    relativeTime: "09 سبتمبر",
    status: "pending",
  },
  {
    id: "15",
    name: "تركي الزهراني",
    initials: "تز",
    email: "turki.z@domain.sa",
    phone: "056 312 7709",
    propertiesCount: 6,
    unitsCount: 72,
    registrationDate: "08 سبتمبر 2026",
    relativeTime: "08 سبتمبر",
    status: "active",
  },
  {
    id: "16",
    name: "فيصل السبيعي",
    initials: "فس",
    email: "faisal.s@domain.sa",
    phone: "050 119 4432",
    propertiesCount: 4,
    unitsCount: 48,
    registrationDate: "07 سبتمبر 2026",
    relativeTime: "07 سبتمبر",
    status: "active",
  },
  {
    id: "17",
    name: "هيا العنزي",
    initials: "هع",
    email: "haya.e@estates.sa",
    phone: "055 889 1200",
    propertiesCount: 2,
    unitsCount: 24,
    registrationDate: "06 سبتمبر 2026",
    relativeTime: "06 سبتمبر",
    status: "active",
  },
  {
    id: "18",
    name: "ماجد القرني",
    initials: "مق",
    email: "majed.q@realty.sa",
    phone: "054 771 9033",
    propertiesCount: 5,
    unitsCount: 55,
    registrationDate: "05 سبتمبر 2026",
    relativeTime: "05 سبتمبر",
    status: "pending",
  },
  {
    id: "19",
    name: "ليلى الغامدي",
    initials: "لغ",
    email: "layla.g@invest.sa",
    phone: "056 443 2187",
    propertiesCount: 3,
    unitsCount: 32,
    registrationDate: "04 سبتمبر 2026",
    relativeTime: "04 سبتمبر",
    status: "active",
  },
  {
    id: "20",
    name: "منصور العسيري",
    initials: "مع",
    email: "mansour.a@domain.sa",
    phone: "050 902 3341",
    propertiesCount: 2,
    unitsCount: 16,
    registrationDate: "03 سبتمبر 2026",
    relativeTime: "03 سبتمبر",
    status: "active",
  },
  {
    id: "21",
    name: "إبراهيم التميمي",
    initials: "إت",
    email: "ibrahim.t@capital.sa",
    phone: "053 661 8890",
    propertiesCount: 7,
    unitsCount: 84,
    registrationDate: "02 سبتمبر 2026",
    relativeTime: "02 سبتمبر",
    status: "active",
  },
  {
    id: "22",
    name: "مها الرشيدي",
    initials: "مر",
    email: "maha.r@properties.sa",
    phone: "055 224 5519",
    propertiesCount: 1,
    unitsCount: 6,
    registrationDate: "01 سبتمبر 2026",
    relativeTime: "01 سبتمبر",
    status: "inactive",
  },
  {
    id: "23",
    name: "زياد الخالدي",
    initials: "زخ",
    email: "ziad.k@holding.sa",
    phone: "054 810 4422",
    propertiesCount: 4,
    unitsCount: 50,
    registrationDate: "31 أغسطس 2026",
    relativeTime: "31 أغسطس",
    status: "active",
  },
  {
    id: "24",
    name: "هند البقمي",
    initials: "هب",
    email: "hind.b@realty.sa",
    phone: "056 990 1144",
    propertiesCount: 2,
    unitsCount: 20,
    registrationDate: "30 أغسطس 2026",
    relativeTime: "30 أغسطس",
    status: "pending",
  },
  {
    id: "25",
    name: "بدر السعد",
    initials: "بس",
    email: "bader.s@domain.sa",
    phone: "050 338 7711",
    propertiesCount: 3,
    unitsCount: 36,
    registrationDate: "29 أغسطس 2026",
    relativeTime: "29 أغسطس",
    status: "active",
  },
  {
    id: "26",
    name: "رغد الحربي",
    initials: "رح",
    email: "raghad.h@invest.sa",
    phone: "055 412 8899",
    propertiesCount: 1,
    unitsCount: 10,
    registrationDate: "28 أغسطس 2026",
    relativeTime: "28 أغسطس",
    status: "active",
  },
  {
    id: "27",
    name: "نايف القحطاني",
    initials: "نق",
    email: "naif.q@estates.sa",
    phone: "054 663 2277",
    propertiesCount: 5,
    unitsCount: 62,
    registrationDate: "27 أغسطس 2026",
    relativeTime: "27 أغسطس",
    status: "active",
  },
  {
    id: "28",
    name: "أمل الشريف",
    initials: "أش",
    email: "amal.sh@domain.sa",
    phone: "056 772 3388",
    propertiesCount: 2,
    unitsCount: 14,
    registrationDate: "26 أغسطس 2026",
    relativeTime: "26 أغسطس",
    status: "pending",
  },
  {
    id: "29",
    name: "مشعل المالكي",
    initials: "مم",
    email: "meshal.m@capital.sa",
    phone: "050 551 9900",
    propertiesCount: 6,
    unitsCount: 78,
    registrationDate: "25 أغسطس 2026",
    relativeTime: "25 أغسطس",
    status: "active",
  },
  {
    id: "30",
    name: "نوف الشهري",
    initials: "نش",
    email: "nouf.sh@properties.sa",
    phone: "053 118 7744",
    propertiesCount: 3,
    unitsCount: 28,
    registrationDate: "24 أغسطس 2026",
    relativeTime: "24 أغسطس",
    status: "active",
  },
  {
    id: "31",
    name: "طارق العتيبي",
    initials: "طع",
    email: "tariq.o@domain.sa",
    phone: "055 993 4411",
    propertiesCount: 4,
    unitsCount: 46,
    registrationDate: "23 أغسطس 2026",
    relativeTime: "23 أغسطس",
    status: "inactive",
  },
  {
    id: "32",
    name: "منى الصالح",
    initials: "مص",
    email: "mona.s@holding.sa",
    phone: "054 330 8855",
    propertiesCount: 2,
    unitsCount: 22,
    registrationDate: "22 أغسطس 2026",
    relativeTime: "22 أغسطس",
    status: "active",
  },
  {
    id: "33",
    name: "وليد الدوسري",
    initials: "ود",
    email: "waleed.d@invest.sa",
    phone: "056 881 2299",
    propertiesCount: 5,
    unitsCount: 58,
    registrationDate: "21 أغسطس 2026",
    relativeTime: "21 أغسطس",
    status: "active",
  },
  {
    id: "34",
    name: "حصة المطيري",
    initials: "حم",
    email: "hessa.m@realty.sa",
    phone: "050 227 6633",
    propertiesCount: 1,
    unitsCount: 8,
    registrationDate: "20 أغسطس 2026",
    relativeTime: "20 أغسطس",
    status: "pending",
  },
  {
    id: "35",
    name: "سلمان الزهراني",
    initials: "سز",
    email: "salman.z@estates.sa",
    phone: "053 774 1188",
    propertiesCount: 3,
    unitsCount: 34,
    registrationDate: "19 أغسطس 2026",
    relativeTime: "19 أغسطس",
    status: "active",
  },
  {
    id: "36",
    name: "جواهر القرني",
    initials: "جق",
    email: "jawaher.q@domain.sa",
    phone: "055 660 3322",
    propertiesCount: 2,
    unitsCount: 16,
    registrationDate: "18 أغسطس 2026",
    relativeTime: "18 أغسطس",
    status: "active",
  },
  {
    id: "37",
    name: "عادل السبيعي",
    initials: "عس",
    email: "adel.s@capital.sa",
    phone: "054 119 7766",
    propertiesCount: 7,
    unitsCount: 92,
    registrationDate: "17 أغسطس 2026",
    relativeTime: "17 أغسطس",
    status: "active",
  },
  {
    id: "38",
    name: "دلال الغامدي",
    initials: "دغ",
    email: "dalal.g@properties.sa",
    phone: "056 558 4400",
    propertiesCount: 3,
    unitsCount: 30,
    registrationDate: "16 أغسطس 2026",
    relativeTime: "16 أغسطس",
    status: "pending",
  },
  {
    id: "39",
    name: "ريان العسيري",
    initials: "رع",
    email: "rayan.a@domain.sa",
    phone: "050 884 1155",
    propertiesCount: 2,
    unitsCount: 26,
    registrationDate: "15 أغسطس 2026",
    relativeTime: "15 أغسطس",
    status: "active",
  },
  {
    id: "40",
    name: "هدى التميمي",
    initials: "هت",
    email: "huda.t@invest.sa",
    phone: "053 331 9922",
    propertiesCount: 4,
    unitsCount: 44,
    registrationDate: "14 أغسطس 2026",
    relativeTime: "14 أغسطس",
    status: "active",
  },
  {
    id: "41",
    name: "حمزة الرشيدي",
    initials: "حر",
    email: "hamza.r@realty.sa",
    phone: "055 770 2244",
    propertiesCount: 1,
    unitsCount: 12,
    registrationDate: "13 أغسطس 2026",
    relativeTime: "13 أغسطس",
    status: "inactive",
  },
  {
    id: "42",
    name: "رزان الخالدي",
    initials: "رخ",
    email: "razan.k@estates.sa",
    phone: "054 992 5533",
    propertiesCount: 3,
    unitsCount: 38,
    registrationDate: "12 أغسطس 2026",
    relativeTime: "12 أغسطس",
    status: "active",
  },
  {
    id: "43",
    name: "عمر البقمي",
    initials: "عب",
    email: "omar.b@domain.sa",
    phone: "056 220 8877",
    propertiesCount: 5,
    unitsCount: 66,
    registrationDate: "11 أغسطس 2026",
    relativeTime: "11 أغسطس",
    status: "active",
  },
  {
    id: "44",
    name: "ياسمين السعد",
    initials: "يس",
    email: "yasmin.s@capital.sa",
    phone: "050 663 4499",
    propertiesCount: 2,
    unitsCount: 18,
    registrationDate: "10 أغسطس 2026",
    relativeTime: "10 أغسطس",
    status: "pending",
  },
  {
    id: "45",
    name: "ثامر الحربي",
    initials: "ثح",
    email: "thamer.h@properties.sa",
    phone: "053 881 7700",
    propertiesCount: 6,
    unitsCount: 74,
    registrationDate: "09 أغسطس 2026",
    relativeTime: "09 أغسطس",
    status: "active",
  },
  {
    id: "46",
    name: "شروق القحطاني",
    initials: "شق",
    email: "shorouq.q@holding.sa",
    phone: "055 119 3388",
    propertiesCount: 3,
    unitsCount: 32,
    registrationDate: "08 أغسطس 2026",
    relativeTime: "08 أغسطس",
    status: "active",
  },
  {
    id: "47",
    name: "غازي الشريف",
    initials: "غش",
    email: "ghazi.sh@invest.sa",
    phone: "054 448 6611",
    propertiesCount: 2,
    unitsCount: 20,
    registrationDate: "07 أغسطس 2026",
    relativeTime: "07 أغسطس",
    status: "inactive",
  },
  {
    id: "48",
    name: "بشاير المالكي",
    initials: "بم",
    email: "bashayer.m@realty.sa",
    phone: "056 771 9933",
    propertiesCount: 4,
    unitsCount: 40,
    registrationDate: "06 أغسطس 2026",
    relativeTime: "06 أغسطس",
    status: "active",
  },
  {
    id: "49",
    name: "متعب الشهري",
    initials: "مش",
    email: "mutaib.sh@domain.sa",
    phone: "050 332 5588",
    propertiesCount: 5,
    unitsCount: 52,
    registrationDate: "05 أغسطس 2026",
    relativeTime: "05 أغسطس",
    status: "active",
  },
  {
    id: "50",
    name: "أسماء السبيعي",
    initials: "أس",
    email: "asmaa.s@estates.sa",
    phone: "053 994 2211",
    propertiesCount: 3,
    unitsCount: 36,
    registrationDate: "04 أغسطس 2026",
    relativeTime: "04 أغسطس",
    status: "active",
  },
];

export function OwnersTable() {
  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterState>({
    status: "all",
    propertiesRange: "all",
    minUnits: "",
    maxUnits: "",
    period: "all",
    startDate: "",
    endDate: "",
    sortBy: "date_desc",
  });

  const activeFiltersCount =
    (advancedFilters.status !== "all" ? 1 : 0) +
    (advancedFilters.propertiesRange !== "all" ? 1 : 0) +
    (advancedFilters.minUnits !== "" || advancedFilters.maxUnits !== "" ? 1 : 0) +
    (advancedFilters.startDate !== "" || advancedFilters.endDate !== "" || advancedFilters.period !== "all" ? 1 : 0) +
    (advancedFilters.sortBy !== "date_desc" ? 1 : 0);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setAdvancedFilters((prev) => ({ ...prev, status: newFilter }));
    setCurrentPage(1);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleApplyAdvancedFilters = (newFilters: AdvancedFilterState) => {
    setAdvancedFilters(newFilters);
    setFilter(newFilters.status);
    setCurrentPage(1);
  };

  const handleResetAdvancedFilters = () => {
    setAdvancedFilters({
      status: "all",
      propertiesRange: "all",
      minUnits: "",
      maxUnits: "",
      period: "all",
      startDate: "",
      endDate: "",
      sortBy: "date_desc",
    });
    setFilter("all");
    setCurrentPage(1);
  };

  const filteredOwners = initialOwners
    .filter((owner) => {
      // Status filter
      if (filter === "active" && owner.status !== "active") return false;
      if (filter === "pending" && owner.status !== "pending") return false;
      if (filter === "inactive" && owner.status !== "inactive") return false;

      // Properties range filter
      if (
        advancedFilters.propertiesRange === "1-2" &&
        (owner.propertiesCount < 1 || owner.propertiesCount > 2)
      )
        return false;
      if (
        advancedFilters.propertiesRange === "3-5" &&
        (owner.propertiesCount < 3 || owner.propertiesCount > 5)
      )
        return false;
      if (
        advancedFilters.propertiesRange === "6+" &&
        owner.propertiesCount < 6
      )
        return false;

      // Units range filter
      if (
        advancedFilters.minUnits &&
        owner.unitsCount < parseInt(advancedFilters.minUnits)
      )
        return false;
      if (
        advancedFilters.maxUnits &&
        owner.unitsCount > parseInt(advancedFilters.maxUnits)
      )
        return false;

      // Registration Period / Date Range filter
      if (advancedFilters.startDate || advancedFilters.endDate) {
        const arabicMonthMap: Record<string, string> = {
          يناير: "01",
          فبراير: "02",
          مارس: "03",
          أبريل: "04",
          مايو: "05",
          يونيو: "06",
          يوليو: "07",
          أغسطس: "08",
          سبتمبر: "09",
          أكتوبر: "10",
          نوفمبر: "11",
          ديسمبر: "12",
        };
        const parts = owner.registrationDate.trim().split(" ");
        if (parts.length === 3) {
          const day = parts[0].padStart(2, "0");
          const month = arabicMonthMap[parts[1]] || "01";
          const year = parts[2];
          const ownerIso = `${year}-${month}-${day}`;

          if (advancedFilters.startDate && ownerIso < advancedFilters.startDate)
            return false;
          if (advancedFilters.endDate && ownerIso > advancedFilters.endDate)
            return false;
        }
      } else if (advancedFilters.period !== "all") {
        if (
          advancedFilters.period === "today" &&
          !owner.relativeTime.includes("اليوم")
        )
          return false;
        if (
          advancedFilters.period === "september" &&
          !owner.registrationDate.includes("سبتمبر")
        )
          return false;
        if (
          advancedFilters.period === "august" &&
          !owner.registrationDate.includes("أغسطس")
        )
          return false;
      }

      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          owner.name.toLowerCase().includes(q) ||
          owner.phone.includes(q) ||
          owner.email.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (advancedFilters.sortBy === "date_asc") {
        return parseInt(a.id) - parseInt(b.id);
      }
      if (advancedFilters.sortBy === "properties_desc") {
        return b.propertiesCount - a.propertiesCount;
      }
      if (advancedFilters.sortBy === "units_desc") {
        return b.unitsCount - a.unitsCount;
      }
      return parseInt(b.id) - parseInt(a.id);
    });

  const totalHeadlineCount = 248; // Total from design specification
  const totalFiltered = filteredOwners.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));

  // Ensure currentPage doesn't exceed totalPages
  const activePage = Math.min(currentPage, totalPages);

  // Paginated slice based on dynamic pageSize (5, 10, or 50)
  const startIndex = (activePage - 1) * pageSize;
  const paginatedOwners = filteredOwners.slice(startIndex, startIndex + pageSize);

  const fromIndex = totalFiltered === 0 ? 0 : startIndex + 1;
  const toIndex = Math.min(startIndex + pageSize, totalFiltered);

  // Visible pages sliding window to prevent overflowing on small screens
  const getVisiblePages = (current: number, total: number) => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (current >= total - 2) {
      return [total - 4, total - 3, total - 2, total - 1, total];
    }
    return [current - 2, current - 1, current, current + 1, current + 2];
  };

  const visiblePages = getVisiblePages(activePage, totalPages);

  const counts = {
    all: initialOwners.length,
    active: initialOwners.filter((o) => o.status === "active").length,
    pending: initialOwners.filter((o) => o.status === "pending").length,
    inactive: initialOwners.filter((o) => o.status === "inactive").length,
  };

  const renderStatusBadge = (status: OwnerStatus) => {
    if (status === "active") {
      return (
        <span className="bg-[#E2F0D9] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
          <span>نشط</span>
        </span>
      );
    }
    if (status === "pending") {
      return (
        <span className="bg-[#FEF3C7] text-[#D97706] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
          <span>بانتظار المراجعة</span>
        </span>
      );
    }
    return (
      <span className="bg-[#F3F4F6] text-[#6B7280] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" />
        <span>غير نشط</span>
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search & Tabs Filter Bar */}
      <OwnersFilters
        currentFilter={filter}
        onFilterChange={handleFilterChange}
        searchQuery={search}
        onSearchChange={handleSearchChange}
        counts={counts}
        onOpenAdvancedFilter={() => setIsDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Advanced Filter Drawer (Opens from LEFT - opposite of the sidebar) */}
      <OwnersAdvancedFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={advancedFilters}
        onApplyFilters={handleApplyAdvancedFilters}
        onResetFilters={handleResetAdvancedFilters}
        totalResultsCount={filteredOwners.length}
      />

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-[#E2E6DC] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#EEF2E6] text-[#7D8A78] text-[11px] font-semibold bg-[#FAFCF8]/60">
                <th className="py-4 px-4 sm:px-6 text-start">مالك العقار</th>
                <th className="py-4 px-4 sm:px-6 text-center">رقم الجوال</th>
                <th className="py-4 px-4 sm:px-6 text-center">عدد العقارات</th>
                <th className="py-4 px-4 sm:px-6 text-center">عدد الوحدات</th>
                <th className="py-4 px-4 sm:px-6 text-center">تاريخ التسجيل</th>
                <th className="py-4 px-4 sm:px-6 text-center">الحالة</th>
                <th className="py-4 px-4 sm:px-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2E6]">
              {paginatedOwners.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#7D8A78]">
                    لا توجد نتائج تطابق معايير البحث
                  </td>
                </tr>
              ) : (
                paginatedOwners.map((owner) => (
                  <tr
                    key={owner.id}
                    onClick={() => router.push(`/dashboard/owners/${owner.id}`)}
                    className="hover:bg-[#F9FAF7] transition-colors group cursor-pointer"
                  >
                    {/* Owner Name & Avatar */}
                    <td className="py-4 px-4 sm:px-6 text-start">
                      <Link
                        href={`/dashboard/owners/${owner.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-3 group/link"
                      >
                        <div className="w-9 h-9 rounded-full bg-[#E2E6DC] text-[#34432E] font-bold text-xs flex items-center justify-center shrink-0">
                          {owner.initials}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#172115] group-hover/link:text-[#34432E] transition-colors">
                            {owner.name}
                          </div>
                          <div className="text-[11px] text-[#7D8A78]">
                            {owner.email}
                          </div>
                        </div>
                      </Link>
                    </td>

                    {/* Phone */}
                    <td className="py-4 px-4 sm:px-6 text-center font-medium text-[#2C3825] font-mono text-[11px]">
                      <span dir="ltr" className="inline-block">{owner.phone}</span>
                    </td>

                    {/* Properties Count */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <span className="font-bold text-[#172115]">
                        {owner.propertiesCount}
                      </span>{" "}
                      <span className="text-[#7D8A78]">عقارات</span>
                    </td>

                    {/* Units Count */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <span className="font-bold text-[#172115]">
                        {owner.unitsCount}
                      </span>{" "}
                      <span className="text-[#7D8A78]">وحدة</span>
                    </td>

                    {/* Registration Date */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <TableDateCell
                        date={owner.registrationDate}
                        relativeTime={owner.relativeTime}
                      />
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex justify-center">
                        {renderStatusBadge(owner.status)}
                      </div>
                    </td>

                    {/* Actions Menu */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <ActionDropdown
                        items={[
                          {
                            label: "عرض ملف المالك",
                            icon: Eye,
                            href: `/dashboard/owners/${owner.id}`,
                          },
                          {
                            label: "تعديل بيانات المالك",
                            icon: SlidersHorizontal,
                            onClick: () =>
                              toast.info(`تعديل بيانات المالك: ${owner.name}`),
                          },
                          {
                            label: "سجل العقارات والمحفظة",
                            icon: Building2,
                            href: `/dashboard/owners/${owner.id}`,
                          },
                          {
                            label: "تعطيل حساب المالك",
                            icon: Trash2,
                            variant: "destructive",
                            onClick: () =>
                              toast.error(`تم تعطيل حساب: ${owner.name}`),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 sm:px-6 border-t border-[#EEF2E6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D8A78]">
          {/* Right Side in RTL: Item Count & Page Size Selector */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 font-medium">
            <span>
              عرض {fromIndex}-{toIndex} من أصل {totalHeadlineCount} مالك عقار
            </span>

            <span className="hidden sm:inline-block w-px h-4 bg-[#CCD5C5]/70" />

            {/* Page Size Selector: 5 | 10 | 50 */}
            <div className="flex items-center gap-2">
              <span className="text-[#7D8A78]">عدد العرض:</span>
              <div className="inline-flex items-center rounded-xl border border-[#CCD5C5] bg-[#F4F6F0]/70 p-0.5 shadow-2xs">
                {[5, 10, 50].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handlePageSizeChange(size)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer select-none",
                      pageSize === size
                        ? "bg-[#34432E] text-white shadow-2xs"
                        : "text-[#2C3825] hover:text-[#172115] hover:bg-white/80"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Left Side in RTL: Pagination Controls: السابق -> 1 -> 2 -> ... -> التالي */}
          <div className="flex items-center gap-1.5" dir="ltr">
            {/* Previous Button (Leftmost) */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              className={cn(
                "px-3.5 py-1.5 rounded-xl border border-[#CCD5C5] text-[#2C3825] flex items-center gap-1.5 font-medium text-xs transition-colors shadow-2xs select-none",
                activePage === 1
                  ? "opacity-40 cursor-not-allowed bg-white"
                  : "hover:bg-[#F4F6F0] cursor-pointer bg-white"
              )}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>السابق</span>
            </button>

            {/* Dynamic Page Numbers */}
            {visiblePages.map((pageNum) => {
              const isActive = pageNum === activePage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    "w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all select-none",
                    isActive
                      ? "bg-[#34432E] text-white shadow-xs"
                      : "border border-[#CCD5C5] text-[#2C3825] hover:bg-[#F4F6F0] bg-white cursor-pointer shadow-2xs"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Button (Right) */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              className={cn(
                "px-3.5 py-1.5 rounded-xl border border-[#CCD5C5] text-[#2C3825] flex items-center gap-1.5 font-medium text-xs transition-colors shadow-2xs select-none",
                activePage === totalPages
                  ? "opacity-40 cursor-not-allowed bg-white"
                  : "hover:bg-[#F4F6F0] cursor-pointer bg-white"
              )}
            >
              <span>التالي</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
