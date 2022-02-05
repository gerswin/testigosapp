import React, {useCallback, useEffect, useState} from "react";
import {Route, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, TextField, MenuItem, Typography, Select} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";
import validateErrors from "../../utilities/validateErrors";
import axios from "axios";
import validateFunction from "../../utilities/validateFields";
import _ from "underscore";
import CommonDialog from "../commons/CommonDialog";

const q7Options = [
    {
        label: 'Si',
        value: 'SI'
    },
    {
        label: 'No',
        value: 'NO',
    }
]
const InformesPuestosVotacion8 = () => {
    const { control, formState, clearErrors, getValues, setError} = useForm({
        defaultValues: {
            q7: ''
        }
    })
    const { errors, touchedFields, dirtyFields } = formState;
    const [open, setOpen] = useState(false)
    const [confirmaRespuesta, setConfirmaRespuesta] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const values = getValues()
    const url =  process.env.API_PUESTOS_URL + '/delegates/places'
    let navigate = useNavigate();
    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
    }, [formState])
    const fields = [
        {
            type: 'radioGroup',
            name: 'q7',
            row: true,
            label: '¿Se utilizó tarjetas braile?',
            rules: {
                required: true,
                type: 'string',
                validate: (value) => {
                    if (q7Options.findIndex(option => option.value === value) === -1) {
                        return 'invalid selection'
                    }
                }
            },
            options: q7Options
        }
    ]

    const body = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120873152",
                "question":"7",
                "answer": values.q7,
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
                navigate('/informes_puestos_votacion9')
            }
            return response
        } catch (e) {
            console.log(e)
        }
    }

    const onSubmit = useCallback(
        async (e, values, fields, dirtyFields, setError, errors, touchedFields ) => {
            clearErrors()
            try {
                validateFunction(fields, errors, values, setError)
                if (_.isEmpty( errors )) {
                    validateFunction(fields, errors, values, setError)
                    if (_.isEmpty( errors ) && _.isEmpty(touchedFields) === false && _.values(values).includes('') === false  ) {
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
                    <Box component="form" noValidate sx={{ mt: 1, width: 1 }} display="flex" flexDirection='column' alignItems='left'>
                        <FormControl component="fieldset" sx={{width: 1}}>
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
                        <Typography variant="h3" textAlign='left' sx={{ mb: '10px', mt: 4, color: 'grey.grisOscuro'}}>
                            Descipción:
                        </Typography>
                        <Typography variant="actionDrop">
                            Colombia garantiza el voto en Braile, siendo el Instituto Nacional para Ciegos -INCI quién imprime los tarjetones en braile, de acuerdo al mandato de la Corte Constitucional de la Sentencia T-487 de 2003
                        </Typography>

                        <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8, alignSelf: 'center'}} onClick={async (e )=> onSubmit(e, values, fields, dirtyFields, setError, errors, touchedFields)}  text={'GUARDAR'} type='primario' />
                    </Box>
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
            </Container>
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion8