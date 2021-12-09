import React, { ReactElement } from "react";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import { scanStore } from "../stores/useScanStore";
import shallow from "zustand/shallow";
import { Timer } from "./Timer";

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

export const LoadingScreen = (): ReactElement => {
  const classes = useStyles();

  const loaded = scanStore.useStore((state) => state.loaded, shallow);

  return (
    <Dialog open={loaded} onClose={() => undefined}>
      <DialogContent className={classes.loadContent}>
        <CircularProgress />
        <div className={classes.timer}>
          <p className={classes.loadingText}>Working...</p>
          <Timer />
        </div>
      </DialogContent>
    </Dialog>
  );
};
