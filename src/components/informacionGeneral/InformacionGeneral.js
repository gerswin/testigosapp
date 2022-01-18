import react, {useState} from 'react';
import { Box, Typography, Container } from "@mui/material"

import HeaderCustom from '../header/HeaderCustom.js'
import CommonButton from "../commons/CommonButton";
import { useForm } from "react-hook-form";
import BasicTable from "../commons/BasicTable";
import Footer from "../footer/Footer";

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

                    <BasicTable/>

                    <CommonButton type="primario" text="CONTINUAR" sx={{mt: 6}} href=""/>

                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default InformacionGeneral