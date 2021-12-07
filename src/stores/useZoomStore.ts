import create from "zustand";

export  type Position = {
  x: number;
  y: number;
  scale: number;
};

export type ZoomStore = {
  zoomLabelVisible: boolean;
  position: Position;
};

export const useStore = create<ZoomStore>((set) => ({
  zoomLabelVisible: false,
  position: { x: 0, y: 0, scale: 1 },
}));

export const zoomStore = {
  showZoomLabel: (): void => {
    useStore.setState({ zoomLabelVisible: true });
  },
  hideZoomLabel: (): void => {
    useStore.setState({ zoomLabelVisible: false });
  },
  setPosition: (newPosition: Position): void => {
    useStore.setState({position: newPosition})
  },
  onSetDefaultPosition: (): void => {
    useStore.setState({position: { x: 0, y: 0, scale: 1 }});
  },
  useStore,
};
