import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import React from "react";

const CommonDialog = ({dialogTitle, mesa, bodyInfo, submitInfo, onClose, open, isinput, acceptButton}) => {

    const handleSubmitInfo = ()=>{
        try {
            const response = submitInfo(bodyInfo)
            console.log(response)

        } catch (e) {

        }

    }
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>{dialogTitle} {mesa}</DialogTitle>
            {
                isinput ?
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id={'votantes' + mesa}
                        type="number"
                        //fullWidth
                        variant="outlined"
                    />
                </DialogContent> : null
            }
            <DialogActions sx={{mr: 4}}>
                {
                    !acceptButton ? <>
                        <Button onClick={()=>handleSubmitInfo()}>
                            <Typography sx={{mx: 5}} variant="h6" color="primary.main">
                                SI
                            </Typography>
                        </Button>
                        <Button onClick={onClose}>
                            <Typography variant="h6" color="primary.main">
                                NO
                            </Typography>
                        </Button>
                    </> : <>
                        <Button onClick={onClose} href='/home'>
                            <Typography variant="h6" color="primary.main">
                                ACEPTAR
                            </Typography>
                        </Button>
                    </>
                }


            </DialogActions>
        </Dialog>
    )
    //'Ingrese la cantidad de votantes de la' + mesa
}

export default CommonDialog