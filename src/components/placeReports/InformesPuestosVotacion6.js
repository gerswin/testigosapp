import React, {useCallback, useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, Snackbar, Typography} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";
import validateErrors from "../../utilities/validateErrors";
import axios from "axios";
import validateFunction from "../../utilities/validateFields";
import _ from "underscore";
import CommonDialog from "../commons/CommonDialog";

const q5Options = [
    {
        label: 'Si',
        value: 'SI'
    },
    {
        label: 'No',
        value: 'NO',
    }
]

const InformesPuestosVotacion6 = () => {
    const { control, formState, clearErrors, getValues, setError } = useForm({
        defaultValues: {
            q5: '',
        }
    })
    const { errors, touchedFields, dirtyFields } = formState;
    const [open, setOpen] = useState(false)
    const [confirmaRespuesta, setConfirmaRespuesta] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const [newAlert, setNewAlert] = useState({displayAlert: false, alertMessage: ''})
    let navigate = useNavigate();
    const values = getValues()
    const url =  process.env.API_PUESTOS_URL + '/delegates/places'

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
    }, [formState])

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
            name: 'q5',
            row: true,
            label: '¿Hubo presencia de la mesa de justicia?',
            rules: {
                required: true,
                type: 'string',
                validate: (value) => {
                    if (q5Options.findIndex(option => option.value === value) === -1) {
                        return 'invalid selection'
                    }
                }
            },
            options: q5Options
        }
    ]
    const body = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120873152",
                "question":"5",
                "answer": values.q5,
            }
        }
    }
    const handleOpen = () => {
        setConfirmaRespuesta(true)
        setOpen( true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const postNovedadesData = async (body) => {
        let response
        try {
            response = await axios.post( url, body )
            response = await response.data
            console.log(response)
            if (response.data.status === 201) {
                setAcceptButton(true)
                navigate('/informes_puestos_votacion5')
            }
            return response
        } catch (e) {
            console.log(e)
        }
    }

    const onSubmit = useCallback(
        async (e, values, fields, dirtyFields, setError, errors ) => {
            clearErrors()
            try {
                validateFunction(fields, errors, values, setError)
                if (_.isEmpty( errors )) {
                    validateFunction(fields, errors, values, setError)
                    console.log('level1', errors)
                    if (_.isEmpty( errors ) && _.isEmpty(dirtyFields) === false && _.values(values).includes('') === false  ) {
                        if (_.isEmpty( errors )) {
                            handleOpen()
                        }
                    }}
                else {
                    console.log('level4', errors)
                    validateFunction(fields, errors, values, setError)
                }
            } catch (e) {
                console.log(e)
            }
        }, [ formState ]
    )

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
                </Box>
                <Box component="form" noValidate sx={{ mt: 1,px: 4 }} display="flex" flexDirection='column' alignItems='center'>
                    <FormControl component="fieldset" >
                        {
                            fields.map(field =>
                                <CommonRadioGroup
                                    key={field.name}
                                    field={field}
                                    error={errors[field.name]}
                                    control={control}
                                />
                            )
                        }
                    </FormControl>
                    <CommonButton style={{margin: '0 auto'}} onClick={async (e )=> onSubmit(e, values, fields, dirtyFields, setError, errors, touchedFields)} sx={{marginTop: 8}} text={'GUARDAR'} type='primario' />
                    {
                        confirmaRespuesta ?
                            <CommonDialog
                                open={open}
                                onClose={handleClose}
                                submitInfo={postNovedadesData}
                                bodyInfo={body}
                                dialogTitle={'¿Confirma su respuesta?'}
                                acceptButton={acceptButton}
                            /> : null
                    }
                </Box>
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
            </Container>
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion6
