import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CommonDialog = ({dialogTitle, mesa, bodyInfo, submitInfo, onClose, open, isinput, acceptButton, href}) => {
    let navigate = useNavigate();

    const handleSubmitInfo = async (body) =>{
        try {
            console.log(body)
            let response = await submitInfo(body)
            response = await response.data
            //console.log(response)
            onClose()
            return response
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Dialog open={open}  >
            <DialogTitle>{dialogTitle} {mesa}</DialogTitle>
            {
                isinput ?
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id={'votantes' + mesa}
                        type="number"
                        variant="outlined"
                    />
                </DialogContent> : null
            }
            <DialogActions sx={{mr: 4}}>
                {
                    !acceptButton ? <>
                        <Button onClick={()=>handleSubmitInfo(bodyInfo)} >
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
                        <Button onClick={()=>onClose()} >
                            <Typography variant="h6" color="primary.main">
                                ACEPTAR
                            </Typography>
                        </Button>
                    </>
                }
            </DialogActions>
        </Dialog>
    )
}

export default CommonDialog