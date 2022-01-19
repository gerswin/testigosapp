import React from "react";

import {useForm} from "react-hook-form";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, MenuItem, Typography, Select} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";

const InformesPuestosVotacion10 = () => {
    const { control, formState} = useForm({
        defaultValues: {
            q1: '',
            q2: ''
        }
    })
    const { errors } = formState;

    const fields = [
        {
            type: 'radioGroup',
            name: 'q1',
            label: '¿Se realizó entrega de pliegos electorales en la comisión escrutadora?*',
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
            type: 'input',
            name: 'q2',
            label: 'Seleccione una novedad',
            rules: {
                required: true,
                type: "radio"
            },
            options: [
                {
                    label: 'Documentos extraviados por fuerza mayor o caso fortuito',
                    value: 'q2a'
                },
                {
                    label: 'Documentos robados por fuerza mayor o c',
                    value: 'q2b',
                },
                {
                    label: 'Otra',
                    value: 'otra',
                    addInput: true
                }
            ],
            inputLabel: {
                display: false,
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
                                    </>
                                )
                            }
                        </FormControl>

                        <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8}} href={'informacion_general'} text={'GUARDAR'} type='primario' />
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion10