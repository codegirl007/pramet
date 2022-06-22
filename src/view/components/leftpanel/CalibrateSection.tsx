import { Button, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { ReactElement, useState } from "react";
import { scanStore } from "../../../stores/useScanStore";
import { PanelContainer } from "../../styles/PanelContainer";
import { AppState } from "../../../App";
import { Constants } from "../../../model/Contants";

const useStyles = makeStyles({
	calibrateContainer: {
		justifyContent: "space-around",
		height: "25%",
	},
});

type Props = {
	appState?: AppState;
	handleRerender: () => void;
};

export const CalibrateSection = (props: Props): ReactElement => {
	console.log(props.appState);
	const classes = useStyles();
	const [partCode, setPartCode] = useState<string | undefined>(props.appState?.part_code ? props.appState?.part_code : "");
	const [thickness, setThickness] = useState<string | undefined>(
		String(props.appState?.thickness) ? String(props.appState?.thickness) : ""
	);

	const onInputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPartCode(event.currentTarget.value);
		scanStore.resetSavedImgDataToNull();
	};

	const onInputNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setThickness(event.currentTarget.value);
		scanStore.resetSavedImgDataToNull();
	};

	const onCalibrate = async (): Promise<void> => {
		scanStore.resetSelectedImageToNull();
		scanStore.hideImg();
		scanStore.resetSavedImgDataToNull();
		scanStore.resetError();
		scanStore.startLoading("Calibrating");

		try {
			const response = await fetch(`${Constants.SERVER_ENDPOINT}/controller/calibrate`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code: partCode,
					thickness: Number(thickness),
				}),
			});
			if (!response.ok) {
				scanStore.useStore.setState({
					error: `Failed to calibrate scanner with status ${response.status}. Please, try it again.`,
				});
				scanStore.stopLoading();
			}

			const responseJSON = await response.json();
			scanStore.useStore.setState({
				calibrationData: responseJSON,
				imgVisible: true,
				galleryImageId: responseJSON.img_id,
			});

			scanStore.stopLoading();
			props.handleRerender();
		} catch (e) {
			console.log("Network Error ", e);
			scanStore.useStore.setState({ error: "Network Error" });
			scanStore.stopLoading();
		}
	};

	return (
		<PanelContainer className={classes.calibrateContainer} id="calibrateSection">
			<TextField label="Type Part Code" variant="outlined" value={partCode} onChange={onInputNameChange} />
			<TextField label="Thickness" variant="outlined" value={thickness} type="number" onChange={onInputNumberChange} />
			<Button variant="contained" onClick={onCalibrate} disabled={!partCode || !thickness}>
				CALIBRATE
			</Button>
		</PanelContainer>
	);
};
