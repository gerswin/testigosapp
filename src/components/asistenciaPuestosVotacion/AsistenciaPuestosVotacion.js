import React, {useCallback, useEffect, useState} from 'react';
import { Box, Typography, Container, FormControl, Snackbar } from "@mui/material"
import _ from "underscore";
import HeaderCustom from '../header/HeaderCustom.js'
import CommonButton from "../commons/CommonButton";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import { useForm } from "react-hook-form";
import Footer from "../footer/Footer";
import validateErrors from '../../utilities/validateErrors'
import axios from "axios";
import validateFunction from "../../utilities/validateFields";
import CommonDialog from "../commons/CommonDialog";
import {useNavigate} from "react-router-dom";
import useFetch from "../../utilities/useFetch";
import { useSelector, shallowEqual} from "react-redux";

const radioq1 = [
    {
        label: 'Si',
        value: 'SI'
    },
    {
        label: 'No asistiré',
        value: 'NO'
    }
]

const AsistenciaPuestosVotacion = () => {
    const { control, formState, watch, clearErrors, handleSubmit, setError } = useForm({
        defaultValues: {
            q1: '',
            q1Novelty: ''
        }
    })
    const { errors, touchedFields, dirtyFields } = formState;
    const [open, setOpen] = useState(false)
    const [displayQ2, setDisplayQ2] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const [confirmaRespuesta, setConfirmaRespuesta] = useState(false)
    const [newAlert, setNewAlert] = useState({displayAlert: false, alertMessage: ''})
    const values = watch()
    const placesUrl = process.env.API_PUESTOS_URL + '/delegates/places'
    const noveltiesUrl = process.env.API_PUESTOS_URL + '/novelties?eventTypeCode=01'
    const { data, loading, error } = useFetch(noveltiesUrl)
    let navigate = useNavigate();
    const userLoggedIn = useSelector( state => state.loginNewUser, shallowEqual)

    console.log(userLoggedIn)
    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
        const handleQ2Display = () => {
            if (values.q1 === 'SI') {
                setDisplayQ2(false)
            }
            if (values.q1 === 'NO') {
                setDisplayQ2(true)
            }
        }
        handleQ2Display()
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

    const fields = [
        {
            type: 'radioGroup',
            name: 'q1',
            display: true,
            row: true,
            label: '¿Se encuentra en el puesto de votación?',
            rules: {
                required: true,
                type: 'string',
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: radioq1
        },
        {
            type: 'radioGroup',
            name: 'q1Novelty',
            novelty: true,
            display: displayQ2,
            label: 'Seleccione una novedad en caso de no asistir al puesto de votación *',
            rules: {
                required: values.q1 === 'NO',
                type: "string",
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: data && data.data
        }
    ]

    const body = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document": userLoggedIn,
                "question": "1",
                "novelty": values.q1Novelty || 'SI',
                "answer": values.q1
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
    const handleAlertClose = () => {
        setNewAlert({
            ...newAlert,
            displayAlert: false,
            alertMessage: ""
        })
    }
    const postNovedadesData = async (body) => {
        let response
        try {
            response = await axios.post( placesUrl, body )
            response = await response.data
            console.log(response)
            if (response.data.status === 201) {
                setAcceptButton(true)
                navigate('/informacion_general')
                // Deshabilitar esta pregunta después de haberla respondido
            }
            return response
        } catch (e) {
            console.log(e)
        }
    }
    const fieldValidation = () => {
        switch(values.q1){
            case 'NO':
                return dirtyFields.q1Novelty !== undefined
            case 'SI':
                return true
            default:
                return
        }
    }
    const onSubmit = useCallback(
        async (e, values, fields, dirtyFields, setError, errors ) => {
            clearErrors()
            try {
                validateFunction(fields, errors, values, setError)
                if (_.isEmpty( errors )) {
                    validateFunction(fields, errors, values, setError)
                    if (_.isEmpty( errors ) && _.isEmpty(dirtyFields) === false && fieldValidation() ) {
                        if (_.isEmpty( errors )) {
                            handleOpen()
                        }
                    }}
                else {
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
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: 1 }} display="flex" flexDirection='column' alignItems='center'>
                        <FormControl component="fieldset" sx={{width: 1}}>
                            {
                                fields.map(field => field.display === true ? (
                                    <CommonRadioGroup
                                        key={field.name}
                                        field={field}
                                        error={errors[field.name]}
                                        control={control}
                                    />
                                ) : null )
                            }
                            <CommonButton style={{margin: '0 auto'}} sx={{alignSelf: 'center'}} onClick={async (e )=> onSubmit(e, values, fields, dirtyFields, setError, errors, touchedFields)} text={'GUARDAR'} type='primario' />
                        </FormControl>
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
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default AsistenciaPuestosVotacion