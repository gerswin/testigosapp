import react, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import CommonTextField from '../formFieldsControlled/CommonTextField'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {Grid, Link, Paper} from '@mui/material'
import CommonButton from '../commons/CommonButton'
import {useStyles} from "../../theme/themeStyles";

import { useForm } from "react-hook-form";

import logoRnec from '../../images/registraduria-nacional.svg'
import logoRnecXxi from '../../images/logos_web_sigloXXI_negro.svg'

const ForgotPassword = (props) => {
    const { olvidoContrasenaProp } = props
    const { control, formState} = useForm()
    const {errors} = formState;
    let { history } = useNavigate()
    const classes = useStyles()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({
            email: 'email',
            password: 'password'
        })
    }

    const fields = [
        {
            name: 'nuevacontrasena',
            label: 'Nueva contraseña',
            placeholder: 'Nueva contraseña',
            rules: {
                required: true,
                type: 'email',
            }
        },
        {
            name: 'confirmar',
            label: 'Confirmar contraseña',
            placeholder: 'Confirmar contraseña',
            rules: {
                required: true,
                type: "password"
            }
        }

    ]

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: "14px",
                    mt: "45px",
                    mx: "14px",
                    borderRadius: "15px",
                    boxShadow: 25,
                    justifyContent: "center"
                }}
            >
                <img src={logoRnec} alt='logoRnec' className={classes.logo} />
                <Typography variant="h1" textAlign="center">
                    Cambiar contraseña
                </Typography>
                <Box component="form" display='flex' flexDirection='column' onSubmit={handleSubmit} sx={{ mt: 1, width: 1 }} >
                    {
                        fields.map(field=> {
                            return <CommonTextField
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                placeholder={field.placeholder}
                                control={control}
                                rules={field.rules}
                                error={errors[field.name]}
                            />
                        })
                    }
                </Box>
                <Grid container columns={1} direction="column" alignItems='center' >
                    <CommonButton text={'CAMBIAR'} type='primario' />
                    <Link
                        sx={{ mt: 3, mb: 2, px: 4, bgcolor: 'primary.light', fontWeight: 500, color: 'primary.main' }}
                        href={"/restablecer_contrasena"}
                        underline="always"
                    >
                        ¿Olvidó su contraseña?
                    </Link>
                    <img src={logoRnecXxi} alt='logoRnec' className={classes.logo} />
                </Grid>
            </Paper>
        </Container>
    )

}
export default ForgotPassword