import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, TextField, Typography, Snackbar} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";

const InformesPuestosVotacion12 = () => {
    const { control, formState} = useForm({
        defaultValues: {
            q1: '',
            q2: ''
        }
    })
    const { errors } = formState;
    const [newAlert, setNewAlert] = useState({displayAlert: false, alertMessage: ''})

    useEffect(()=>{
        const showErrorAlert = () => {
            if (Object.values(errors).length >= 1) {
                setNewAlert({
                    ...newAlert,
                    displayAlert: true,
                    alertMessage: 'Debe seleccionar una opción válida para continuar'
                })
            }
        }
        return showErrorAlert()
    }, [formState.errors])
    const handleAlertClose = () => {
        setNewAlert({
            ...newAlert,
            displayAlert: false,
            alertMessage: ""
        })
    }

    const fields = [
        {
            type: 'radioGroup',
            name: 'q1',
            label: '¿Se realizó el respectivo aseo y organización del puesto al finalizar la jornada electoral?',
            rules: {
                required: true,
                type: 'radio',
            },
            options: [
                {
                    label: 'Si',
                    value: 'si'
                },
                {
                    label: 'No',
                    value: 'no'
                }
            ]
        }
    ]

    return (
        <>
            <HeaderCustom />
            <Container component="main" maxWidth="xs" sx={{mb: 20}}>
                <Typography variant="h3" sx={{mb: 5, ml: 5, mt: 5, fontWeight: 700, color: "grey.grisOscuro"}} >
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
                    <Box component="form" noValidate sx={{ mt: 1, width: 1 }} display="flex" flexDirection='column' alignItems='center'>
                        <FormControl component="fieldset" sx={{width: 1}}>
                            {
                                fields.map(field =>
                                    <>
                                        <CommonRadioGroup
                                            key={field.name}
                                            field={field}
                                            error={errors[field.name]}
                                            control={control}
                                        />
                                    </>
                                )
                            }
                            <Typography variant="h3" sx={{mb: '10px', mt: 5, color: 'grey.grisOscuro'}}>
                                Registre las observaciones
                            </Typography>
                            <TextField
                                id="informes12q2"
                                multiline
                                rows={4}
                            />

                        </FormControl>

                        <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8}} href={'recomendaciones_encuesta'} text={'GUARDAR'} type='primario' />
                    </Box>
                </Box>
            </Container>
            <Snackbar
                open={newAlert.displayAlert}
                autoHideDuration={5000}
                sx={{display: 'flex', mb: 15, padding: '16px', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgb(251, 235, 234)'}}
                onClose={handleAlertClose}
                children={(
                    <Typography variant="alertTittleS" >{newAlert.alertMessage}</Typography>
                )}
                anchorOrigin={{ vertical: 'bottom', horizontal: "center" }}
            />
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion12