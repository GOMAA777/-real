import { create } from "zustand";

export type TableDensity = "compact" | "normal" | "comfortable";
export type ThemeMode = "light" | "dark" | "system";

interface UIState {
  sidebarOpen: boolean;
  tableDensity: TableDensity;
  theme: ThemeMode;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTableDensity: (density: TableDensity) => void;
  setTheme: (theme: ThemeMode) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  tableDensity: "normal",
  theme: "system",
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setTableDensity: (density) => set({ tableDensity: density }),
  setTheme: (theme) => set({ theme }),
}));
