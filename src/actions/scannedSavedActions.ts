import { positionStore } from "../stores/usePositionStore";
import { scanStore } from "../stores/useScanStore";
import { fetchData, postData, saveData } from "./fetchDataActions";

export const changePartType = (): void => {
  scanStore.hideImg();
  scanStore.resetScannedImgToNull();
  scanStore.resetSavedImgDataToNull();
  scanStore.resetError();
  scanStore.hideRescanButton();
  scanStore.startLoading();
  positionStore.setDefaultPosition();
  fetchData("findbb");
};

export const handleScan = (): void => {
  scanStore.hideImg();
  const previewCoordinates = scanStore.useStore.getState().previewCoordinates;
  scanStore.startLoading();
  if (previewCoordinates) {
    postData(previewCoordinates, "scan");
  }
  scanStore.resetError();
  scanStore.showRescanButton();
  scanStore.resetSavedImgDataToNull();
};

export const handleSave = (): void => {
  const partTypeName = scanStore.useStore.getState().partTypeName;
  if (partTypeName) {
    saveData(partTypeName, "save");
  }
  scanStore.resetError();
  scanStore.hideRescanButton();
};
