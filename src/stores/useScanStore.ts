import create from "zustand";

type ScanStore = {
	data: {id: number, url: string} | null;
	scanned: boolean;
  error: string;
	fetch: (url: string) => Promise<void>;
}


export const useScanStore = create<ScanStore>((set) => ({
  data: null,
  scanned: false,
  error: "",
  fetch: async (url: string) => {    
    const response = await fetch(url);    
      set({ data: await response.json() });    
  } 
}));

