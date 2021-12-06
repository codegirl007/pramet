import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { ImageDisplayer } from "./view/screens/ImageDisplayer";
import { RightPanel } from "./view/screens/RightPanel";
import { defaultTheme } from "./view/themes/defaultTheme";
import { LoadingScreen } from "./containers/LoadingScreen";

export const App = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <ImageDisplayer />
        <RightPanel />
        <LoadingScreen />
      </ThemeProvider>
    </>
  );
};
