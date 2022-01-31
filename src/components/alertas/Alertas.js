import react, {useState} from 'react';
import {Box, Typography, Container, AccordionDetails, Accordion, AccordionSummary} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HeaderCustom from '../header/HeaderCustom.js'
import CommonButton from "../commons/CommonButton";
import { useForm } from "react-hook-form";
import Footer from "../footer/Footer";
import React from "react";

const Alertas = () => {
    const { control, formState} = useForm()
    const {errors} = formState;
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                        Notificaciones
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
                    <div>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                sx={{width: 1, display: 'flex', flexDirection: 'column'}}
                            >
                                <Typography sx={{ width: 1 }}>
                                    Mensaje de: Directivos nivel central
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Hora: 02:15 pm</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Se ha habilitado el Reporte de votación de las 12:30 pm, por favor dirijase al módulo informe de puesto y registre el número de votos por cada mesa asignada.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                sx={{width: 1, display: 'flex', flexDirection: 'column'}}
                            >
                                <Typography sx={{ width: 1 }}>
                                    Mensaje de: Directivos nivel central
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Hora: 02:15 pm</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Se ha habilitado el Reporte de votación de las 11:30 pm, por favor dirijase al módulo informe de puesto y registre el número de votos por cada mesa asignada.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <CommonButton type="primario" text="ACEPTAR" sx={{mt: 6}} href=""/>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default Alertas