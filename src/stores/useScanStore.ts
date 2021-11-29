import create from "zustand";

export type ScanData = {
  bb: number[]; 
  focus: number; 
  img_id: number
}

export type ScanStore = {
  data: ScanData | null;
  scanned: boolean;
  error: string;
};

export const useScanStore = create<ScanStore>((set) => ({
  data: null,
  scanned: false,
  error: "",
}));
