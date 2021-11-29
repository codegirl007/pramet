import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import { useScanStore } from "../../stores/useScanStore";
import shallow from "zustand/shallow";
import { fetchData } from "../../actions/fetchDataActions";
import { toggleScanned } from "../../actions/toggleScannedActions";
import { downloadFile } from "../../actions/downloadFileActions";
import { Constants } from "../../model/Contants";

const useStyles = makeStyles({
  panelContainer: {
    backgroundColor: "#0181FD",
    position: "absolute",
    right: "0",
    top: "0",
    width: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    aspectRatio: "1/3",
    maxHeight: "100%",
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
    useScanStore.setState({ error: "" });
    fetchData("findbb");
  };

  const handleScan = (): void => {
    // fetchData(endpointFind);
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
      <div>
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
