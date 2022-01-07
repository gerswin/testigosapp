import react, {useState} from 'react';
import CommonTextField from '../formFieldsControlled/CommonTextField';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import logoRnec from "../images/rnec-logo 1.png";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Header from '../header/Header.js'
import {useForm} from "react-hook-form";

const AsistenciaPuestosVotacion = () => {

    const { control, formState } = useForm()
    const {errors} = formState;

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
            <Header></Header>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar variant="square" sx={{ m: 4, bgcolor: 'white', width: 167, height:100 }}  >
                        <img src={logoRnec} alt='logoRnec'/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Elección de Congreso 2022
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">¿Se encuentra en el puesto de votación?</FormLabel>
                            <RadioGroup
                                aria-label="votacion1"
                                defaultValue=""
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="si" control={<Radio />} label="Si" />
                                <FormControlLabel value="no" control={<Radio />} label="No asistiré" />
                            </RadioGroup>
                            <FormLabel component="legend">Seleccione una novedad en caso de no asistir al puesto de votación *</FormLabel>
                            <RadioGroup
                                aria-label="votacion2"
                                defaultValue=""
                                name="radio-buttons-group2"
                            >
                                <FormControlLabel value="lluvia" control={<Radio />} label="Lluvia intensa" />
                                <FormControlLabel value="retraso-personal" control={<Radio />} label="Retraso personal" />
                                <FormControlLabel value="calamidad" control={<Radio />} label="Calamidad Familiar" />
                                <FormControlLabel value="caos-vehicular" control={<Radio />} label="Caos Vehicular" />
                                <FormControlLabel value="disturbios" control={<Radio />} label="Disturbios" />
                            </RadioGroup>
                        </FormControl>

                        {/*<CommonTextField
                            name={fields[0].name}
                            label={fields[0].label}
                            placeholder={fields[0].placeholder}
                            // tooltip={tooltip}
                            control={control}
                            rules={fields[0].rules}
                            error={errors[fields[0].name]}
                        />*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: '#459096'  }}
                            href="/informes_asistencia/guardar"
                        >
                            GUARDAR
                        </Button>

                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default AsistenciaPuestosVotacion