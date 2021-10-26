import create from "zustand";


type ScanStore = {
	data: any;
	scanned: boolean;
	fetch: (url: string) => Promise<void>;
}


export const useScanStore = create<ScanStore>((set) => ({
  data: [],
  scanned: false,
  fetch: async (url: string) => {
    const response = await fetch(url);
    set({ data: await response.json() });
  }
}));

