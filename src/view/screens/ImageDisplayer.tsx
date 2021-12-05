import { Button, makeStyles } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
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
  zoomLabel: {
    position: "absolute",
    top: "0.5rem",
    left: "0.5rem",
    backgroundColor: "#070574",
    color: "#fff",
    padding: "0.5rem 3rem",
    fontSize: "2rem",
    borderRadius: "1.5rem",
    height: "3rem",
    Zindex: "10",
  },
  scaleButton: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
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
  //* zoom on mouse pointer with mouse wheel *//
  type Position = {
    x: number;
    y: number;
    scale: number;
  };
  const [position, setPosition] = useState<Position>({ x: 0, y: 0, scale: 1 });
  const [zoomLabel, setZoomLabel] = useState<boolean>(false);

  const onScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY * -0.0005;
    const newScale = position.scale + delta;

    const ratio = 1 - newScale / position.scale;

    setPosition({
      scale: newScale,
      x: position.x + (e.clientX - position.x) * ratio,
      y: position.y + (e.clientY - position.y) * ratio,
    });
  };

  const onShowZoomLabel = (): void => {
    setZoomLabel(true);
  };

  const onHideZoomLabel = (): void => {
    setZoomLabel(false);
  };

  const onSetDefaultPosition = (): void => {
     setPosition({ x: 0, y: 0, scale: 1 }); 
  }

  const isOnDeafultPosition = position.x === 0 && position.x === 0 && position.scale === 1;

  const imgEndpoint = imgId ?? data?.img_id;

  return (
    <>
      <div
        className={classes.imageWrapper}
        onWheelCapture={onScroll}
        onMouseOver={onShowZoomLabel}
        onMouseLeave={onHideZoomLabel}
      >
        {error && <p className={classes.errorMessage}>{error}</p>}
        {data && !error && (
          <img
            src={`${Constants.SERVER_ENDPOINT}/img/${imgEndpoint}`}
            alt={"img" + imgEndpoint}
            className={classes.image}
            style={{
              transformOrigin: "0 0",
              transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
            }}
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
        {!isOnDeafultPosition && (
          <Button
            className={classes.scaleButton}
            onClick={onSetDefaultPosition}
          >
            PREV SCALE
          </Button>
        )}
        {zoomLabel && (
          <div className={classes.zoomLabel}>Try Zoom by MouseWheel</div>
        )}
      </div>
    </>
  );
};
