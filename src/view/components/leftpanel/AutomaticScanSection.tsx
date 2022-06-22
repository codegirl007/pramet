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

export const AutomaticScanSection = (props: Props): ReactElement => {
	console.log(props.appState?.state);
	const onStartAutoScan = async (): Promise<void> => {
		scanStore.resetSelectedImageToNull();
		scanStore.hideImg();
		scanStore.resetError();
		scanStore.startLoading("Running");

		try {
			const response = await fetch(`${Constants.SERVER_ENDPOINT}/controller/start`, {
				method: "POST",
				headers: {
					"Content-Type": "text/plain",
				},
			});
			if (!response.ok) {
				scanStore.useStore.setState({
					error: `Failed to start scanning with status ${response.status}. Please, try it again.`,
				});
			}
			props.handleRerender();
		} catch (e) {
			console.log("Network Error ", e);
			scanStore.useStore.setState({ error: "Network Error" });
		}
	};

	return (
		<PanelContainer>
			<Button
				variant="outlined"
				onClick={onStartAutoScan}
				disabled={props.appState?.state !== "calibrated" && props.appState?.state !== "scanned"}
			>
				AUTOMATIC SCAN
			</Button>
		</PanelContainer>
	);
};
