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
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    General settings
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                    Aliquam eget maximus est, id dignissim quam.
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