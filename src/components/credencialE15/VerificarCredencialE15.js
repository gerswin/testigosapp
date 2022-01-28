import React from "react";

import {useForm} from "react-hook-form";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, Paper, Typography} from "@mui/material";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";

const VerificarCredencialE15 = () => {
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
                        Verificar Credenciales E-15 testigo electoral
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1, width: 1 }} display="flex" flexDirection='column' alignItems='left'>
                        <FormControl component="fieldset" sx={{width: 1}}>
                            <a href="" style={{textDecoration: 'none'}} >
                                <Paper elevation={6} sx={{height: '350px', borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                    <CameraAltOutlinedIcon fontSize="large" sx={{width: '80px', color: '#CCCCCC'}}/>
                                    <Typography variant="titleInput" sx={{color: '#CCCCCC'  }}>
                                        Escanee el código QR del testigo
                                    </Typography>
                                </Paper>
                            </a>
                        </FormControl>
                        <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8, alignSelf: 'center'}} href={'verificar_credencial_e15info'} text={'REGISTRAR ASISTENCIA'} type='primario' />
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default VerificarCredencialE15