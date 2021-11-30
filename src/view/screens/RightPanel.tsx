import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import { useScanStore } from "../../stores/useScanStore";
import shallow from "zustand/shallow";
import { fetchData } from "../../actions/fetchDataActions";
import { toggleScanned } from "../../actions/toggleScannedActions";
import { downloadFile } from "../../actions/downloadFileActions";
import { Constants } from "../../model/Contants";
import { postData } from "../../actions/fetchDataActions";

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
    "@media (min-width: 1820px)": {
      minWidth: "30%",
    },
  },
  partTypeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
  textField: {
    margin: "3rem",
    padding: "0px 0px",
    "& label.Mui-focused": {
      color: "#000",
      fontSize: "1.1rem",
    },
  },
  input: {
    backgroundColor: "#fff",
    width: "18rem",
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
  const { scanned, data } = useScanStore(
    (state) => ({ scanned: state.scanned, data: state.data }),
    shallow
  );
  const [typed, setTyped] = useState("");

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTyped(event.currentTarget.value);
  };

  const changePartType = (): void => {
    useScanStore.setState({ imgId: null });
    useScanStore.setState({ error: "" });
    fetchData("findbb");
  };

  const handleScan = (): void => {
    if (data) {
      postData(data, "scan");
    }
    toggleScanned();
    useScanStore.setState({ error: "" });
  };

  // const handleSave = (): void => {
  //   data && downloadFile(data.url, `${typed}.jpg`);
  // };

  return (
    <div className={classes.panelContainer}>
      <div className={classes.partTypeContainer}>
        <TextField
          label="Type Part Code"
          variant="outlined"
          value={typed}
          onChange={onInputChange}
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
        {scanned ? (
          <>
            <Button
              // onClick={handleSave}
              className={classes.darkButton}
              variant="outlined"
            >
              SAVE
            </Button>
            <Button onClick={toggleScanned} variant="outlined">
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
