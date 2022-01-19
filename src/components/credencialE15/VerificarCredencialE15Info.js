import react, {useState} from 'react';
import {Box, Typography, Container} from "@mui/material"

import HeaderCustom from '../header/HeaderCustom.js'
import CommonButton from "../commons/CommonButton";
import { useForm } from "react-hook-form";
import BasicTable from "../commons/BasicTable";
import Footer from "../footer/Footer";
import React from "react";

const VerificarCredencialE15Info = () => {
    const { control, formState} = useForm()
    const {errors} = formState;


    const handleContinue = (e) => {
        e.preventDefault()
        console.log({
            email: 'email',
            password: 'password'
        })
    }

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
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    px: 5,
                    mt: 1,
                    mb: 20
                }}>
                    <BasicTable/>
                    <CommonButton type="primario" text="REGISTRAR ASISTENCIA" sx={{mt: 6}} href=""/>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default VerificarCredencialE15Info