import create from "zustand";

export type ScanStore = {
	data: {id: number, url: string} | null;
	scanned: boolean;
  error: string;
}

export const useScanStore = create<ScanStore>((set) => ({
  data: null,
  scanned: false,
  error: ""
}));

