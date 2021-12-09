import create from "zustand";

export type PositionStore = {
  x: number;
  y: number;
  scale: number;
};

export const useStore = create<PositionStore>((set) => ({
  x: 0,
  y: 0,
  scale: 1,
}));

export const positionStore = {
  setPosition: (newX: number, newY: number, newScale: number): void => {
    useStore.setState({ x: newX, y: newY, scale: newScale });
  },
  setDefaultPosition: (): void => {
    useStore.setState({ x: 0, y: 0, scale: 1 });
  },
  useStore,
};
