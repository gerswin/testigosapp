import react, {useState} from 'react';
import { Box, Typography, Container, Grid, Paper } from "@mui/material"

import HeaderCustom from '../header/HeaderCustom.js'
import Footer from "../footer/Footer";
import iconInformes from "../../images/home/informes-del-puesto.svg"
import iconNovedades from "../../images/home/novedades.svg"
import iconTips from "../../images/home/tips.svg"
import iconVerificarqr from "../../images/home/verificar-qr.svg"
import iconCredenciales from "../../images/home/credenciales-delegados.svg"
import iconAlertas from "../../images/home/alertas.svg"
import {useStyles} from "../../theme/themeStyles";

const Home = () => {

    const classes = useStyles()

    const menuOptions = [
        {
            title: 'Informes del puesto',
            img: iconInformes,
            href: 'submodulo_informes_puesto'
        },
        {
            title: 'Novedades',
            img: iconNovedades,
            href: 'novedades_proceso_eleccion'
        },
        {
            title: 'Tips',
            img: iconTips,
            href: ''
        },
        {
            title: 'Verificar E-15',
            img: iconVerificarqr,
            href: 'verificar_credencial_e15'
        },
        {
            title: 'Credenciales delegados',
            img: iconCredenciales,
            href: 'generar_credencial_delegado1'
        },
        {
            title: 'Alertas',
            img: iconAlertas,
            href: 'alertas'
        },
    ]

    return (
        <>
            <HeaderCustom />
            <Container component="main" maxWidth="xs" sx={{mt: 4 }}>
                <Typography variant="h1" fontSize={24} >
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
                <Typography variant="h2" sx={{mt: 6}} fontSize={22} >
                    Seleccione la opción requerida
                </Typography>
                <Grid container direction="row" spacing={5} sx={{mb: 40, px: 5}} >
                    {
                        menuOptions.map((option)=>{
                            return (
                                <Grid key={option.name} item xs={6} sx={{mt: 5, height: '170px', width: '170px',}} >
                                    <a href={option.href} style={{textDecoration: 'none'}}>
                                        <Paper sx={{py: 10, borderRadius: '15px',  display: 'flex', flexDirection: 'column', alignItems: 'center'}} elevation={3}>
                                            <img src={option.img} alt={option.title} className={classes.homeIcon} />
                                            <Typography sx={{mt: 3, textDecoration: 'none'}} variant="h4" textAlign="center">{option.title}</Typography>
                                        </Paper>
                                    </a>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
            <Footer/>
        </>
    )
}

export default Home