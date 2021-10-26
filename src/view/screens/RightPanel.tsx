import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useScanStore } from '../../stores/useScanStore';
import shallow from "zustand/shallow";
import { toggleScanned } from '../../actions/toggleScanned.actions';



const useStyles = makeStyles({
	panelContainer: {
		backgroundColor: "#0181FD",
        position: "absolute",
        right: "0",
        top:"0",
        height: "100%",
        width: "25%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
	},
    textField: {
        margin: "3rem",
		padding: "0px 0px",
		position: "relative",
    },
    input: {
        backgroundColor: "#fff",
        width: "18rem"
    },
    saveButton: {
        color: "#fff",
        backgroundColor: "#070574",
        "&:hover": {
            backgroundColor: "#070574",
            color: "#fff"
        }
    }
    
        
    
});

export const RightPanel = () => {
    const classes = useStyles();
    const { scanned, fetch } = useScanStore(
      (state) => ({ scanned: state.scanned, fetch: state.fetch }),
      shallow
    );
  
    const [typed, setTyped] = useState("");
  
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTyped(event.currentTarget.value);
    };
  
    const handleScan = () => {
      fetch(`https://jsonplaceholder.typicode.com/photos/${typed}`);
      toggleScanned();
    };
  
    const handleSave = () => {};

    return(
        <div className={classes.panelContainer}>
            <TextField label="...Type Part Code"
					   variant="outlined"
					   value={typed}
					   onChange={onInputChange}
					   className={classes.textField}
                       InputProps={{
                        className: classes.input,
                       }}
                       
                       />
            <div>
            { scanned ? 
                        <>
                        <Button onClick={handleSave} className={classes.saveButton} variant="outlined">SAVE</Button>
                        <Button onClick={toggleScanned} variant="outlined">RESCAN</Button>
                        </>
                           
                      :                               
                        <Button onClick={handleScan} variant="outlined">SCAN</Button> 
            }  
            </div>         
        </div>
    )
    
}

