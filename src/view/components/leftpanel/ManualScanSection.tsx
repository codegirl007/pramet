import { Button } from "@mui/material";
import React, { ReactElement } from "react";
import { AppState } from "../../../App";
import { Constants } from "../../../model/Contants";
import { scanStore } from "../../../stores/useScanStore";
import { PanelContainer } from "../../styles/PanelContainer";

type Props = {
	appState?: AppState;
	handleRerender: () => void;
};

export const ManualScanSection = (props: Props): ReactElement => {
	const onScan = async (): Promise<void> => {
		scanStore.resetRecordsToNull();
		scanStore.hideImg();
		scanStore.resetError();
		scanStore.resetSavedImgDataToNull();
		scanStore.resetSelectedImageToNull();
		scanStore.startLoading("Scanning");
		try {
			const calibrationData = scanStore.useStore.getState().calibrationData;
			if (calibrationData) {
				const response = await fetch(`${Constants.SERVER_ENDPOINT}/controller/scan`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						bb: calibrationData.bb,
						focus: calibrationData.focus,
					}),
				});
				const responseJSON = await response.json();
				scanStore.useStore.setState({
					galleryImageId: responseJSON.id,
					imgVisible: true,
				});
				scanStore.stopLoading();
				if (!response.ok) {
					scanStore.useStore.setState({
						error: `Failed to get image with status ${response.status}. Please, try it again.`,
					});
					scanStore.stopLoading();
				}
				props.handleRerender();
			} else {
				scanStore.stopLoading();
				scanStore.useStore.setState({
					error: `Please, calibrate first.`,
				});
			}
			props.handleRerender();
		} catch (e) {
			console.log("Network Error ", e);
			scanStore.useStore.setState({ error: "Network Error" });
			scanStore.stopLoading();
		}
	};

	return (
		<PanelContainer>
			<Button
				onClick={onScan}
				variant="outlined"
				disabled={props.appState?.state !== "calibrated" && props.appState?.state !== "scanned"}
			>
				MANUAL SCAN
			</Button>
		</PanelContainer>
	);
};
