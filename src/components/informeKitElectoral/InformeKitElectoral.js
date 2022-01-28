import react from 'react';
import HeaderCustom from "../header/HeaderCustom";
import Footer from "../footer/Footer";
import {Box, Typography, Container, Grid, TextField, FormControl} from "@mui/material";
import CommonTextField from "../formFieldsControlled/CommonTextField";
import {useForm} from "react-hook-form";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import React from "react";

import checkGreenIcon from '../../images/estados/checkGreenIcon.svg'
import dangerYellowIcon from '../../images/estados/dangerYellowIcon.svg'
import CommonButton from "../commons/CommonButton";


const InformeKitElectoral = () => {
    const {control, formState} = useForm()
    const {errors} = formState

    const mesas = [
        {
            name: 'Mesa 1',
        },
        {
            name: 'Mesa 2'
        },
        {
            name: 'Mesa Test 1'
        }
    ]
/*
    const fields = [
        {
            name: 'kitNumber',
            label: 'kit',
            rules: {
                required: true,
                type: 'number',
            }
        }
    ]
    */
    const estados = [
        {
            label: 'Buen estado',
            color: '#33FF00',
            value: 'bueno',
            icon: checkGreenIcon
        },
        {
            label: 'Daño no significativo',
            color: '#FFF500',
            value: 'dano',
            icon: dangerYellowIcon
        },
        {
            label: 'Inservible',
            color: '#EE002D',
            value: 'inservible'
        },
        {
            label: 'Faltantes',
            color: '#B0B0B0',
            value: 'faltantes'
        },
    ]

    return (
        <>
            <HeaderCustom/>
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
                <Grid container sx={{borderTop: 1, borderBottom: 1, borderColor: "grey.grisDetalles", py: "15px", justifyContent: 'space-between'  }} >
                    <Grid item xs={6} sx={{my: "auto"}} >
                        <Typography variant="titleInput">Numero de kits a recibir</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type="number"
                            variant="outlined"
                            required={true}
                            autoFocus={true}
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{mt: 6, borderTop: 1, borderColor: "grey.grisDetalles", py: "15px" }} >
                    <Grid item xs={12} sx={{my: "auto", ml: 3}} >
                        <Typography variant="titleInput">Seleccione el Estado</Typography>
                    </Grid>
                    {
                        mesas.map(mesa => {
                            return (
                                <Grid sx={{mt: 1, borderBottom: 1, borderLeft: 1, borderRight: 1, borderColor: "grey.grisDetalles", py: "15px", width: 1, px: 4 }} item >
                                    <FormControl component="fieldset" sx={{width: 1, display: 'flex', flexDirection: 'row'  }} >
                                        <FormLabel sx={{width: 0.4}} >
                                            <Typography variant="h3" sx={{mb: 3, mt: 3, color: 'grey.grisOscuro'}}>
                                                {mesa.name}
                                            </Typography>
                                        </FormLabel>
                                        <RadioGroup
                                            //error={error}
                                            name='mesasEstado'
                                            //value={value }
                                            //onChange={onChange}
                                            sx={{width: 1, display: 'flex', flexDirection: 'row', justifyItems: 'space-around'}}
                                        >
                                            {estados.map(estado => (
                                                <Radio control={control} value={estado.value} key={estado.name} sx={{
                                                    width: '55px',
                                                    '&, &.Mui-checked': {
                                                        color: estado.color,
                                                    }
                                                }}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                {
                    estados.map(estado => (
                        <Grid container sx={{ borderBottom: 1, borderColor: "grey.grisDetalles", py: "15px", justifyContent: 'space-between' }} >
                            <Grid item xs={6} sx={{my: "auto"}} >
                                <Typography variant="titleInput">{estado.label}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    type="number"
                                    variant="outlined"
                                    required={true}
                                    autoFocus={true}
                                    value={estado.value}
                                />
                            </Grid>
                        </Grid>
                    ))
                }
                <Grid container columns={1} direction="column" alignItems='center' >
                    <CommonButton type="primario" text="GUARDAR" href="informes_puestos_votacion2" sx={{mb: 10, mt: 20}}/>
                </Grid>
                <Footer/>
            </Container>
        </>
    )
}

export default InformeKitElectoral