import makeStyles from "@mui/styles/makeStyles";
import React, { ReactElement } from "react";
import { CalibrateSection } from "./CalibrateSection";
import { ManualScanSection } from "./ManualScanSection";
import { AutomaticScanSection } from "./AutomaticScanSection";
import { GallerySection } from "./GallerySection";
import { SaveSection } from "./SaveSection";
import { AppState } from "../../../App";

const useStyles = makeStyles({
	leftPanelContainer: {
		position: "absolute",
		left: "0",
		top: "0",
		width: "25%",
		minWidth: "25%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		aspectRatio: "1/3",
		maxHeight: "100%",
	},
});

type Props = {
	appState?: AppState;
	handleRerender: () => void;
};
export const LeftPanel = (props: Props): ReactElement => {
	const classes = useStyles();

	return (
		<div className={classes.leftPanelContainer}>
			<CalibrateSection appState={props.appState} handleRerender={props.handleRerender} />
			<ManualScanSection appState={props.appState} handleRerender={props.handleRerender} />
			<AutomaticScanSection appState={props.appState} handleRerender={props.handleRerender} />
			<GallerySection />
			<SaveSection appState={props.appState} handleRerender={props.handleRerender} />
		</div>
	);
};
