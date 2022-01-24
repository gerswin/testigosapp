import react, {useEffect, useState} from 'react'
import { Link, Grid, FormControl, Typography, Container, Box } from '@mui/material'
import CommonButton from '../commons/CommonButton'
import CommonTextField from '../formFieldsControlled/CommonTextField'
import { useStyles } from "../../theme/themeStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

//redux

import logoRnec from '../../images/registraduria-nacional.svg'
import logoRnecXxi from '../../images/logos_web_sigloXXI_negro.svg'
import useAuthenticationService from "../../domains/AuthenticationService";

const defaultValues = {
    defaultValues: {
        username: '',
        password: '',
        verificationCode: ''
    }
}

const Login = () => {
    const { control, getValues, watch, formState } = useForm(defaultValues)
    const {errors} = formState;
    const classes = useStyles()
    let navigate = useNavigate();

    const [formAuthState, setFormAuthState] = useState('')

    const values = watch()

    const authenticationService = useAuthenticationService()


    async function signIn(username, password) {
        try {
            await authenticationService.signIn({email: username, password: password})
            const currentUser = authenticationService.currentUser()

            console.log({currentUser})

            if (await currentUser ) {
                navigate("/home")
            }
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    const testData = {
        email: values.username,
        firstName: 'Juan2',
        lastName: 'Rodriguez2',
        password: values.password,
        phoneNumber: '+573016516666',
        profile: 'profile',
        identityDocument: '102300000',
    }

    const fields = [
        {
            name: 'username',
            label: 'Usuario',
            placeholder: 'Usuario',
            rules: {
                required: true,
                type: 'email',
            }
        },
        {
            name: 'password',
            label: 'Contraseña',
            placeholder: 'Contraseña',
            rules: {
                required: true,
                type: "password"
            }
        }
    ]

    const confirmSignUpFields = [
        {
            name: 'username',
            label: 'Usuario',
            placeholder: 'Usuario',
            rules: {
                required: true,
                type: 'email',
            }
        },
        {
            name: 'verificationCode',
            label: 'Verification Code',
            placeholder: 'Verification Code',
            rules: {
                required: true,
                type: "input"
            }
        }
    ]

    return (
        <Container component="main" maxWidth="xs">
            <Box
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
                <Typography variant="h1">
                    Autenticación
                </Typography>
                <Box component="form" display='flex' flexDirection='column' sx={{ mt: 1, width: 1 }} >
                    <FormControl component="fieldset" sx={{width: 1}}>
                        {
                            formAuthState === 'confirmSignUp' ?
                                confirmSignUpFields.map(field=>(
                                    <CommonTextField
                                        key={field.name}
                                        name={field.name}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        control={control}
                                        rules={field.rules}
                                        error={errors[field.name]}
                                    />
                                )) :
                                fields.map(field=>(
                                    <CommonTextField
                                        key={field.name}
                                        name={field.name}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        control={control}
                                        rules={field.rules}
                                        error={errors[field.name]}
                                    />
                                ))
                        }
                    </FormControl>
                </Box>
                <Grid container columns={1} direction="column" alignItems='center' >
                    <CommonButton text={'INGRESAR'} type='primario' onClick={()=>signIn(values.username, values.password)} />
                    {
                        formAuthState === 'confirmSignUp' ?
                            <CommonButton text={'CONFIRM SIGN UP'} type='primario' onClick={()=>authenticationService.confirmSignUp({email: values.email, code: values.code })} /> :
                            null
                    }

                    <Link
                        sx={{ mt: 3, mb: 2, px: 4, bgcolor: 'primary.light', fontWeight: 500, color: 'primary.main' }}
                        href={"/restablecer_contrasena"}
                        underline="always"
                    >
                        ¿Olvidó su contraseña?
                    </Link>
                    <img src={logoRnecXxi} alt='logoRnec' className={classes.logo} />
                </Grid>
            </Box>
        </Container>
    )
}
export default Login