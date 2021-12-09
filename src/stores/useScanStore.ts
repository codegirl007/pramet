import create from "zustand";

export type PreviewCoordinatesData = {
  bb: number[];
  focus: number;
  img_id: number;
};

export type SavedImgData = {
  img_id: number;
  img_path: string;
};

export type ScanStore = {
  previewCoordinates: PreviewCoordinatesData | null;
  savedImgData: SavedImgData | null;
  rescanButtonVisible: boolean;
  error: string;
  scannedImgId: number | null;
  loaded: boolean;
  partTypeName: string;
  thickness: string;
  hash: string;
  imgVisible: boolean;
};

export const useStore = create<ScanStore>((set) => ({
  previewCoordinates: null,
  rescanButtonVisible: false,
  error: "",
  scannedImgId: null,
  savedImgData: null,
  loaded: false,
  partTypeName: "",
  thickness: "",
  hash: "",
  imgVisible: false,
}));

export const scanStore = {
  showImg: (): void => {
    useStore.setState({ imgVisible: true });
  },
  hideImg: (): void => {
    useStore.setState({ imgVisible: false });
  },
  showRescanButton: (): void => {
    useStore.setState({ rescanButtonVisible: true });
  },
  hideRescanButton: (): void => {
    useStore.setState({ rescanButtonVisible: false });
  },
  resetError: (): void => {
    useStore.setState({ error: "" });
  },
  resetScannedImgToNull: (): void => {
    useStore.setState({ scannedImgId: null });
  },
  resetSavedImgDataToNull: (): void => {
    useStore.setState({ savedImgData: null });
  },
  startLoading: (): void => {
    useStore.setState({ loaded: true });
  },
  stopLoading: (): void => {
    useStore.setState({ loaded: false });
  },
  setPartTypeName: (newPartTypeName: string): void => {
    useStore.setState({ partTypeName: newPartTypeName });
  },
  setThickness: (newThickness: string): void => {
    useStore.setState({ thickness: newThickness });
  },
  resetThickness: (): void => {
    useStore.setState({ thickness: "" });
  },
  setHash: (newHash: string): void => {
    useStore.setState({ hash: newHash });
  },
  useStore,
};
