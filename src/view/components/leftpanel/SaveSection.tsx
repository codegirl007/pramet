import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { ReactElement } from "react";
import shallow from "zustand/shallow";
import { AppState } from "../../../App";
import { Constants } from "../../../model/Contants";
import { recordConfirmationRequest } from "../../../requests/recordConfirmationRequest";
import { scanStore } from "../../../stores/useScanStore";
import { PanelContainer } from "../../styles/PanelContainer";

const useStyles = makeStyles({
	buttons: {
		textAlign: "center",
	},
});

type Props = {
	appState?: AppState;
	handleRerender: () => void;
};

export const SaveSection = (props: Props): ReactElement => {
	const classes = useStyles();
	const { galleryImageId } = scanStore.useStore(
		(state) => ({
			galleryImageId: state.galleryImageId,
		}),
		shallow
	);

	const onOK = (): void => {
		scanStore.resetError();
		const galleryImageId = scanStore.useStore.getState().galleryImageId;
		galleryImageId && recordConfirmationRequest(galleryImageId, true);
		scanStore.hideImg();
	};

	const onNotOK = (): void => {
		scanStore.resetError();
		const galleryImageId = scanStore.useStore.getState().galleryImageId;
		galleryImageId && recordConfirmationRequest(galleryImageId, false);
		scanStore.hideImg();
	};

	const onSave = async (): Promise<void> => {
		scanStore.resetError();
		try {
			const response = await fetch(`${Constants.SERVER_ENDPOINT}/controller/save`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code: props.appState?.part_code,
				}),
			});
			const responseJSON = await response.json();
			scanStore.useStore.setState({ savedImgData: responseJSON.id });
			if (!response.ok) {
				scanStore.useStore.setState({
					error: `Failed to save image with status ${response.status}. Please, try it again.`,
				});
			}
			scanStore.showSnackBar();
			props.handleRerender();
		} catch (e) {
			console.log("Network Error ", e);
			scanStore.useStore.setState({ error: "Network Error" });
		}
	};

	const onDiscard = (): void => {
		scanStore.resetError();
		scanStore.hideImg();
	};
	return (
		<PanelContainer>
			{galleryImageId ? (
				<div className={classes.buttons}>
					<Button variant="contained" onClick={onOK}>
						Detected correctly
					</Button>
					<Button onClick={onNotOK} variant="outlined">
						NO DEFECT
					</Button>
				</div>
			) : (
				<div className={classes.buttons}>
					<Button variant="contained" onClick={onSave} disabled={props.appState?.state !== "scanned"}>
						SAVE
					</Button>
					<Button onClick={onDiscard} variant="outlined" disabled={props.appState?.state !== "scanned"}>
						DISCARD
					</Button>
				</div>
			)}
		</PanelContainer>
	);
};
