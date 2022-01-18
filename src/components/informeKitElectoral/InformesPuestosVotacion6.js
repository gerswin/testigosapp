import {Route} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, TextField, Typography} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";

const InformesPuestosVotacion6 = () => {

    const { formState, watch, control} = useForm({
        defaultValues: {
            q1: '',
            q2: ''
        }
    })
    const { errors } = formState;
    const values = watch()

    const fields = [
        {
            type: 'radioGroup',
            name: 'q1',
            label: '¿Hubo presencia de la mesa de justicia?',
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
                }
            ]
        }
    ]

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
                    <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8}} href={'informacion_general'} text={'GUARDAR'} type='primario' />
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion6
