import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { ReactElement } from "react";

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
	loaded: boolean;
};

export const LoadingComponent = (props: Props): ReactElement => {
	const classes = useStyles();

	return (
		<>
			<Dialog open={props.loaded} onClose={() => undefined}>
				<DialogContent className={classes.loadContent}>
					<CircularProgress />
					<div className={classes.timer}>
						<p className={classes.loadingText}>Initializating...</p>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
