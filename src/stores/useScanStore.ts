import create from "zustand";

export type TypeData = {
  bb: number[];
  focus: number;
  img_id: number;
};

export type SaveData = {
  img_id: number;
  img_path: string;
};

export type ScanStore = {
  data: TypeData | null;
  savedData: SaveData | null;
  scanned: boolean;
  error: string;
  imgId: number | null;
};

export const useScanStore = create<ScanStore>((set) => ({
  data: null,
  scanned: false,
  error: "",
  imgId: null,
  savedData: null,
}));
