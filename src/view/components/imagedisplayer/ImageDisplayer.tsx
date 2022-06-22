import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ReactElement, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Constants } from "../../../model/Contants";
import shallow from "zustand/shallow";
import { scanStore } from "../../../stores/useScanStore";
import { Button, Snackbar } from "@mui/material";
import { AppState } from "../../../App";

const useStyles = makeStyles({
	imageWrapper: {
		backgroundColor: "#E8E8E8",
		height: "100%",
		maxHeight: "100%",
		borderRadius: "1.5rem",
		width: "72%",
		position: "absolute",
		right: "0",
		top: "0",
	},
	buttonPrevScale: {
		zIndex: 99999,
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
		bottom: "2rem",
		right: "2rem",
		height: "4rem",
		display: "flex",
		alignItems: "center",
		backgroundColor: "#A9A9A9",
		fontSize: "2rem",
		borderRadius: "0.8rem",
		padding: "0.5rem 3rem",
		fontWeight: "bold",
	},
	snackBar: {
		fontSize: "10rem",
	},
});

type Props = {
	appState?: AppState;
	handleRerender: () => void;
};

export const ImageDisplayer = (props: Props): ReactElement => {
	const classes = useStyles();
	const transformComponentRef = useRef(null);

	const { galleryImageId, error, savedImgData, snackBarVisible, imgVisible } = scanStore.useStore(
		(state) => ({
			galleryImageId: state.galleryImageId,
			error: state.error,
			savedImgData: state.savedImgData,
			snackBarVisible: state.snackBarVisible,
			imgVisible: state.imgVisible,
		}),
		shallow
	);

	const onCloseBar = (): void => {
		scanStore.hideSnackBar();
	};

	return (
		<div className={classes.imageWrapper}>
			{error && <p className={classes.errorMessage}>{error}</p>}
			{imgVisible && !error && (
				<TransformWrapper
					ref={transformComponentRef}
					initialScale={1}
					initialPositionX={0}
					initialPositionY={0}
					minScale={0.1}
					maxScale={8}
					doubleClick={{
						disabled: true,
					}}
					limitToBounds={false}
					zoomAnimation={{ disabled: true }}
				>
					{({ zoomIn, zoomOut, resetTransform, ...rest }) => {
						return (
							<>
								<TransformComponent
									wrapperStyle={{
										height: "100%",
										width: "100%",
										display: "flex",
										alignItems: "center",
										transform: "none",
									}}
								>
									<img
										src={
											galleryImageId
												? `${Constants.SERVER_ENDPOINT}/images/${galleryImageId}`
												: `${Constants.SERVER_ENDPOINT}/images/${props.appState?.last_number}`
										}
										alt={"img" + galleryImageId}
										style={{
											width: "80%",
											height: "80%",
											marginLeft: "auto",
											marginRight: "auto",
											transform: "none",
										}}
									/>
								</TransformComponent>
								<Button
									onClick={() => resetTransform()}
									variant="contained"
									style={{ position: "absolute", bottom: "2rem", left: "2rem" }}
								>
									PREV SCALE
								</Button>
							</>
						);
					}}
				</TransformWrapper>
			)}
			<Snackbar
				open={snackBarVisible}
				onClose={onCloseBar}
				message={`Saved with ID:  ${savedImgData}`}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				autoHideDuration={1000}
			/>
		</div>
	);
};
