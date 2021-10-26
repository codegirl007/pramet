import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useScanStore } from '../../stores/useScanStore';



const useStyles = makeStyles({
	imageWrapper: {
		backgroundColor: "#E8E8E8",
        position: "absolute",
        left: "0",
        top:"0",
        width: "80%",
        maxHeight: "100%",
        aspectRatio: "4/3",
	},
  image: {
        width: "100%",
        height: "100%"
  }
});



export const ImageDisplayer = () => {
    const classes = useStyles();
    const data = useScanStore((state) => state.data);

    return (
      <div className={classes.imageWrapper}>
        <img src={data.url} alt={data.id} className={classes.image}/>
      </div>
    );
};