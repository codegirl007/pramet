import { scanStore } from "../stores/useScanStore";
import { fetchData, postData, saveData } from "./fetchDataActions";

export const changePartType = (): void => {
  scanStore.resetScannedImgToNull();
  scanStore.resetError();
  scanStore.hideRescanButton();
  scanStore.startLoading();
  fetchData("findbb");
};

export const handleScan = (): void => {
  const previewCoordinates = scanStore.useStore.getState().previewCoordinates;
  scanStore.startLoading();
  if (previewCoordinates) {
    postData(previewCoordinates, "scan");
  }
  scanStore.resetError();
  scanStore.showRescanButton();
};

export const handleSave = (): void => {
  const partTypeName = scanStore.useStore.getState().partTypeName;
  if (partTypeName) {
    saveData(partTypeName, "save");
  }
  scanStore.resetError();
  scanStore.hideRescanButton();
};
