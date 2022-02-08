import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Grid, Link, Paper, Box, Container, Typography} from '@mui/material'
import { useForm } from "react-hook-form";
import CommonButton from '../commons/CommonButton'
import CommonTextField from '../formFieldsControlled/CommonTextField'
import {useStyles} from "../../theme/themeStyles";
import logoRnec from '../../images/registraduria-nacional.svg'
import logoRnecXxi from '../../images/logos_web_sigloXXI_negro.svg'

const PasswordRecover = (props) => {
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
            name: 'usuario',
            label: 'Usuario',
            placeholder: 'Usuario',
            rules: {
                required: true,
                type: 'email',
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
                <Typography variant="h1Mobile" >
                    Recuperar contraseña
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
                    <Box sx={{ width: 1, display: "flex", justifyContent: "space-evenly" }} >
                        <CommonButton text={'CANCELAR'} type='secundario' />
                        <CommonButton text={'REESTABLECER'} type='primario' />
                    </Box>
                    <Link
                        sx={{ mt: 3, mb: 2, px: 4, bgcolor: 'primary.light', fontWeight: 500, color: 'primary.main' }}
                        href={"/cambiar_contrasena"}
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
export default PasswordRecover