import { Button, Icon, makeStyles } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import { scanStore } from "../../stores/useScanStore";
import shallow from "zustand/shallow";
import { Constants } from "../../model/Contants";
import { ZoomIn } from "@material-ui/icons";
import Draggable from "react-draggable";
import { zoomStore } from "../../stores/useZoomStore";
import { hideZoomLabel, showZoomLabel } from "../../actions/zoomActions";
import { positionStore } from "../../stores/usePositionStore";

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
  imageDiv: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
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
    padding: "0.5rem 2.5rem",
    fontSize: "2rem",
    borderRadius: "1.5rem",
    Zindex: "10",
    display: "flex",
    alignItems: "center",
  },
  scaleButton: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    width: "14rem",
    fontSize: "1.5rem",
  },
  zoomIcon: {
    transform: "scale(3)",
    margin: "1rem 2rem 1rem 0rem",
  },
});

export const ImageDisplayer = (): ReactElement => {
  const classes = useStyles();
  const {
    previewCoordinates,
    error,
    scannedImgId,
    savedImgData,
    hash,
    imgVisible,
  } = scanStore.useStore(
    (state) => ({
      previewCoordinates: state.previewCoordinates,
      error: state.error,
      scannedImgId: state.scannedImgId,
      savedImgData: state.savedImgData,
      hash: state.hash,
      imgVisible: state.imgVisible,
    }),
    shallow
  );
  const zoomLabelVisible = zoomStore.useStore(
    (state) => state.zoomLabelVisible,
    shallow
  );

  const { x, y, scale } = positionStore.useStore(
    (state) => ({
      x: state.x,
      y: state.y,
      scale: state.scale,
    }),
    shallow
  );

  const IMG_ENDPOINT: number | undefined =
    scannedImgId ?? previewCoordinates?.img_id;

  //------------------------------------------------------------------------------
  // ZOOM ON MOUSEPOINTER BY MOUSE WHEEL
  //------------------------------------------------------------------------------

  const onScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY * -0.0005;
    const newScale = scale + delta;
    const ratio = 1 - newScale / scale;

    if (previewCoordinates) {
      positionStore.setPosition(
        x + (e.clientX - x) * ratio,
        y + (e.clientY - y) * ratio,
        newScale
      );
    }
  };

  type DragPosition = {
    x: number;
    y: number;
  };

  const [dragPosition, setDragPosition] = useState<DragPosition | undefined>(
    undefined
  );

  const onSetDefaultPosition = (): void => {
    positionStore.setDefaultPosition();
    setDragPosition({ x: 0, y: 0 });
  };

  const isOnDefaultPosition: boolean = x === 0 && y === 0 && scale === 1;

  const handleStart = () => {
    setDragPosition(undefined);
  };

  return (
    <>
      <div
        className={classes.imageWrapper}
        onWheelCapture={onScroll}
        onMouseOver={showZoomLabel}
        onMouseLeave={hideZoomLabel}
      >
        {error && <p className={classes.errorMessage}>{error}</p>}
        {imgVisible && previewCoordinates && !error && (
          <Draggable
            position={dragPosition}
            defaultPosition={{ x: 0, y: 0 }}
            onStart={handleStart}
            onStop={handleStart}
          >
            <div className={classes.imageDiv}>
              <img
                src={`${Constants.SERVER_ENDPOINT}/img/${IMG_ENDPOINT}?a=${hash}`}
                alt={"img" + IMG_ENDPOINT}
                className={classes.image}
                style={{
                  transformOrigin: "0 0",
                  transform: `translate(${x}px, ${y}px) scale(${scale})`,
                }}
              />
            </div>
          </Draggable>
        )}
        {savedImgData && (
          <div className={classes.savedDataInfo}>
            Image ID:
            <span className={classes.dataInfo}>{savedImgData?.img_id}</span>,
            Image Path:
            <span className={classes.dataInfo}>{savedImgData?.img_path}</span>
          </div>
        )}
        {!isOnDefaultPosition && previewCoordinates && (
          <Button
            className={classes.scaleButton}
            onClick={onSetDefaultPosition}
          >
            PREV SCALE
          </Button>
        )}
        {zoomLabelVisible && previewCoordinates && (
          <div className={classes.zoomLabel}>
            <Icon className={classes.zoomIcon}>
              <ZoomIn />
            </Icon>
            Try Zoom by MouseWheel
          </div>
        )}
      </div>
    </>
  );
};
