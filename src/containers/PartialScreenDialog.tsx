import React, { ReactElement } from "react";
import { Button, CircularProgress, Dialog, DialogContent } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { scanStore } from "../stores/useScanStore";
import shallow from "zustand/shallow";
import { Timer } from "./Timer";
import { Constants } from "../model/Contants";
import { getRecordsRequest } from "../requests/getRecordsRequest";
import { AppState } from "../App";

const useStyles = makeStyles({
	loadContent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: "1rem 2rem",
	},
	timer: {
		width: "15rem",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	loadingText: {
		fontSize: "2rem",
		margin: "1rem",
	},
});

type Props = {
	appState?: AppState;
	handleRerender: () => void;
};

export const PartialScreenDialog = (props: Props): ReactElement => {
	const classes = useStyles();

	const { loaded, loadingName } = scanStore.useStore(
		(state) => ({
			loaded: state.loaded,
			loadingName: state.loadingName,
		}),
		shallow
	);
	const onStopAutoScan = async (): Promise<void> => {
		scanStore.startLoading("Stopping");
		scanStore.resetError();
		try {
			const response = await fetch(`${Constants.SERVER_ENDPOINT}/controller/stop`, {
				method: "POST",
				headers: {
					"Content-Type": "text/plain",
				},
			});
			if (!response.ok) {
				scanStore.useStore.setState({
					error: `Failed to stop scanning with status ${response.status}. Please, try it again.`,
				});
			}
			scanStore.stopLoading();
			props.handleRerender();
		} catch (e) {
			console.log("Network Error ", e);
			scanStore.useStore.setState({ error: "Network Error" });
			scanStore.stopLoading();
		}
		getRecordsRequest();
		props.handleRerender();
	};

	return (
		<>
			<Dialog
				open={loaded}
				onClose={() => undefined}
				container={() => document.getElementById("calibrateSection")}
				style={{ position: "absolute", padding: 0 }}
				BackdropProps={{ style: { position: "absolute", padding: 0 } }}
			>
				<DialogContent className={classes.loadContent} style={{ width: "20rem", height: "57rem", overflow: "hidden" }}>
					<CircularProgress />
					<div className={classes.timer}>
						<p className={classes.loadingText}>{loadingName}...</p>
						<Timer appState={props.appState} handleRerender={props.handleRerender} />
					</div>
					{loadingName === "Running" && (
						<Button
							variant="contained"
							style={{ backgroundColor: "#D40000", minWidth: "14rem", marginTop: "1rem" }}
							onClick={onStopAutoScan}
						>
							STOP
						</Button>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};
