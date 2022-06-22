import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { ReactElement, useState } from "react";
import shallow from "zustand/shallow";
import { Constants } from "../../../model/Contants";
import { scanStore } from "../../../stores/useScanStore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getRecordsRequest } from "../../../requests/getRecordsRequest";
import { PanelContainer } from "../../styles/PanelContainer";
import { selectImage } from "../../../actions/scanActions";

const useStyles = makeStyles({
	galleryContainer: {
		height: "35%",
	},
	totalCount: {
		fontSize: "1.5rem",
		marginBottom: "1rem",
	},
	gridContainer: {
		overflowY: "scroll",
	},
	imageContainer: {
		width: "100%",
		aspectRatio: "4/3",
		cursor: "pointer",
	},
	imageWrapper: {
		width: "100%",
		height: "100%",
		position: "relative",
	},
	imageWrapperSelected: {
		width: "100%",
		height: "100%",
		position: "relative",
		border: "0.4rem solid #070574",
	},
	image: {
		width: "100%",
		height: "100%",
		objectFit: "contain",
		backgroundColor: "#E8E8E8",
	},
	imageBar: {
		height: "2.7rem",
		position: "absolute",
		bottom: 0,
		background: "rgba(0, 0, 0, 0.43)",
		color: "white",
		fontSize: "1.5rem",
		width: "100%",
	},
	number: {
		margin: 0,
		paddingLeft: "1.2rem",
		position: "absolute",
		top: "50%",
		transform: "translateY(-50%)",
	},
	text: {
		textAlign: "center",
	},
	showGalleryButton: {
		position: "absolute",
		right: "1rem",
		fontSize: "2rem",
		top: "1rem",
		width: "auto",
		padding: 0,
		cursor: "pointer",
	},
});

export const GallerySection = (): ReactElement => {
	const classes = useStyles();
	const [galleryVisible, setGalleryVisible] = useState<boolean>(true);

	const { records, galleryImageId } = scanStore.useStore(
		(state) => ({
			records: state.records,
			galleryImageId: state.galleryImageId,
		}),
		shallow
	);

	const showGallery = () => {
		setGalleryVisible(true);
		getRecordsRequest();
	};

	const hideGallery = () => {
		setGalleryVisible(false);
	};

	return (
		<>
			<PanelContainer className={classes.galleryContainer}>
				{!galleryVisible ? (
					<div className={classes.text}>NO IMAGES</div>
				) : (
					<>
						<span className={classes.totalCount}>Number of images: {records?.total_count}</span>
						<Grid container spacing={2} className={classes.gridContainer}>
							{records?.records.map((record) => {
								return (
									<Grid
										item
										xs={6}
										md={4}
										key={record.id}
										className={classes.imageContainer}
										onClick={() => selectImage(record.id)}
									>
										<div className={galleryImageId === record.id ? classes.imageWrapperSelected : classes.imageWrapper}>
											<img
												src={`${Constants.SERVER_ENDPOINT}/images/${record.id}`}
												alt={"img" + record.id}
												className={classes.image}
											/>
											<div className={classes.imageBar}>
												<p className={classes.number}>{record.id}</p>
											</div>
										</div>
									</Grid>
								);
							})}
						</Grid>
					</>
				)}
				{galleryVisible ? (
					<VisibilityOffIcon onClick={hideGallery} className={classes.showGalleryButton} />
				) : (
					<VisibilityIcon onClick={showGallery} className={classes.showGalleryButton} />
				)}
			</PanelContainer>
		</>
	);
};
