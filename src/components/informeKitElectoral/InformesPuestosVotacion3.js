import {Route} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, TextField, Typography} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";

const InformesPuestosVotacion3 = () => {
    const [displayQ1Inp, setDisplayQ1Inp] = useState(false)
    const { control, formState, watch} = useForm({
        defaultValues: {
            q1: '',
            q2: ''
        }
    })
    const { errors } = formState;
    const values = watch()

    useEffect(() => {
        const handleQ2Display = () => {
            if (values.q1 === 'no') {
                setDisplayQ1Inp(true)
            }
            if (values.q1 === 'si') {
                setDisplayQ1Inp(false)
            }
        }
        handleQ2Display()
    }, [values])


    const fields = [
        {
            type: 'radioGroup',
            name: 'q1',
            label: '¿Llegaron los jurados de votación? *',
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
                    value: 'no',
                    displayQ1juradosFaltantes: displayQ1Inp
                }
            ],
            inputLabel: {
                display: true,
                title: 'Ingrese la cantidad de jurados faltantes',
                input: true
            }
        },
        {
            type: 'input',
            name: 'q2',
            label: '¿Hubo reemplazo de jurados? *',
            rules: {
                required: false,
                type: "radio"
            },
            options: [
                {
                    label: 'Si',
                    value: 'si'
                },
                {
                    label: 'No',
                    value: 'no',
                    displayQ1juradosFaltantes: displayQ1Inp
                }
            ],
            inputLabel: {
                display: true,
                title: 'Ingrese la cantidad de remanentes utilizados',
                input: true
            }
        },
    ]


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
                                    <>
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
                                                        <Typography variant="h3" sx={{mb: '10px', mt: 3, color: 'grey.grisOscuro'}}>
                                                            {
                                                                field.inputLabel.title
                                                            }
                                                        </Typography>
                                                        <TextField
                                                            type="number"
                                                            variant="outlined"
                                                            required={true}
                                                            autoFocus={true}
                                                        />
                                                    </>
                                                ) : null
                                        }
                                    </>
                                )
                            }
                        </FormControl>

                        <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8}} href={'informes_puestos_votacion3'} text={'GUARDAR'} type='primario' />
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion3