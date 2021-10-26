import { makeStyles } from '@material-ui/core';
import React from 'react';



const useStyles = makeStyles({
	imageWrapper: {
		backgroundColor: "#E8E8E8",
        position: "absolute",
        left: "0",
        top:"0",
        width: "80%",
        maxHeight: "100%",
        aspectRatio: "4/3",
	}
});


export const ImageDisplayer = () => {
    const classes = useStyles();
    

    return (
      <div className={classes.imageWrapper}>
        
      </div>
    )
}