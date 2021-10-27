import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useScanStore } from '../../stores/useScanStore';
import shallow from "zustand/shallow";

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
  },
  errorMessage: {
        color: 'red',
        textTransform: 'uppercase',
        textAlign: 'center'
  }
});



export const ImageDisplayer = () => {
    const classes = useStyles();
    const {data , error} = useScanStore((state) => ({data: state.data, error: state.error}), shallow);

    return (
      <div className={classes.imageWrapper}>
         {error && <p className={classes.errorMessage}>{error}</p>}
         {console.log(data)}
         { data && <img src={data?.url} alt={`${data?.id}`} className={classes.image}/>}
      </div>
    );
};