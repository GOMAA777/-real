export interface PickerPropertyRow {
  id: string;
  name: string;
  code: string;
  district: string;
  city: string;
  unitsCount: number;
  active: boolean;
}

export interface PickerOwnerRow {
  id: string;
  name: string;
  code: string;
  initials: string;
  propertiesCount: number;
  phone: string;
  active: boolean;
}

export const pickerProperties: PickerPropertyRow[] = [
  {
    id: "pr-1",
    name: "عمارة النخيل",
    code: "PR-1048",
    district: "حي العليا",
    city: "الرياض",
    unitsCount: 12,
    active: true,
  },
  {
    id: "pr-2",
    name: "مجمع الواحة السكني",
    code: "PR-1052",
    district: "حي الواحة",
    city: "جدة",
    unitsCount: 12,
    active: true,
  },
  {
    id: "pr-3",
    name: "مجمع الواحة السكني",
    code: "PR-1052",
    district: "حي الواحة",
    city: "جدة",
    unitsCount: 12,
    active: true,
  },
  {
    id: "pr-4",
    name: "مجمع الواحة السكني",
    code: "PR-1052",
    district: "حي الواحة",
    city: "جدة",
    unitsCount: 12,
    active: true,
  },
];

export const pickerOwners: PickerOwnerRow[] = [
  {
    id: "own-1",
    name: "محمد العتيبي",
    code: "OWN-4491",
    initials: "P",
    propertiesCount: 3,
    phone: "+966 50 123 4567",
    active: true,
  },
  {
    id: "own-2",
    name: "خالد الحربي",
    code: "OWN-3820",
    initials: "خ",
    propertiesCount: 2,
    phone: "+966 55 987 6543",
    active: true,
  },
  {
    id: "own-3",
    name: "سارة القحطاني",
    code: "OWN-5102",
    initials: "س",
    propertiesCount: 4,
    phone: "+966 54 321 0987",
    active: true,
  },
  {
    id: "own-4",
    name: "فهد السبيعي",
    code: "OWN-6219",
    initials: "ف",
    propertiesCount: 1,
    phone: "+966 56 443 2190",
    active: true,
  },
];
