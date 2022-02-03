import React, {useCallback, useEffect, useState} from "react";

import {useForm} from "react-hook-form";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, MenuItem, Typography, Select} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";
import validateFunction from "../../utilities/validateFields";
import _ from "underscore";
import CommonDialog from "../commons/CommonDialog";
import {useNavigate} from "react-router-dom";
import validateErrors from "../../utilities/validateErrors";
import axios from "axios";
import useFetch from "../../utilities/useFetch";

const q11Options = [
    {
        label: 'Si',
        value: 'SI'
    },
    {
        label: 'No',
        value: 'NO'
    }
]

const InformesPuestosVotacion11 = () => {
    const { control, formState, watch, clearErrors, setError } = useForm({
        defaultValues: {
            q11: '',
            q11Novelty: '',
            q11AddInput: ''
        }
    })
    const { errors, touchedFields, dirtyFields  } = formState;
    const [open, setOpen] = useState(false)
    const [displayQ11Novelty, setDisplayQ11Novelty] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const [confirmaRespuesta, setConfirmaRespuesta] = useState(false)
    const values = watch()
    let navigate = useNavigate();
    const url = process.env.API_PUESTOS_URL + '/delegates/places'
    const noveltiesUrl =  process.env.API_PUESTOS_URL + '/novelties?eventTypeCode=06'
    const { data, loading, error } = useFetch(noveltiesUrl)

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
        const handleQ9Display = () => {
            if (values.q11 === 'SI') {
                setDisplayQ11Novelty(false)
            }
            if (values.q11 === 'NO') {
                setDisplayQ11Novelty(true)
            }
        }
        handleQ9Display()
    }, [formState])

    const fields = [
        {
            type: 'radioGroup',
            name: 'q11',
            row: true,
            display: true,
            label: '¿Se realizó la recolección de urnas y cubículos en el puesto?',
            rules: {
                required: true,
                type: 'string',
                validate: (value) => {
                    if (q11Options.findIndex(option => option.value === value) === -1) {
                        return 'invalid selection'
                    }
                }
            },
            options: q11Options
        },
        {
            name: 'q11Novelty',
            label: 'Seleccione una novedad',
            novelty: true,
            display: displayQ11Novelty,
            rules: {
                required: displayQ11Novelty,
                type: "string",
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: data && data.data
        },
    ]

    const handleOpen = () => {
        setConfirmaRespuesta(true)
        setOpen( true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const bodyNo = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120873152",
                "question":"11",
                "answer": values.q11,
                "novelty": values.q11Novelty
            }
        }
    }
    const bodySi = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120873152",
                "question":"11",
                "answer": values.q11,
            }
        }
    }
    const postNovedadesData = async (body) => {
        let response
        try {
            response = await axios.post( url, body )
            response = await response.data
            console.log(response)
            if (response.data.status === 201) {
                setAcceptButton(true)
                navigate('/informes_puestos_votacion12')
            }
            return response
        } catch (e) {
            console.log(e)
        }
    }

    const fieldValidation = () => {
        switch(values.q11){
            case 'NO':
                return dirtyFields.q11Novelty !== undefined
            case 'SI':
                return true
            default:
                return
        }
    }
    const onSubmit = useCallback(
        async (e, values, fields, dirtyFields, setError, errors, touchedFields ) => {
            clearErrors()
            try {
                validateFunction(fields, errors, values, setError)
                if (_.isEmpty( errors )) {
                    validateFunction(fields, errors, values, setError)
                    if (_.isEmpty( errors ) && _.isEmpty(touchedFields) === false && fieldValidation()  ) {
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
                    <Box component="form" noValidate sx={{ mt: 1, width: 1 }} display="flex" flexDirection='column' alignItems='center'>
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
                        </FormControl>
                        <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8}} onClick={async (e )=> onSubmit(e, values, fields, dirtyFields, setError, errors, touchedFields)} text={'GUARDAR'} type='primario' />
                    </Box>
                    {
                        confirmaRespuesta ?
                            <CommonDialog
                                open={open}
                                onClose={handleClose}
                                submitInfo={postNovedadesData}
                                bodyInfo={ values.q11 === 'SI' ? bodySi : bodyNo}
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

export default InformesPuestosVotacion11