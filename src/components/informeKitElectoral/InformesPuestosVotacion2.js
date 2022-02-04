import {useForm} from "react-hook-form";
import {Route, useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, Typography} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";
import validateErrors from "../../utilities/validateErrors";
import axios from "axios";
import validateFunction from "../../utilities/validateFields";
import _ from "underscore";
import CommonDialog from "../commons/CommonDialog";
import useFetch from "../../utilities/useFetch";

const radioq2 = [
    {
        label: 'Si',
        value: 'SI'
    },
    {
        label: 'Si con novedad',
        value: 'SI_CON_NOVEDAD',
    },
    {
        label: 'No',
        value: 'NO'
    }
]

const InformesPuestosVotacion2 = () => {
    const { control, formState, watch, clearErrors, setError} = useForm({
        defaultValues: {
            q2: '',
            q2SiCon: '',
            q2No: '',
            q2SiConAddInput: '',
            q2NoAddInput: ''
        }
    })
    const { errors, touchedFields, dirtyFields } = formState;
    const [open, setOpen] = useState(false)
    const [displayQ2No, setDisplayQ2No] = useState(false)
    const [displayQ2SiCon, setDisplayQ2SiCon] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const [confirmaRespuesta, setConfirmaRespuesta] = useState(false)
    const [novelties03, setNovelties03] = useState([])
    const values = watch()
    const url = process.env.API_PUESTOS_URL + '/delegates/places'
    let navigate = useNavigate();

    const noveltiesUrl02 = process.env.API_PUESTOS_URL + '/novelties?eventTypeCode=02'
    const noveltiesUrl03 = process.env.API_PUESTOS_URL + '/novelties?eventTypeCode=03'
    let { data, loading, error } = useFetch(noveltiesUrl02)

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
        const handleQ2Display = () => {
            if (values.q2 === 'NO' ) {
                setDisplayQ2SiCon(false)
                setDisplayQ2No(true)
            }
            if (values.q2 === 'SI') {
                setDisplayQ2No(false)
                setDisplayQ2SiCon(false)
            }
            if (values.q2 === 'SI_CON_NOVEDAD') {
                setDisplayQ2No(false)
                setDisplayQ2SiCon(true)
            }
        }
        handleQ2Display()
    }, [formState])

    useEffect(()=>{
        const fetchNovelties = () => {
            const source = axios.CancelToken.source();
            axios.get(noveltiesUrl03, { cancelToken: source.token })
                .then(res => {
                    setNovelties03(res.data);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchNovelties()
    }, [noveltiesUrl03])

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
            name: 'q2',
            label: '¿Abrió el puesto de votación?',
            row: true,
            rules: {
                required: true,
                type: 'radio',
                validate: (value) => {
                    if (radioq2.findIndex(option => option.value === value) === -1) {
                        return 'invalid selection'
                    }
                }
            },
            options: radioq2
        },
        {
            type: 'radioGroup',
            name: 'q2SiCon',
            novelty: true,
            display: displayQ2SiCon,
            label: 'Seleccione una novedad',
            rules: {
                required: values.q2 === 'SI_CON_NOVEDAD',
                type: "string",
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: data && data.data,
            addInput: true,
            inputLabel: {
                name: 'q2AddInput',
                rules: {
                    required: values.q2SiCon === 'Otra',
                    type: 'string',
                    validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
                },
            }
        },
        {
            type: 'radioGroup',
            name: 'q2No',
            novelty: true,
            display: displayQ2No,
            label: 'Seleccione una novedad',
            rules: {
                required: values.q2 === 'NO',
                type: "string",
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: novelties03.data,
            addInput: true,
            inputLabel: {
                name: 'q9AddInput',
                rules: {
                    required: values.q2SiCon === 'Otra',
                    type: 'string',
                    validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
                },
            }
        },
    ]

    const sendNovelty = () => {
        switch (values.q2) {
            case 'NO':
                return values.q2No
            case 'SI':
                return ''
            case 'SI_CON_NOVEDAD':
                return values.q2SiCon
        }
    }

    const bodySi = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120873152",
                "question":"2",
                "answer": values.q2,
            }
        }
    }

    const bodyNo = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120873152",
                "question":"2",
                "answer": values.q2,
                "novelty": sendNovelty()
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
                navigate('/informes_puestos_votacion3')
            }
            return response
        } catch (e) {
            console.log(e)
        }
    }
    const fieldValidation = () => {
        switch(values.q2){
            case 'SI_CON_NOVEDAD':
                return dirtyFields.q2SiCon !== undefined
            case 'NO':
                return dirtyFields.q2No !== undefined
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
                    if (_.isEmpty( errors ) && _.isEmpty(dirtyFields) === false && fieldValidation()) {
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
                        <FormControl component="fieldset" sx={{width: 1}} >
                            {
                                fields.slice(0, 1).map(field => (
                                    <CommonRadioGroup
                                        key={field.name}
                                        field={field}
                                        error={errors[field.name]}
                                        control={control}
                                    />
                                ) )
                            }
                            {
                                fields.slice(1,3).map(field => field.display === true ? (
                                    <CommonRadioGroup
                                        key={field.name}
                                        field={field}
                                        error={errors[field.name]}
                                        control={control}
                                    />
                                ) : null )
                            }
                        </FormControl>
                        <CommonButton style={{margin: '0 auto'}} sx={{ mt: 10, alignSelf: 'center'}} onClick={async (e )=> onSubmit(e, values, fields, dirtyFields, setError, errors, touchedFields)} text={'GUARDAR'} type='primario' />
                        {
                            confirmaRespuesta ?
                                <CommonDialog
                                    open={open}
                                    onClose={handleClose}
                                    submitInfo={postNovedadesData}
                                    bodyInfo={ values.q2 === 'SI' ? bodySi : bodyNo}
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

export default InformesPuestosVotacion2