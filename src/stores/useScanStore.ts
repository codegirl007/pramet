import create from "zustand";

export type ScanStore = {
  data: { bb: number[]; focus: number; img_id: number } | null;
  scanned: boolean;
  error: string;
};

export const useScanStore = create<ScanStore>((set) => ({
  data: null,
  scanned: false,
  error: "",
}));
