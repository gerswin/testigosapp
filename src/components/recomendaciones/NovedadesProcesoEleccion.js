import React, {useEffect, useCallback, useState} from "react";
import _ from "underscore";

import { useForm } from "react-hook-form";
import axios from 'axios'
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, Typography, Dialog, DialogTitle} from "@mui/material";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";
import useFetch from "../../utilities/useFetch";
import DropdownInput from "../formFieldsControlled/DropdownInput";
import validateFunction from "../../utilities/validateFields";
import CommonTextField from "../formFieldsControlled/CommonTextField";
import CommonDialog from "../commons/CommonDialog";
import validateErrors from '../../utilities/validateErrors'
import {useNavigate} from "react-router-dom";

const data =  [
    {
        label: 'Disturbios',
        id: 4
    },
    {
        label: 'Sucesos ambientales',
        id: 10
    },
    {
        label: 'Conflictos',
        id: 3
    },
    {
        label: 'Protestas',
        id: 5
    },
]


const NovedadesProcesoEleccion = () => {
    const { control, handleSubmit, formState, clearErrors, getValues, setError} = useForm({
        defaultValues: {
            noveltiesDropdown: '',
            newNovelty: ''
        }
    })
    const { errors, touchedFields, dirtyFields } = formState;
    const url = process.env.API_PUESTOS_URL + '/delegates/places'
    //const { data, loading, error } = useFetch(url)
    const [dialogTitle, setDialogTitle] = useState('¿Desea enviar la novedad?')
    const [open, setOpen] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const values = getValues()
    let navigate = useNavigate();


    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
    }, [formState])

    const fields = [
        {
            type: 'dropdown',
            name: 'noveltiesDropdown',
            label: 'Tipo de novedad',
            rules: {
                required: true,
                type: 'string',
                validate: (value) => {
                    if (data.findIndex(novelty => novelty.value === value) === -1) {
                        return 'invalid novelty selection'
                    }
                }
            },
            options: data,
            defaultValue: 'Por favor seleccione..'
        },
        {
            type: 'multiline',
            name: 'newNovelty',
            multiline: true,
            label: 'Por favor ingrese la novedad presentada',
            rules: {
                required: true,
                type: 'string',
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            }
        }
    ]

    const body = {
        "data": {
            "type": "placesReports",
            "attributes": {
                "document":"1120387794",
                "question":"12",
                "observation":"protestas",
                "novelty": values.newNovelty
            }
        }
    }

    const handleOpen = ( mesa) => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const postNovedadesData = async (body) => {
        let response
        try {
            response = await axios.post( url, body )
            response = response.data
            console.log(response)
            if (response.data.status === 201) {
                setDialogTitle('La novedad ha sido enviada')
                setAcceptButton(true)
                navigate('/novedades_proceso_eleccion')
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
                        Novedades del proceso
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(data => console.log(data))} noValidate sx={{ mt: 1, width: 1 }} display="flex" flexDirection='column' alignItems='left'>
                        <FormControl component="fieldset" sx={{width: 1}}>
                            <DropdownInput
                                name={fields[0].name}
                                label={fields[0].label}
                                defaultValue={fields[0].defaultValue}
                                options={fields[0].options}
                                rules={fields[0].rules}
                                control={control}
                                error={errors[fields[0].name]}
                            />

                            {
                                fields.slice(1, 2).map(field => (
                                    <CommonTextField
                                        multiline={field.multiline}
                                        key={field.name}
                                        name={field.name}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        control={control}
                                        rules={field.rules}
                                        error={errors[field.name]}
                                    />
                                ))
                            }
                            <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8, alignSelf: 'center'}} onClick={async (e )=> onSubmit(e, values, fields, dirtyFields, setError, errors, touchedFields)} text={'GUARDAR'} type='primario' />
                        </FormControl>
                    </Box>
                </Box>
                <CommonDialog
                    open={open}
                    onClose={handleClose}
                    submitInfo={postNovedadesData}
                    bodyInfo={body}
                    dialogTitle={dialogTitle}
                    acceptButton={acceptButton}
                />
            </Container>
            <Footer/>
        </>
    )
}

export default NovedadesProcesoEleccion