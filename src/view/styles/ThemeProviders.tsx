import { createTheme } from "@mui/material";

export const theme = createTheme({
	typography: {
		fontFamily: "Montserrat, sans-serif",
		htmlFontSize: 10,
		fontWeightRegular: 400,
		h1: {
			fontSize: "2.4rem",
			fontWeight: 700,
			marginBottom: "1.2rem",
			color: "#19253E",
		},
		h2: {
			fontSize: "2rem",
		},
		h3: {
			fontSize: "1.6rem",
		},
		body1: {
			fontSize: "1.4rem",
			color: "#4C5467",
			marginBottom: "1.2rem",
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				html: {
					fontSize: "62.5%",
					lineHeight: "2rem",
					height: "100vh",
					width: "100vw",
					padding: "5rem",
				},
				body: {
					fontSize: "1.6rem",
					position: "relative",
					margin: 0,
					height: "100%",
					width: "100%",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					minWidth: "24rem",
					fontSize: "1.8rem",
					fontWeight: "bold",
					height: "6rem",
					margin: "0.8rem",
				},
				outlined: {
					color: "#070574",
					backgroundColor: "#fff",
					"&:hover": {
						backgroundColor: "#E8E8E8",
						color: "#000",
					},
					"&:disabled": {
						color: "#858585",
						backgroundColor: "#E8E8E8",
					},
				},
				contained: {
					color: "#fff",
					backgroundColor: "#070574",
					"&:hover": {
						backgroundColor: "#000041",
						color: "#fff",
					},
					"&:disabled": {
						color: "#858585",
						backgroundColor: "#E8E8E8",
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					backgroundColor: "#fff",
					width: "24rem",
					fontSize: "1.8rem",
					height: "6rem",
					borderRadius: "0.4rem",
				},
			},
		},
	},
});
