import react, {useState} from 'react';
import { Box, Typography, Container, FormControl } from "@mui/material"

import HeaderCustom from '../header/HeaderCustom.js'
import CommonButton from "../commons/CommonButton";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import { useForm } from "react-hook-form";
import BasicTable from "../commons/BasicTable";

const AsistenciaPuestosVotacion = () => {
    const { control, formState} = useForm()
    const {errors} = formState;

    const fields = [
        {
            type: 'radioGroup',
            name: 'q1',
            label: '¿Se encuentra en el puesto de votación?',
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
        },
        {
            type: 'radioGroup',
            name: 'q2',
            label: 'Seleccione una novedad en caso de no asistir al puesto de votación *',
            rules: {
                required: true,
                type: "radio"
            },
            options: [
                {
                    label: 'Lluvia intensa',
                    value: 'lluvia-intensa'
                },
                {
                    label: 'Retraso personal',
                    value: 'retraso-personal'
                },
                {
                    label: 'Calamidad Familiar',
                    value: 'calamidad-familiar'
                },
                {
                    label: 'Caos Vehicular',
                    value: 'caos-vehicular'
                },
                {
                    label: 'Disturbios',
                    value: 'disturbios'
                },
            ]
        }
    ]

    const handleSubmit = (e) => {
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
                    mt: 1
                }}>
                    <Typography variant="h2" sx={{mt: 6, mb: 5}}>
                        Información General
                    </Typography>
                    <Typography variant="actionDrop" >
                        Este es el lugar donde ejercerá como delegado de puesto de votación
                    </Typography>

                    <BasicTable/>

                    <CommonButton type="primario" text="CONTINUAR" sx={{mt: 6}}/>

                </Box>
            </Container>
        </>
    )
}

export default AsistenciaPuestosVotacion