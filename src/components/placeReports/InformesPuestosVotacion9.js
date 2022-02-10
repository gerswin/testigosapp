import {Route, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useCallback, useEffect, useState} from "react";
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

const q8Options = [
    {
        label: 'Si',
        value: 'SI'
    },
    {
        label: 'No',
        value: 'NO',
    }
]

const InformesPuestosVotacion9 = () => {
    const { control, formState, clearErrors, getValues, setError} = useForm({
        defaultValues: {
            q8: ''
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
            name: 'q8',
            row: true,
            label: '¿Se realizó el plan puntilla?',
            rules: {
                required: true,
                type: 'string',
                validate: (value) => {
                    if (q8Options.findIndex(option => option.value === value) === -1) {
                        return 'invalid selection'
                    }
                }
            },
            options: q8Options
        }
    ]

    const body = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120873152",
                "question":"8",
                "answer": values.q8,
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
                navigate('/informes_puestos_votacion10')
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
                    if (_.isEmpty( errors ) && _.isEmpty(dirtyFields) === false && _.values(values).includes('') === false  ) {
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
                            Las copias de los E-14 delegados se fijarán en lugares visibles para que los Testigos Electorales puedan tomar fotos o grabar los documentos originales.
                        </Typography>
                        <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8, alignSelf: 'center'}} onClick={async (e )=> onSubmit(e, values, fields, dirtyFields, setError, errors, touchedFields)} text={'GUARDAR'} type='primario' />
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

export default InformesPuestosVotacion9