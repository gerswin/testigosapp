import React, {useCallback, useEffect, useState} from 'react'
import { Link, Grid, FormControl, Typography, Container, Box, Alert } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from "@mui/icons-material/Person";
import CommonButton from '../commons/CommonButton'
import CommonTextField from '../formFieldsControlled/CommonTextField'
import { useStyles } from "../../theme/themeStyles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logoRnec from '../../images/registraduria-nacional.svg'
import logoRnecXxi from '../../images/logos_web_sigloXXI_negro.svg'
import useAuthenticationService from "../../domains/AuthenticationService";
import validateErrors from "../../utilities/validateErrors";
import validateFunction from "../../utilities/validateFields";
import _ from "underscore";

const defaultValues = {
    defaultValues: {
        username: '',
        password: '',
        verificationCode: ''
    }
}

const Login = () => {
    const [newAlert, setNewAlert] = useState({displayAlert: false, alertMessage: ''})
    const { control, formState, watch, clearErrors, setError } = useForm(defaultValues)
    const { errors, touchedFields, dirtyFields } = formState;
    const classes = useStyles()
    const values = watch()
    const authenticationService = useAuthenticationService()

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
    }, [formState])

    async function signIn(username, password) {
        try {
            const newLogin = await authenticationService.signIn({email: username, password: password})
            const currentUser = authenticationService.currentUser()
            if (newLogin && newLogin.message === "Incorrect username or password." ) {
                setNewAlert({
                    ...newAlert,
                    displayAlert: true, alertMessage: "Usuario y/o contraseña inválida"
                })
            } else if (newLogin && newLogin.message === "Password attempts exceeded"){
                setNewAlert({
                    ...newAlert,
                    displayAlert: true, alertMessage: "Intentos de contraseña excedidos"
                })
            } else if (newLogin && newLogin.message === "User does not exist."){
                setNewAlert({
                    ...newAlert,
                    displayAlert: true, alertMessage: "Usuario y/o contraseña inválida"
                })
            } else if (currentUser) {
                setNewAlert({
                    ...newAlert,
                    displayAlert: true, alertMessage: "Usted ya tiene una sesión abierta, debe cerrar sesión para iniciar una nueva"
                })
            }  else {
                return newLogin
            }
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    const fields = [
        {
            name: 'username',
            label: 'Usuario',
            placeholder: 'Usuario',
            rules: {
                required: true,
                type: "string",
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            }
        },
        {
            type: 'password',
            name: 'password',
            label: 'Contraseña',
            placeholder: 'Contraseña',
            rules: {
                required: true,
                type: "string",
                validate: (value) => typeof value !== 'string' ? 'typeof value error' : true
            }
        }
    ]
    const fieldValidation = () => {
        switch(values.username){
            default:
                return dirtyFields.username !== undefined && dirtyFields.password !== undefined
        }
    }
    const onSubmit = useCallback(
        async (e, values, fields, dirtyFields, setError, errors, username, password ) => {
            clearErrors()
            try {
                validateFunction(fields, errors, values, setError)
                if (_.isEmpty( errors )) {
                    validateFunction(fields, errors, values, setError)
                    if (_.isEmpty( errors ) && _.isEmpty(dirtyFields) === false && fieldValidation()) {
                        validateFunction(fields, errors, values, setError)
                        if (_.isEmpty( errors )) {
                            await signIn(username, password)
                        }
                    } else {
                        validateFunction(fields, errors, values, setError)
                    }
                }
                else {
                    validateFunction(fields, errors, values, setError)
                }
            } catch (e) {
                console.log(e)
            }
        }, [ formState ]
    )

    return (
        <Container component="main" maxWidth="xs" >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: "14px",
                    mt: "30px",
                    mx: "14px",
                    borderRadius: "15px",
                    boxShadow: 25,
                    justifyContent: "center"
                }}
            >
                <img src={logoRnec} alt='logoRnec' className={classes.logo} />
                <Typography variant="h1Mobile" sx={{mb: 4}} >
                    Autenticación
                </Typography>
                <Box component="form" display='flex' flexDirection='column' sx={{ mt: 1, width: 1 }} >
                    <FormControl component="fieldset" sx={{width: 1}}>
                        {
                            fields.map(field=>(
                                <CommonTextField
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    control={control}
                                    rules={field.rules}
                                    error={errors[field.name]}
                                    type={field.type}
                                />
                            ))
                        }
                    </FormControl>
                </Box>
                <Grid container columns={1} direction="column" alignItems='center' >
                    <CommonButton text={'INGRESAR'} type='primario' onClick={async (e )=> onSubmit(e, values, fields, dirtyFields, setError, errors, values.username, values.password)} />
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
            {
                newAlert.displayAlert === true ?
                    <Alert style={{display: 'flex', margin: '10px 37px', padding: '16px', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 82, 82, 0.12)', color: 'status.rojo' }}
                           icon={<PersonIcon fontSize="12px" color="error" />}
                           severity="error"
                           action={ <a onClick={()=>setNewAlert({...newAlert, displayAlert: false})}> <CancelIcon fontSize="20px" color="error"/> </a> }
                    >
                        <Typography variant="alertTittle">
                            {newAlert.alertMessage}
                        </Typography>
                    </Alert>
                    : <></>
            }
        </Container>
    )
}
export default Login