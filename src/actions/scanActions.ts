import { scanStore } from "../stores/useScanStore";

export const selectImage = (id: number): void => {
	scanStore.resetError();
	scanStore.selectImage(id);
	scanStore.showImg();
};
