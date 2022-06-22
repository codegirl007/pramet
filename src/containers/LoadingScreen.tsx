import React, { ReactElement } from "react";
import { scanStore } from "../stores/useScanStore";
import shallow from "zustand/shallow";
import { FullScreenDialog } from "./FullScreenDialog";
import { PartialScreenDialog } from "./PartialScreenDialog";
import { AppState } from "../App";

type Props = {
	appState?: AppState;
	handleRerender: () => void;
};

export const LoadingScreen = (props: Props): ReactElement => {
	const loadingName = scanStore.useStore((state) => state.loadingName, shallow);

	return (
		<>
			{loadingName === "Scanning" || loadingName === "Running" || loadingName === "Stopping" ? (
				<PartialScreenDialog appState={props.appState} handleRerender={props.handleRerender} />
			) : (
				<FullScreenDialog appState={props.appState} handleRerender={props.handleRerender} />
			)}
		</>
	);
};
