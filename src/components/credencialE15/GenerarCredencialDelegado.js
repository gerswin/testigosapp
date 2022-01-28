import react, {useState} from 'react';
import {Box, Typography, Container} from "@mui/material"

import HeaderCustom from '../header/HeaderCustom.js'
import CommonButton from "../commons/CommonButton";
import { useForm } from "react-hook-form";
import BasicTable from "../commons/BasicTable";
import Footer from "../footer/Footer";
import React from "react";


function createData(field, info) {
    return { field, info };
}

const rows = [
    createData('Danilo Santamaria',  ),
    createData('CC 100987650', ),
    createData('Departamento', 'META', ),
    createData('Municipio', 'VILLAVICENCIO'),
    createData('Zona', '04'),
    createData('Mesas asignadas', 'DESDE 10 HASTA 19'),
    createData('Código localidad', '03'),
    createData('Nombre localidad', 'COMUNA 03'),
];

const GenerarCredencialDelegado = () => {
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
                        Credencial Delegado de Puesto
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
                    <BasicTable rows={rows}/>
                    <CommonButton type="primario" text="ACEPTAR" sx={{mt: 6}} href=""/>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default GenerarCredencialDelegado