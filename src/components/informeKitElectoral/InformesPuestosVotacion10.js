import React, {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, MenuItem, Typography, Select} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";
import {useNavigate} from "react-router-dom";
import validateErrors from "../../utilities/validateErrors";
import axios from "axios";
import validateFunction from "../../utilities/validateFields";
import _ from "underscore";
import CommonDialog from "../commons/CommonDialog";
import useFetch from "../../utilities/useFetch";

const q9Options = [
    {
        label: 'Si',
        value: 'SI'
    },
    {
        label: 'No',
        value: 'NO'
    }
]

const InformesPuestosVotacion10 = () => {
    const { control, formState, watch, clearErrors, setError } = useForm({
        defaultValues: {
            q9: '',
            q9Novelty: '',
            q9AddInput: ''
        }
    })
    const { errors, touchedFields, dirtyFields  } = formState;
    const [open, setOpen] = useState(false)
    const [displayQ9Novelty, setDisplayQ9Novelty] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const [confirmaRespuesta, setConfirmaRespuesta] = useState(false)
    const values = watch()
    const placesUrl = process.env.API_PUESTOS_URL + '/delegates/places'
    const noveltiesUrl =  process.env.API_PUESTOS_URL + '/novelties?eventTypeCode=05'
    const { data, loading, error } = useFetch(noveltiesUrl)

    let navigate = useNavigate();

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
        const handleQ9Display = () => {
            if (values.q9 === 'SI') {
                setDisplayQ9Novelty(false)
            }
            if (values.q9 === 'NO') {
                setDisplayQ9Novelty(true)
            }
        }
        handleQ9Display()
    }, [formState])

    const fields = [
        {
            type: 'radioGroup',
            name: 'q9',
            label: '¿Se realizó entrega de pliegos electorales en la comisión escrutadora?*',
            row: true,
            display: true,
            rules: {
                required: true,
                type: 'string',
                validate: (value) => {
                    if (q9Options.findIndex(option => option.value === value) === -1) {
                        return 'invalid selection'
                    }
                }
            },
            options: q9Options
        },
        {
            type: 'input',
            name: 'q9Novelty',
            label: 'Seleccione una novedad',
            novelty: true,
            display: displayQ9Novelty,
            rules: {
                required: true,
                type: "string",
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: data && data.data,
            addInput: true,
            inputLabel: {
                name: 'q9AddInput',
                rules: {
                    required: values.q9Novelty === 'Otra',
                    type: 'string',
                    validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
                },
            }
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
                "question":"9",
                "answer": values.q9,
                "novelty": values.q9Novelty
            }
        }
    }
    const bodySi = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120873152",
                "question":"9",
                "answer": values.q9,
            }
        }
    }
    const postNovedadesData = async (body) => {
        let response
        try {
            response = await axios.post( placesUrl, body )
            response = await response.data
            console.log(response)
            if (response.data.status === 201) {
                setAcceptButton(true)
                navigate('/informes_puestos_votacion11')
            }
            return response
        } catch (e) {
            console.log(e)
        }
    }

    const fieldValidation = () => {
        switch(values.q9){
            case 'NO':
                return dirtyFields.q9Novelty !== undefined
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
                    if (_.isEmpty( errors ) && _.isEmpty(dirtyFields) === false && fieldValidation()  ) {
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
                                bodyInfo={ values.q9 === 'SI' ? bodySi : bodyNo}
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

export default InformesPuestosVotacion10