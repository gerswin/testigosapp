import {Route, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useCallback, useEffect, useState} from "react";
import _ from "underscore";

import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, TextField, MenuItem, Typography, Select} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";
import validateErrors from "../../utilities/validateErrors";
import CommonDialog from "../commons/CommonDialog";
import axios from "axios";
import validateFunction from "../../utilities/validateFields";
import DropdownInput from "../formFieldsControlled/DropdownInput";
import useFetch from "../../utilities/useFetch";

const q6Options = [
    {
        label: 'Si',
        value: 'SI'
    },
    {
        label: 'No',
        value: 'NO',
    }
]

const InformesPuestosVotacion5 = () => {
    const { control, formState, clearErrors, watch, setError } = useForm({
        defaultValues: {
            q6: '',
            q6Mesa: '',
            q6Novelty: '',
            q6NoveltyAddInput: ''
        }
    })
    const { errors, touchedFields, dirtyFields } = formState;
    const [open, setOpen] = useState(false)
    const [confirmaRespuesta, setConfirmaRespuesta] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const [displayQ6Novelty, setDisplayQ6Novelty ] = useState(false)
    const [mesasData, setMesasData] = useState([])
    let navigate = useNavigate();
    const values = watch()
    const placesUrl =  process.env.API_PUESTOS_URL + '/delegates/places'
    const noveltiesUrl =  process.env.API_PUESTOS_URL + '/novelties?eventTypeCode=04'
    const tablesUrl =  process.env.API_PUESTOS_URL + '/delegates/table?document=1120873152'
    const { data, loading, error } = useFetch(noveltiesUrl)

    useEffect(()=>{
        const fetchMesas = () => {
            const source = axios.CancelToken.source();
            axios.get(tablesUrl, { cancelToken: source.token })
                .then(res => {
                    setMesasData(res && res.data && res.data.data && res.data.data.attributes && res.data.data.attributes.tableAssignment);
                    console.log(mesasData)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchMesas()
    }, [tablesUrl])

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
        const handleQ6Display = () => {
            if (values.q6 === 'NO' ) {
                setDisplayQ6Novelty(true)
            }
            if (values.q6 === 'SI') {
                setDisplayQ6Novelty(false)
            }
        }
        handleQ6Display()
    }, [formState])

    const fields = [
        {
            type: 'radioGroup',
            name: 'q6',
            label: '¿Se realizó el inicio de las votaciones?',
            row: true,
            rules: {
                required: true,
                type: 'string',
                validate: (value) => {
                    if (q6Options.findIndex(option => option.value === value) === -1) {
                        return 'invalid selection'
                    }
                }
            },
            options: q6Options,
        },
        {
            type: 'dropdown',
            name: 'q6Mesa',
            label: 'Seleccione la mesa',
            display: true,
            mesas: true,
            rules: {
                required: true,
                type: 'string',
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: mesasData ,
            defaultValue: 'Por favor seleccione..'
        },
        {
            type: 'radioGroup',
            name: 'q6Novelty',
            novelty: true,
            label: 'Seleccione una novedad',
            display: displayQ6Novelty,
            rules: {
                required: displayQ6Novelty,
                type: "string",
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: data && data.data
        },
    ]

    const bodyNo = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120873152",
                "question":"6",
                "tableCode":values.q6Mesa,
                "answer":values.q6,
                "novelty": values.q6Novelty
            }
        }
    }

    const bodySi = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120873152",
                "question":"6",
                "tableCode":values.q6Mesa,
                "answer":values.q6,
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
            response = await axios.post( placesUrl, body )
            response = await response
            console.log(response)
            if (response.data.data.status === 201) {
                setAcceptButton(true)
                navigate('/home')
            }
            return response
        } catch (e) {
            console.log(e)
        }
    }

    const fieldValidation = () => {
        switch(values.q6){
            case 'SI':
                return dirtyFields.q6Mesa !== undefined
            case 'NO':
                return dirtyFields.q6Mesa !== undefined && dirtyFields.q6Novelty !== undefined
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
                    console.log('level1', errors)
                    if (_.isEmpty( errors ) && _.isEmpty(touchedFields) === false && fieldValidation()  ) {
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
                                fields.slice(0,1).map(field =>
                                    <CommonRadioGroup
                                        id={field.name}
                                        key={field.name}
                                        field={field}
                                        error={errors[field.name]}
                                        control={control}
                                    />
                                )
                            }
                            {
                                fields.slice(1, 2).map(field => field.display === true ? (
                                    <DropdownInput
                                        key={field.name}
                                        name={field.name}
                                        label={field.label}
                                        defaultValue={field.defaultValue}
                                        options={field.options}
                                        rules={field.rules}
                                        control={control}
                                        error={errors[field.name]}
                                        mesas={field.mesas}
                                    />
                                    ) : null
                                )
                            }
                            {
                                fields.slice(2, 3).map(field => field.display === true ? (
                                    <CommonRadioGroup
                                        key={field.name}
                                        field={field}
                                        error={errors[field.name]}
                                        control={control}
                                    />
                                    ) : null
                                )
                            }
                        </FormControl>

                        <CommonButton style={{margin: '0 auto'}}  onClick={async (e )=> onSubmit(e, values, fields, dirtyFields, setError, errors, touchedFields)} sx={{marginTop: 8}} text={'GUARDAR'} type='primario' />
                        {
                            confirmaRespuesta ?
                                <CommonDialog
                                    open={open}
                                    onClose={handleClose}
                                    submitInfo={postNovedadesData}
                                    bodyInfo={ values.q6 === 'SI' ? bodySi : bodyNo}
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

export default InformesPuestosVotacion5