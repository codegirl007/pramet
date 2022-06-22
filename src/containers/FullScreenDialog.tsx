import React, { ReactElement } from "react";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { scanStore } from "../stores/useScanStore";
import shallow from "zustand/shallow";
import { Timer } from "./Timer";
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

export const FullScreenDialog = (props: Props): ReactElement => {
	const classes = useStyles();

	const { loaded, loadingName } = scanStore.useStore(
		(state) => ({
			loaded: state.loaded,
			loadingName: state.loadingName,
		}),
		shallow
	);

	return (
		<>
			<Dialog open={loaded} onClose={() => undefined}>
				<DialogContent className={classes.loadContent}>
					<CircularProgress />
					<div className={classes.timer}>
						<p className={classes.loadingText}>{loadingName}...</p>
						<Timer appState={props.appState} handleRerender={props.handleRerender} />
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
