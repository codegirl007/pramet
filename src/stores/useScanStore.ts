import create from "zustand";

export type DefectsData = {
	id: number;
	label: string;
	polygon: number[];
};

export type ScannedData = {
	defect_confirmation: null;
	defects: DefectsData[];
	id: number;
	img_path: null;
	model_version: string;
	number: number;
	part_code: string;
	series: number;
	timestamp: string;
};

export type AutomaticScanDefectRecord = {
	bbox: number[];
	id: number;
	label: string;
	polygon: number[];
};

export type AutomaticScanRecord = {
	defect_confirmation: null;
	defects: AutomaticScanDefectRecord[];
	id: number;
	model_version: string;
	number: number;
	series: number;
	timestamp: string;
};

export type AutomaticScanRecords = {
	records: AutomaticScanRecord[];
	total_count: number;
};

export type CalibrationData = {
	bb: number[];
	duration: number;
	focus: number;
	img_id: number;
};

export type ScanStore = {
	calibrationData: CalibrationData | null;
	scannedData: ScannedData | null;
	savedImgData: number | null;
	error: string;
	loaded: boolean;
	loadingName: string;
	imgVisible: boolean;
	records: AutomaticScanRecords | null;
	galleryImageId: number | null;
	snackBarVisible: boolean;
};

export const useStore = create<ScanStore>((set) => ({
	calibrationData: null,
	scannedData: null,
	error: "",
	savedImgData: null,
	loaded: false,
	loadingName: "",
	imgVisible: true,
	records: null,
	galleryImageId: null,
	snackBarVisible: false,
}));

export const scanStore = {
	resetRecordsToNull: (): void => {
		useStore.setState({ records: null });
	},
	resetSelectedImageToNull: (): void => {
		useStore.setState({ galleryImageId: null });
	},
	selectImage: (newId: number): void => {
		useStore.setState({ galleryImageId: newId });
	},
	showImg: (): void => {
		useStore.setState({ imgVisible: true });
	},
	hideImg: (): void => {
		useStore.setState({ imgVisible: false });
	},
	resetError: (): void => {
		useStore.setState({ error: "" });
	},
	resetSavedImgDataToNull: (): void => {
		useStore.setState({ savedImgData: null });
	},
	startLoading: (newLoadingName: string): void => {
		useStore.setState({ loaded: true, loadingName: newLoadingName });
	},
	stopLoading: (): void => {
		useStore.setState({ loaded: false });
	},
	showSnackBar: (): void => {
		useStore.setState({ snackBarVisible: true });
	},
	hideSnackBar: (): void => {
		useStore.setState({ snackBarVisible: false });
	},
	useStore,
};
