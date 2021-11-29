import { makeStyles } from "@material-ui/core";
import React, { ReactElement } from "react";
import { useScanStore } from "../../stores/useScanStore";
import shallow from "zustand/shallow";
import { Constants } from "../../model/Contants";

const useStyles = makeStyles({
  imageWrapper: {
    backgroundColor: "#E8E8E8",
    position: "absolute",
    left: "0",
    top: "0",
    width: "80%",
    maxHeight: "100%",
    aspectRatio: "4/3",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  errorMessage: {
    color: "red",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
  },
});

export const ImageDisplayer = (): ReactElement => {
  const classes = useStyles();
  const { data, error, imgId } = useScanStore(
    (state) => ({ data: state.data, error: state.error, imgId: state.imgId }),
    shallow
  );

  const imgEndpoint = imgId ?? data?.img_id;

  return (
    <div className={classes.imageWrapper}>
      {error && <p className={classes.errorMessage}>{error}</p>}
      {data && (
        <img
          src={`${Constants.SERVER_ENDPOINT}/img/${imgEndpoint}`}
          alt={"img" + data?.img_id}
          className={classes.image}
        />
      )}
    </div>
  );
};
