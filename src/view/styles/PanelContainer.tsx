import { makeStyles } from "@mui/styles";
import React, { ReactElement, ReactNode } from "react";
import clsx from "clsx";

interface Props {
	className?: string | undefined;
	children?: ReactNode | undefined;
	id?: string;
}

const useStyles = makeStyles(() => ({
	container: {
		background: "rgba(1, 129, 253, 0.59)",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		borderRadius: "1.5rem",
		border: "1.5px solid #A8A8A8",
		padding: "1.5rem",
		position: "relative",
	},
}));

export const PanelContainer = (props: Props): ReactElement => {
	const classes = useStyles();
	return (
		<div className={clsx(classes.container, props.className)} id={props.id}>
			{props.children}
		</div>
	);
};
