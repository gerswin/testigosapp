import {Route} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useCallback, useEffect, useState} from "react";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, TextField, Typography} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";
import useFetch from "../../utilities/useFetch";
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
    const values = getValues()
    const url =  process.env.API_PUESTOS_URL + '/delegates/places'

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
    }, [formState])

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
                "departmentCode": "88",
                "municipalityCode": "220",
                "zoneCode": "15",
                "placeCode": "02",
                "document":"1143858325",
                "question": "5",
                "answer": values.q5,
                "novelties":"",
                "inputText":"",
                "valueText":""
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
                    console.log('level1', errors)
                    if (_.isEmpty( errors ) && _.isEmpty(touchedFields) === false && _.values(values).includes('') === false  ) {
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
            </Container>
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion6
