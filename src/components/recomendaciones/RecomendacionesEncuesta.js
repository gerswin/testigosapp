import React from "react";

import {useForm} from "react-hook-form";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, TextField, Typography} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";

const RecomendacionesEncuesta = () => {
    const { control, formState} = useForm({
        defaultValues: {
            q1: '',
            q2: ''
        }
    })
    const { errors } = formState;

    const fields = [
        {
            type: 'textInput',
            name: 'q1',
            label: '¿Se realizó el respectivo aseo y organización del puesto al finalizar la jornada electoral?',
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
                        Encuesta
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1, width: 1 }} display="flex" flexDirection='column' alignItems='center'>
                        <FormControl component="fieldset" sx={{width: 1}}>
                            <Typography variant="h3" sx={{mb: '10px', mt: 5, color: 'grey.grisOscuro'}}>
                                Por favor redacte su opinión y recomendaciones enfocadas en la mejora del proceso
                            </Typography>
                            <TextField
                                id="recomendacionq1"
                                multiline
                                rows={8}
                            />

                        </FormControl>

                        <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8}} href={'informacion_general'} text={'GUARDAR'} type='primario' />
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default RecomendacionesEncuesta