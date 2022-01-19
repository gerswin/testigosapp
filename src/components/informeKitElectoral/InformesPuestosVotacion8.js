import {Route} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, TextField, MenuItem, Typography, Select} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";

const InformesPuestosVotacion8 = () => {
    const { control, formState, watch} = useForm({
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
            label: '¿Se utilizó tarjetas braile?',
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
                    <Box component="form" noValidate sx={{ mt: 1, width: 1 }} display="flex" flexDirection='column' alignItems='left'>
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
                        <Typography variant="h3" textAlign='left' sx={{ mb: '10px', mt: 4, color: 'grey.grisOscuro'}}>
                            Descipción:
                        </Typography>
                        <Typography variant="actionDrop">
                            Colombia garantiza el voto en Braile, siendo el Instituto Nacional para Ciegos -INCI quién imprime los tarjetones en braile, de acuerdo al mandato de la Corte Constitucional de la Sentencia T-487 de 2003
                        </Typography>

                        <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8, alignSelf: 'center'}} href={'informacion_general'} text={'GUARDAR'} type='primario' />
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion8