import {Route} from "react-router-dom";
import {useForm} from "react-hook-form";
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

const radioq2 = [
    {
        label: 'Si',
        value: 'SI'
    },
    {
        label: 'Si con novedad',
        value: 'Q2SICON',
    },
    {
        label: 'No',
        value: 'NO'
    }
]

const q2SiConOptions = [
    {
        label: 'Sin mesas y sillas',
        value: 'sin_mesas_y_sillas'
    },
    {
        label: 'Urnas y cubículos mojados',
        value: 'urnas_y_cubiculos_mojados'
    },
    {
        label: 'Baños cerrados',
        value: 'baños_cerrados'
    },
    {
        label: 'Otra',
        value: 'otra',
        addInput: true,
    },
]

const q2NoOptions = [
    {
        label: 'Bloqueos para el ingreso al puesto de votación',
        value: 'bloqueos_para_el_ingreso_al_puesto_de_votación'
    },
    {
        label: 'No se encuentra el encargado de las llaves',
        value: 'no_se_encuentra_el_encargado_de_las_llaves'
    },
    {
        label: 'Problemas por disturbios',
        value: 'problemas_por_disturbios'
    },
    {
        label: 'Otra',
        value: 'otra',
        addInput: true
    },
]

const InformesPuestosVotacion2 = () => {
    const { control, formState, watch, clearErrors, setError} = useForm({
        defaultValues: {
            q2: '',
            q2SiCon: '',
            q2No: ''
        }
    })
    const { errors, touchedFields, dirtyFields } = formState;

    const [open, setOpen] = useState(false)
    const [displayQ2No, setDisplayQ2No] = useState(false)
    const [displayQ2SiCon, setDisplayQ2SiCon] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const [confirmaRespuesta, setConfirmaRespuesta] = useState(false)
    const values = watch()
    const url = process.env.API_PUESTOS_URL + '/delegates/places'

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
            if (values.q2 === 'Q2SICON') {
                setDisplayQ2No(false)
                setDisplayQ2SiCon(true)
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
            display: displayQ2SiCon,
            label: 'Seleccione una novedad',
            rules: {
                required: values.q2 === 'Q2SICON',
                type: "string",
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: q2SiConOptions
        },
        {
            type: 'radioGroup',
            name: 'q2No',
            display: displayQ2No,
            label: 'Seleccione una novedad',
            rules: {
                required: values.q2 === 'NO',
                type: "string",
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            },
            options: q2NoOptions
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
                "question":"2",
                "answer": values.q2,
                "novelties": () => {
                    switch (values.q2) {
                        case 'NO':
                            return values.q2No
                        case 'SI':
                            return ''
                        case 'Q2SICON':
                            return values.q2SiCon
                    }
                }
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
            }
            return response
        } catch (e) {
            console.log(e)
        }
    }
    const fieldValidation = () => {
        switch(values.q2){
            case 'Q2SICON':
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
        async (e, values, fields, dirtyFields, setError, errors, touchedFields ) => {
            clearErrors()
            try {
                validateFunction(fields, errors, values, setError)
                if (_.isEmpty( errors )) {
                    validateFunction(fields, errors, values, setError)
                    console.log('level1', values, errors)
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
                                        id={field.name}
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
                                        id={field.name}
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
                                    bodyInfo={body}
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