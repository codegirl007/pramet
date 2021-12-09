import { zoomStore } from "../stores/useZoomStore";

export const showZoomLabel = (): void => {
  zoomStore.showZoomLabel();
};

export const hideZoomLabel = (): void => {
  zoomStore.hideZoomLabel();
};
