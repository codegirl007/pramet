import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import { ImageDisplayer } from "./view/screens/ImageDisplayer";
import { RightPanel } from "./view/screens/RightPanel";
import { defaultTheme } from "./view/themes/defaultTheme";

const useStyles = makeStyles({
  heading: {
    position: "absolute",
    top: "-6.5rem",
    color: "#070574",
  },
});

export const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1 className={classes.heading}>Pramet App</h1>
      <ImageDisplayer />
      <RightPanel />
    </ThemeProvider>
  );
};
