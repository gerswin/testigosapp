import react, {useState} from 'react';
import { Box, Typography, Container, FormControl } from "@mui/material"

import HeaderCustom from '../header/HeaderCustom.js'
import CommonButton from "../commons/CommonButton";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import { useForm } from "react-hook-form";

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
        <div>
            <HeaderCustom />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} display="flex" flexDirection='column' alignItems='center'>
                        <FormControl component="fieldset">
                            {
                                fields.map(field => (
                                    <CommonRadioGroup
                                        key={field.name}
                                        field={field}
                                        control={control}
                                    />
                                ))
                            }
                        </FormControl>
                        <CommonButton style={{margin: '0 auto'}} text={'GUARDAR'} type='primario' />
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default AsistenciaPuestosVotacion