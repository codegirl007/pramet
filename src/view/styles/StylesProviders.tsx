import { jssPreset, StylesProvider } from "@mui/styles";
import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { create } from "jss";
import jssExtend from "jss-plugin-extend";
import rtl from "jss-rtl";
import { theme } from "./ThemeProviders";

const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById("jss-insertion-point") as HTMLElement,
});

type Props = {
	children: ReactNode;
};

export const StylesProviders = (props: Props) => {
	return (
		<StylesProvider jss={jss}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{props.children}
			</ThemeProvider>
		</StylesProvider>
	);
};
