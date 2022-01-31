import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, TextField, Typography} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";
import axios from "axios";
import validateFunction from "../../utilities/validateFields";
import _ from "underscore";
import CommonDialog from "../commons/CommonDialog";
import CommonTextField from "../formFieldsControlled/CommonTextField";
import validateErrors from "../../utilities/validateErrors";

const q3Options = [
    {
        label: 'Si',
        value: 'SI'
    },
    {
        label: 'No',
        value: 'NO',
    }
]

const q4Options = [
    {
        label: 'Si',
        value: 'SI'
    },
    {
        label: 'No',
        value: 'NO',
    }
]

const InformesPuestosVotacion3 = () => {
    const [displayQ3Input, setDisplayQ3Input] = useState(false)
    const [displayQ4Input, setDisplayQ4Input] = useState(false)
    const [open, setOpen] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const [confirmaRespuesta, setConfirmaRespuesta] = useState(false)
    const { control, formState, watch, clearErrors, setError } = useForm({
        defaultValues: {
            q3: '',
            q3MissingJury: "",
            q4: '',
            q4RemmantsUsed: ""
        }
    })
    const { errors, dirtyFields, touchedFields } = formState;
    const values = watch()
    const url = process.env.API_PUESTOS_URL + '/delegates/places'
    let navigate = useNavigate();

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
        const handleQ2Display = () => {
            if (values.q3 === 'NO') {
                setDisplayQ3Input(true)
            }
            if (values.q3 === 'SI') {
                setDisplayQ3Input(false)
            }
            if (values.q4 === 'NO') {
                setDisplayQ4Input(false)
            }
            if (values.q4 === 'SI') {
                setDisplayQ4Input(true)
            }
        }
        handleQ2Display()
    }, [formState])

    const handleOpen = () => {
        setConfirmaRespuesta(true)
        setOpen( true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const fields = [
        {
            type: 'radioGroup',
            name: 'q3',
            label: '¿Llegaron los jurados de votación? *',
            rules: {
                required: true,
                type: 'string',
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: q3Options,
            inputLabel: {
                display: displayQ3Input,
                name: 'q3MissingJury',
                rules: {
                    required: true,
                    type: "number",
                    validate: (value) => typeof value !== 'number' ? 'typeof value error' : true
                },
            }
        },
        {
            type: 'input',
            name: 'q4',
            label: '¿Hubo reemplazo de jurados? *',
            rules: {
                required: true,
                type: "string",
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: q4Options,
            inputLabel: {
                display: displayQ4Input,
                name: 'q4RemmantsUsed',
                rules: {
                    required: true,
                    type: "number",
                    validate: (value) => typeof value !== 'number' ? 'typeof value error' : true
                },
            }
        },
    ]

    const body = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120387794",
                "questions":[
                    {
                        "question":"3",
                        "answer": values.q3,
                        //confirmar valores correctos para el backend
                        //"missingJury": values.q3MissingJury
                    },
                    {
                        "question":"4",
                        "answer": values.q4,
                        //confirmar valores correctos para el backend
                        //"RemnantsUsed": values.q4RemmantsUsed
                    }
                ]
            }
        }
    }

    const postNovedadesData = async (body) => {
        let response
        try {
            response = await axios.post( url, body )
            response = response.data
            console.log(response)
            if (response.data.status === 201) {
                setAcceptButton(true)
                navigate('/informes_puestos_votacion6')
            }
            return response
        } catch (e) {
            console.log(e)
        }
    }

    const fieldValidation = () => {
        switch(values.q3){
            case 'NO':
                return dirtyFields.q3MissingJury !== undefined
            case 'SI':
                return true
            default:
                return
        }
    }

    const fieldValidation2 = () => {
        switch(values.q4){
            case 'SI':
                return dirtyFields.q4RemmantsUsed !== undefined
            case 'NO':
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
                    console.log('level1', dirtyFields, errors)
                    if (_.isEmpty( errors ) && _.isEmpty(dirtyFields) === false && fieldValidation() && fieldValidation2()) {
                        console.log('level1', dirtyFields, errors)
                        validateFunction(fields, errors, values, setError)
                        if (_.isEmpty( errors )) {
                            handleOpen()
                        }
                    } else {
                        validateFunction(fields, errors, values, setError)
                    }
                }
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
                                fields.map(field =>
                                    <Box key={field.name}>
                                        <CommonRadioGroup
                                            key={field.name}
                                            field={field}
                                            error={errors[field.name]}
                                            control={control}
                                        />
                                        {
                                            field.inputLabel.display === true ?
                                                (
                                                    <>
                                                        <CommonTextField
                                                            //key={field.name}
                                                            name={field.inputLabel.name}
                                                            //label={field.label}
                                                            placeholder="00"
                                                            control={control}
                                                            rules={field.inputLabel.rules}
                                                            error={errors[field.inputLabel.name]}
                                                        />
                                                    </>
                                                ) : null
                                        }
                                    </Box>
                                )
                            }
                        </FormControl>
                        <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8}} onClick={async (e )=> onSubmit(e, values, fields, dirtyFields, setError, errors, touchedFields)} text={'GUARDAR'} type='primario' />
                        {
                            confirmaRespuesta ?
                                <CommonDialog
                                    open={open}
                                    onClose={handleClose}
                                    submitInfo={postNovedadesData}
                                    bodyInfo={ body }
                                    dialogTitle={'¿Confirma su respuesta?'}
                                    acceptButton={acceptButton}
                                /> : null
                        }
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion3