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
  rescanButtonVisible: boolean;
  error: string;
  imgId: number | null;
  loaded: boolean;
};

export const useStore = create<ScanStore>((set) => ({
  data: null,
  rescanButtonVisible: false,
  error: "",
  imgId: null,
  savedData: null,
  loaded: false,
}));

export const scanStore = {
  showRescanButton: (): void => {
    useStore.setState({ rescanButtonVisible: true });
  },
  hideRescanButton: (): void => {
    useStore.setState({ rescanButtonVisible: false });
  },
  resetError: (): void => {
    useStore.setState({ error: "" });
  },
  resetImageToNull: (): void => {
    useStore.setState({ imgId: null });
  },
  setLoading: (): void => {
    useStore.setState({ loaded: true });
  },
  stopLoading: (): void => {
    useStore.setState({ loaded: false });
  },
  useStore,
};
