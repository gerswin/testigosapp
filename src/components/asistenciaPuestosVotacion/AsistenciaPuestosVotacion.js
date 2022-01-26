import react, {useCallback, useEffect, useState} from 'react';
import { Box, Typography, Container, FormControl } from "@mui/material"
import _ from "underscore";

import HeaderCustom from '../header/HeaderCustom.js'
import CommonButton from "../commons/CommonButton";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import { useForm } from "react-hook-form";
import Footer from "../footer/Footer";
import validateErrors from '../../utilities/validateErrors'
import axios from "axios";
import validateFunction from "../../utilities/validateFields";

const AsistenciaPuestosVotacion = () => {
    const { control, formState, watch, clearErrors, handleSubmit, setError } = useForm({
        defaultValues: {
            q1: '',
            q2: ''
        }
    })
    const { errors, touchedFields, dirtyFields } = formState;
    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState('¿Confirma su respuesta?')
    const [displayQ2, setDisplayQ2] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const values = watch()

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
    }, [formState])

    useEffect(() => {
        //console.log(values)
        const handleQ2Display = () => {
            if (values.q1 === 'si') {
                setDisplayQ2(false)
            }
            if (values.q1 === 'no') {
                setDisplayQ2(true)
            }
        }
        handleQ2Display()
    }, [formState])

    const fields = [
        {
            type: 'radioGroup',
            name: 'q1',
            display: true,
            label: '¿Se encuentra en el puesto de votación?',
            rules: {
                required: true,
                type: 'radio',
            },
            options: [
                {
                    label: 'Si',
                    value: 'si'
                },
                {
                    label: 'No',
                    value: 'no'
                }
            ]
        },
        {
            type: 'radioGroup',
            name: 'q2',
            display: displayQ2,
            label: 'Seleccione una novedad en caso de no asistir al puesto de votación *',
            rules: {
                required: true,
                type: "radio"
            },
            options: [
                {
                    label: 'Lluvia intensa',
                    value: 'lluvia-intensa'
                },
                {
                    label: 'Retraso personal',
                    value: 'retraso-personal'
                },
                {
                    label: 'Calamidad Familiar',
                    value: 'calamidad-familiar'
                },
                {
                    label: 'Caos Vehicular',
                    value: 'caos-vehicular'
                },
                {
                    label: 'Disturbios',
                    value: 'disturbios'
                },
            ]
        }
    ]


    const handleOpen = ( mesa) => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const url = process.env.API_PUESTOS_URL + '/novelties'

    const postNovedadesData = async (body) => {
        let response
        try {
            response = await axios.post( url, body )
            response = response.data
            console.log(response)
            if (response.data.status === 201) {
                setDialogTitle('La novedad ha sido enviada')
                setAcceptButton(true)
            }
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
                            //await postNovedadesData(body)
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
                    <Box component="form" onSubmit={handleSubmit(data => console.log(data))} noValidate sx={{ mt: 1, width: 1 }} display="flex" flexDirection='column' alignItems='center'>
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
                        <CommonButton style={{margin: '0 auto'}} onClick={async (e )=> onSubmit(e, values, fields, dirtyFields, setError, errors, touchedFields)} text={'GUARDAR'} type='primario' />
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default AsistenciaPuestosVotacion