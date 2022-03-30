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
  firstInputError: boolean;
  firstInputErrorMessage: string;
  secondInputError: boolean;
  secondInputErrorMessage: string;
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
  firstInputError: true,
  firstInputErrorMessage: "Type part type code name",
  secondInputError: true,
  secondInputErrorMessage: "Type number larger than 0",
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
  showFirstInputErrorMessage: (): void => {
    useStore.setState({ firstInputError: true });
    useStore.setState({ firstInputErrorMessage: "Type part type code name" });
  },
  showSecondInputErrorMessage: (): void => {
    useStore.setState({ secondInputError: true });
    useStore.setState({ secondInputErrorMessage: "Type number larger than 0" });
  },
  hideFirstInputErrorMessage: (): void => {
    useStore.setState({ firstInputError: false });
     useStore.setState({ firstInputErrorMessage: "" });
  },
  hideSecondInputErrorMessage: (): void => {
    useStore.setState({ secondInputError: false });
    useStore.setState({ secondInputErrorMessage: "" });
  },
  useStore,
};
