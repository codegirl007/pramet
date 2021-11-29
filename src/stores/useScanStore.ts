import create from "zustand";

export type TypeData = {
  bb: number[]; 
  focus: number; 
  img_id: number
}

export type ScanStore = {
  data: TypeData | null;
  scanned: boolean;
  error: string;
  imgId: number | null;
};

export const useScanStore = create<ScanStore>((set) => ({
  data: null,
  scanned: false,
  error: "",
  imgId: null
}));
