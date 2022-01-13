import react, {useState} from 'react';
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import HeaderCustom from '../header/HeaderCustom.js'
import CommonButton from "../commons/CommonButton";

const AsistenciaPuestosVotacion = () => {

    const fields = [
        {
            name: 'usuario',
            label: 'Usuario',
            placeholder: 'Usuario',
            rules: {
                required: true,
                type: 'email',
            }
        },
        {
            name: 'contraseña',
            label: 'Contraseña',
            placeholder: 'Contraseña',
            rules: {
                required: true,
                type: "password"
            }
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
                            <FormLabel >
                                <Typography variant="h3" sx={{mb: '10px', mt: 8, color: 'grey.grisOscuro'}}>
                                    ¿Se encuentra en el puesto de votación?
                                </Typography>
                            </FormLabel>
                            <RadioGroup
                                aria-label="votacion1"
                                defaultValue=""
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio />} label="Si" sx={{}} />
                                <FormControlLabel value="no" control={<Radio />} label="No asistiré" />
                            </RadioGroup>
                            <FormLabel >
                                <Typography variant="h3" sx={{mb: '10px', mt: 8, color: 'grey.grisOscuro'}} >
                                    Seleccione una novedad en caso de no asistir al puesto de votación *
                                </Typography>
                            </FormLabel>
                            <RadioGroup
                                aria-label="votacion2"
                                defaultValue=""
                                name="radio-buttons-group2"
                            >

                                <FormControlLabel value="lluvia" control={<Radio sx={{}} />} label="Lluvia intensa" />
                                <FormControlLabel value="retraso-personal" control={<Radio />} label="Retraso personal" />
                                <FormControlLabel value="calamidad" control={<Radio />} label="Calamidad Familiar" />
                                <FormControlLabel value="caos-vehicular" control={<Radio />} label="Caos Vehicular" />
                                <FormControlLabel value="disturbios" control={<Radio />} label="Disturbios" />
                            </RadioGroup>
                        </FormControl>
                        <CommonButton style={{margin: '0 auto'}} text={'GUARDAR'} type='primario' />
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default AsistenciaPuestosVotacion