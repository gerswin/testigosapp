import react, {useState} from 'react';
import { Box, Typography, Container } from "@mui/material"

import HeaderCustom from '../header/HeaderCustom.js'
import CommonButton from "../commons/CommonButton";
import { useForm } from "react-hook-form";
import BasicTable from "../commons/BasicTable";
import Footer from "../footer/Footer";

function createData(field, info) {
    return { field, info };
}

const rows = [
    createData('Departamento', 'META', ),
    createData('Municipio', 'VILLAVICENCIO'),
    createData('Puesto', 'COLEGIO COFREM'),
    createData('Direccion', 'CARRERA 20 - A NO. 35 - 02'),
    createData('Zona', '04'),
    createData('Mesas asignadas', 'DESDE 10 HASTA 19'),
    createData('Código localidad', '03'),
    createData('Nombre localidad', 'COMUNA 03'),
];

const InformacionGeneral = () => {
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
            <Container component="main" maxWidth="xs">
                <Typography variant="h3" sx={{mb: 4, ml: 5, mt: 5, fontWeight: 700}} >
                    Delegados
                </Typography>
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        px: 5,
                        mt: 8
                    }}
                >
                    <Typography variant="h4" sx={{mb: 1.5}}  >
                        Elección de Congreso 2022
                    </Typography>
                    <Typography variant="h5" sx={{mb: 1.5}} >
                        13 de marzo de 2022
                    </Typography>
                    <Typography variant="h6" sx={{mb: 1.5}} >
                        Danilo Santamaria
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
                    <Typography variant="h2" sx={{mt: 6, mb: 5}}>
                        Información General
                    </Typography>
                    <Typography variant="actionDrop" >
                        Este es el lugar donde ejercerá como delegado de puesto de votación
                    </Typography>

                    <BasicTable rows={rows}/>

                    <CommonButton type="primario" text="CONTINUAR" sx={{mt: 6}} href=""/>

                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default InformacionGeneral