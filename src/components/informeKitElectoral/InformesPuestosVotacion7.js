import {Route} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, Grid, Paper, TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";
import CommonDialog from "../commons/CommonDialog";

const InformesPuestosVotacion7 = () => {
    const { formState, watch, control} = useForm({
        defaultValues: {
            q1: '',
            q2: ''
        }
    })
    const { errors } = formState;
    const values = watch()
    const [displayModal, setDisplayModal] = useState( '')
    const [open, setOpen] = useState(false)

    const fields = [
        {
            type: 'textInput',
            name: 'q1',
            label: 'Total Votantes',
            disabled: true,
            value: '200',
            rules: {
                required: true,
                type: 'number',
            },
            inputLabel: {
                display: true
            }
        },
        {
            type: 'textInput',
            name: 'q2',
            label: 'Hora',
            disabled: true,
            value: '1100',
            rules: {
                required: true,
                type: 'text',
            },
            inputLabel: {
                display: true
            }
        }
    ]

    const mesas = [
        {
            name: 'Mesa 1',
            value: '20'
        },
        {
            name: 'Mesa 2',
            value: '20'
        },
        {
            name: 'Mesa 3',
            value: '20'
        },
        {
            name: 'Mesa 4',
            value: '20'
        },
        {
            name: 'Mesa 5',
            value: '20'
        },
        {
            name: 'Mesa 6',
            value: '20'
        },
        {
            name: 'Mesa 7',
            value: '20'
        },
        {
            name: 'Mesa 8',
            value: '20'
        },
        {
            name: 'Mesa 9',
            value: '20'
        },
        {
            name: 'Mesa 10',
            value: '20'
        }
    ]

    const handleOpen = ( mesa) => {
        setOpen(true)
        setDisplayModal(mesa)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <HeaderCustom />
            <Container component="main" maxWidth="xs" sx={{mb: 20}}>
                <Typography variant="h3" sx={{mb: 5, ml: 5, mt: 1, fontWeight: 700, color: "grey.grisOscuro"}} >
                    Delegados
                </Typography>
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 5
                    }}
                >
                    <Typography variant="h1" sx={{mb: 5}}>
                        Elección de Congreso 2022
                    </Typography>
                    <Typography variant="h2" sx={{mb: 5}} >
                        Informe puesto de votación
                    </Typography>
                    <FormControl component="fieldset" sx={{width: 1, display: 'flex', flexDirection: 'row'}}>
                        <Grid container direction="row" spacing={4} sx={{mb: 1, width: 1}} >
                        {
                            fields.map(field =>
                                field.inputLabel.display === true ?
                                    (
                                        <Grid item xs={6} key={field.name}>
                                            <Typography variant="h3" sx={{mb: '10px', mt: 3, color: 'grey.grisOscuro'}}>
                                                {
                                                    field.label
                                                }
                                            </Typography>
                                            <TextField
                                                type="number"
                                                variant="outlined"
                                                required={true}
                                                autoFocus={true}
                                                disabled={field.disabled}
                                                value={field.value}
                                            />
                                        </Grid>
                                    ) : null
                            )
                        }
                        </Grid>
                    </FormControl>

                    <Grid container direction="row" spacing={4}>
                        {
                            mesas.map(mesa => {
                                return (
                                    <Grid key={mesa.name} item xs={4} sx={{mt: 4,  width: '100px',}} >
                                        <a onClick={()=>handleOpen( mesa.name)} style={{textDecoration: 'none'}}>
                                            <Paper sx={{ height: '100px', borderRadius: '15px',  display: 'flex', flexDirection: 'column', alignItems: 'center'}} elevation={3}>
                                                <Box sx={{ borderTopRightRadius: '15px', borderTopLeftRadius: '15px', width: 1, backgroundColor: 'primary.main', height: '12px'}}/>
                                                <Typography color="primary.main" sx={{ mt: 3, textDecoration: 'none'}} variant="h4" textAlign="center">{mesa.name}</Typography>
                                                <Typography variant="h6" sx={{ mt: 2}}>{mesa.value}</Typography>
                                            </Paper>
                                        </a>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8}} href={'home'} text={'GUARDAR'} type='primario' />
                </Box>
                <CommonDialog
                    isinput={true}
                    mesa={displayModal}
                    dialogTitle='Ingrese la cantidad de votantes de la '
                    displayModal={displayModal.display}
                    open={open}
                    onClose={handleClose}
                />
            </Container>
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion7
