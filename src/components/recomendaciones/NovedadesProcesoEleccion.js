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

/*const data =  [
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
]*/


const NovedadesProcesoEleccion = () => {
    const { control, handleSubmit, formState, clearErrors, getValues, setError} = useForm({
        defaultValues: {
            noveltiesDropdown: '',
            newNovelty: ''
        }
    })
    const { errors, touchedFields, dirtyFields } = formState;
    const [dialogTitle, setDialogTitle] = useState('¿Desea enviar la novedad?')
    const [open, setOpen] = useState(false)
    const [acceptButton, setAcceptButton] = useState(false)
    const [noveltiesData, setNoveltiesData] = useState([])
    const values = getValues()
    let navigate = useNavigate();
    const url = process.env.API_PUESTOS_URL + '/delegates/places'
    const noveltiesUrl = process.env.API_PUESTOS_URL + '/novelties?eventTypeCode=07'
    //const { data, loading, error } = useFetch(noveltiesUrl)

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
        const fetchNovelties = () => {
            const source = axios.CancelToken.source();
            axios.get(noveltiesUrl, { cancelToken: source.token })
                .then(res => {
                    setNoveltiesData(res && res.data && res.data.data);
                    console.log(noveltiesData)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchNovelties()
    }, [noveltiesUrl])

    const fields = [
        {
            type: 'dropdown',
            name: 'noveltiesDropdown',
            label: 'Tipo de novedad',
            mesas: true,
            rules: {
                required: true,
                type: 'string',
                validate: (value) => {
                    if (noveltiesData.findIndex(novelty => novelty.value === value) === -1) {
                        return 'invalid novelty selection'
                    }
                }
            },
            options: noveltiesData,
            //defaultValue: 'Por favor seleccione..'
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
                "document":"1120873152",
                "question":"12",
                "observation": values.noveltiesDropdown,
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
                                mesas={fields[0].mesas}
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