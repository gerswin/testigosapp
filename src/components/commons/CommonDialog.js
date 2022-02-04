import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";

const CommonDialog = ({dialogTitle, mesa, bodyInfo, submitInfo, onClose, open, isinput, acceptButton, error, rules}) => {
    const { watch, control} = useForm({
    })
    const values = watch()
    const handleSubmitInfo = async (body) =>{
        console.log(body)
        try {
            let response = await submitInfo(body)
            response = await response.data
            onClose()
            return response
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Dialog open={open}  >
            <DialogTitle>{dialogTitle} {mesa && mesa.name}</DialogTitle>
            {
                isinput ?
                <DialogContent>
                    <Controller
                        control={control}
                        name={mesa && mesa.name}
                        render={({ field: { onChange, onBlur, value, ref } }) => {
                            return(
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name={mesa.name}
                                type={rules.type}
                                value={value}
                                onChange={onChange}
                                error={error && error.isError}
                                onBlur={onBlur}
                                />
                            )
                        }}
                    />
                </DialogContent> : null
            }
            <DialogActions sx={{mr: 4}}>
                {
                    !acceptButton ? <>
                        <Button onClick={()=> mesa && mesa.name ? submitInfo(mesa.name, values[mesa.name]) : handleSubmitInfo(bodyInfo)} >
                            <Typography sx={{mx: 10}} variant="h6" color="primary.main">
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