import react from 'react';
import HeaderCustom from "../header/HeaderCustom";
import {Typography, Container, Box, Grid, Paper, Link} from "@mui/material";
import Footer from "../footer/Footer";
import {useStyles} from "../../theme/themeStyles";
import CommonButton from "../commons/CommonButton";

import aperturaPuesto from "../../images/informes_puesto/apertura_puesto.svg"
import cierrePuesto from "../../images/informes_puesto/cierre_del_puesto.svg"
import reporteVotantes from "../../images/informes_puesto/reporte_votantes.svg"
import iconTips from "../../images/home/tips.svg";

const SubModuloInformePuestoVotacion = () => {
    const classes = useStyles()

    const menuOptions = [
        {
            title: 'Apertura del puesto',
            img: aperturaPuesto,
            href: 'informes_puestos_votacion2'
        },
        {
            title: 'Cierre del puesto',
            img: cierrePuesto,
            href: ''
        },
        {
            title: '1 Reporte de votantes',
            img: reporteVotantes,
            href: 'informe_kit_electoral'
        },
        {
            title: '2 Reporte de votantes',
            img: reporteVotantes,
            href: 'informes_puestos_votacion7'
        },
        {
            title: 'Informe 5',
            img: iconTips,
            href: 'informes_puestos_votacion5'
        },
        {
            title: 'Informe 6',
            img: iconTips,
            href: 'informes_puestos_votacion6'
        },
        {
            title: 'Informe 8',
            img: iconTips,
            href: 'informes_puestos_votacion8'
        },
        {
            title: 'Informe 9',
            img: iconTips,
            href: 'informes_puestos_votacion9'
        },
        {
            title: 'Informe 10',
            img: iconTips,
            href: 'informes_puestos_votacion10'
        },
        {
            title: 'Informe 11',
            img: iconTips,
            href: 'informes_puestos_votacion11'
        },
        {
            title: 'Informe 12',
            img: iconTips,
            href: 'informes_puestos_votacion12'
        },
        {
            title: 'Recomendaciones',
            img: iconTips,
            href: 'recomendaciones_encuesta'
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
                </Box>
                <Grid container direction="row" spacing={5} sx={{ px: 5, mb: 0}} >
                    {
                        menuOptions.map((option)=>{
                            return (
                                <Grid item xs={6} sx={{mt: 5, height: '170px', width: '170px',}} >
                                    <a href={option.href} style={{textDecoration: 'none'}}>
                                        <Paper sx={{py: 10, borderRadius: '15px',  display: 'flex', flexDirection: 'column', alignItems: 'center'}} elevation={4} key={option.name} >
                                            <img src={option.img} alt={option.title} className={classes.homeIcon} />
                                            <Typography sx={{mt: 3, textDecoration: 'none'}} variant="h4" textAlign="center">{option.title}</Typography>
                                        </Paper>
                                    </a>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Grid container columns={1} direction="column" alignItems='center' >
                    <CommonButton type="primario" text="HOME" sx={{mb: 10, mt: 20}} href="home"/>
                </Grid>
            </Container>
            <Footer/>
        </>
    )
}
export default SubModuloInformePuestoVotacion