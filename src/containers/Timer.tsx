import React, { ReactElement, useEffect, useState } from "react";
import { AppState } from "../App";
import { getRecordsRequest } from "../requests/getRecordsRequest";

type Props = {
	appState?: AppState;
	handleRerender: () => void;
};

export const Timer = (props: Props): ReactElement => {
	const [seconds, setSeconds] = useState<number>(0);

	useEffect(() => {
		const interval: ReturnType<typeof setInterval> = setInterval(() => {
			setSeconds((second) => second + 1);
			props.handleRerender();
			props.appState?.state === "running" && getRecordsRequest();
		}, 1000);
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [seconds, props.appState]);

	return <strong>{seconds}</strong>;
};
