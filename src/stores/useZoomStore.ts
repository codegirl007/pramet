import create from "zustand";

export type ZoomStore = {
  zoomLabelVisible: boolean;
};

export const useStore = create<ZoomStore>((set) => ({
  zoomLabelVisible: false,
}));

export const zoomStore = {
  showZoomLabel: (): void => {
    useStore.setState({ zoomLabelVisible: true });
  },
  hideZoomLabel: (): void => {
    useStore.setState({ zoomLabelVisible: false });
  },
  useStore,
};
