import { makeStyles } from "@material-ui/core";
import React, { ReactElement } from "react";
import { scanStore } from "../../stores/useScanStore";
import shallow from "zustand/shallow";
import { Constants } from "../../model/Contants";

const useStyles = makeStyles({
  imageWrapper: {
    backgroundColor: "#E8E8E8",
    position: "absolute",
    borderRadius: "1.5rem",
    left: "0",
    top: "0",
    width: "80%",
    maxHeight: "100%",
    aspectRatio: "4/3",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  errorMessage: {
    color: "red",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: "6rem",
    fontWeight: "bold",
  },
  savedDataInfo: {
    position: "absolute",
    bottom: "0.5rem",
    left: "0.5rem",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#070574",
    color: "#fff",
    fontSize: "2rem",
    borderRadius: "1.5rem",
    border: "1px solid #fff",
    padding: "0.5rem 3rem",
    fontWeight: "bold",
  },
  dataInfo: {
    fontWeight: "normal",
    fontStyle: "italic",
    marginLeft: "1rem",
  },
});

export const ImageDisplayer = (): ReactElement => {
  const classes = useStyles();
  const { data, error, imgId, savedData } = scanStore.useStore(
    (state) => ({
      data: state.data,
      error: state.error,
      imgId: state.imgId,
      savedData: state.savedData,
    }),
    shallow
  );

  const imgEndpoint = imgId ?? data?.img_id;

  return (
    <>
      <div className={classes.imageWrapper}>
        {error && <p className={classes.errorMessage}>{error}</p>}
        {data && !error && (
          <img
            src={`${Constants.SERVER_ENDPOINT}/img/${imgEndpoint}`}
            alt={"img" + data?.img_id}
            className={classes.image}
          />
        )}
        {savedData && (
          <div className={classes.savedDataInfo}>
            Image ID:
            <span className={classes.dataInfo}>{savedData?.img_id}</span>, Image
            Path:
            <span className={classes.dataInfo}>{savedData?.img_path}</span>
          </div>
        )}
      </div>
    </>
  );
};
