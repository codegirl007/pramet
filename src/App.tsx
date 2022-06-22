import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./view/styles/ThemeProviders";
import { LoadingScreen } from "./containers/LoadingScreen";
import { ImageDisplayer } from "./view/components/imagedisplayer/ImageDisplayer";
import { LeftPanel } from "./view/components/leftpanel/LeftPanel";
import { StylesProviders } from "./view/styles/StylesProviders";
import { scanStore } from "./stores/useScanStore";
import { LoadingComponent } from "./containers/LoadingComponent";
import { Constants } from "./model/Contants";
import { getRecordsRequest } from "./requests/getRecordsRequest";

export type AppState = {
	allowed_transitions: string[];
	state: string;
	last_number: number;
	part_code: string;
	thickness: number;
};

export const App = () => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [appState, setAppState] = useState<AppState>();
	const [rerender, setRerender] = useState<boolean>(false);

	const getAppState = async (): Promise<void> => {
		try {
			const response = await fetch(`${Constants.SERVER_ENDPOINT}/controller/state`);
			if (!response.ok) {
				scanStore.useStore.setState({
					error: `Failed to calibrate scanner with status ${response.status}. Please, try it again.`,
				});
				setLoaded(true);
			}

			const appState = await response.json();
			setAppState(appState);
			setLoaded(true);
		} catch (e) {
			console.log("Network Error ", e);
			scanStore.useStore.setState({ error: "Network Error" });
			setLoaded(true);
		}
	};

	const handleRerender = (): void => {
		setRerender(!rerender);
	};

	useEffect(() => {
		getAppState();
		getRecordsRequest();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [!rerender]);

	return (
		<StylesProviders>
			<ThemeProvider theme={theme}>
				{!loaded ? (
					<LoadingComponent loaded />
				) : (
					<>
						<ImageDisplayer appState={appState} handleRerender={handleRerender} />
						<LeftPanel appState={appState} handleRerender={handleRerender} />
						<LoadingScreen appState={appState} handleRerender={handleRerender} />
					</>
				)}
			</ThemeProvider>
		</StylesProviders>
	);
};
