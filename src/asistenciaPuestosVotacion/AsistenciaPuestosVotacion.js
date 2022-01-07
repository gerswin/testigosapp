import react, {useState} from 'react';
import CommonTextField from '../formFieldsControlled/CommonTextField';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import logoRnec from "../images/rnec-logo 1.png";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <img src={logoRnec} alt='logoRnec'/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Autenticación
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <CommonTextField
                            name={fields[0].name}
                            label={fields[0].label}
                            placeholder={fields[0].placeholder}
                            // tooltip={tooltip}
                            control={control}
                            rules={fields[0].rules}
                            error={errors[fields[0].name]}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
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