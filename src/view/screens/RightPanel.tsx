import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { ReactElement } from "react";
import { scanStore } from "../../stores/useScanStore";
import shallow from "zustand/shallow";
import {
  changePartType,
  handleSave,
  handleScan,
} from "../../actions/scannedSavedActions";

const useStyles = makeStyles({
  panelContainer: {
    background:
      "linear-gradient(180deg, rgba(1,129,253,1) 0%, rgba(255,255,255,1) 100%)",
    position: "absolute",
    right: "0",
    top: "0",
    width: "20%",
    minWidth: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    aspectRatio: "1/3",
    maxHeight: "100%",
    borderRadius: "1.5rem",
    border: "1.5px solid #A8A8A8",
  },
  partTypeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
  textField: {
    margin: "2rem 1rem",
    padding: "0px 0px",
    "& label": {
      fontSize: "1.8rem",
    },
    "& label.Mui-focused": {
      color: "#000",
      fontSize: "1.8rem",
    },
  },
  input: {
    backgroundColor: "#fff",
    width: "18rem",
    fontSize: "1.8rem",
  },
  darkButton: {
    color: "#fff",
    backgroundColor: "#070574",
    "&:hover": {
      backgroundColor: "#070574",
      color: "#fff",
    },
  },
  buttons: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
});

export const RightPanel = (): ReactElement => {
  const classes = useStyles();
  const { rescanButtonVisible, partTypeName, thickness } = scanStore.useStore(
    (store) => ({
      rescanButtonVisible: store.rescanButtonVisible,
      partTypeName: store.partTypeName,
      thickness: store.thickness,
    }),
    shallow
  );

  const onInputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    scanStore.setPartTypeName(event.currentTarget.value);
    scanStore.resetSavedImgDataToNull();
    scanStore.resetThickness();
  };

  const onInputNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    scanStore.setThickness(event.currentTarget.value);
    scanStore.resetSavedImgDataToNull();
  };
  return (
    <div className={classes.panelContainer}>
      <div className={classes.partTypeContainer}>
        <TextField
          label="Type Part Code"
          variant="outlined"
          value={partTypeName}
          onChange={onInputNameChange}
          className={classes.textField}
          InputProps={{
            className: classes.input,
          }}
        />
        <TextField
          label="Thickness"
          variant="outlined"
          value={thickness}
          onChange={onInputNumberChange}
          className={classes.textField}
          InputProps={{
            className: classes.input,
          }}
        />
        <Button
          variant="outlined"
          className={classes.darkButton}
          onClick={changePartType}
          style={{ minWidth: "18rem", fontSize: "1.2rem" }}
        >
          CHANGE PART TYPE
        </Button>
      </div>
      <div className={classes.buttons}>
        {rescanButtonVisible ? (
          <>
            <Button
              onClick={handleSave}
              className={classes.darkButton}
              variant="outlined"
            >
              SAVE
            </Button>
            <Button onClick={handleScan} variant="outlined">
              RESCAN
            </Button>
          </>
        ) : (
          <Button onClick={handleScan} variant="outlined">
            SCAN
          </Button>
        )}
      </div>
    </div>
  );
};
