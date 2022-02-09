import React, {useCallback, useEffect, useState} from 'react'
import _ from "underscore";
import {
    Grid,
    Link,
    Box,
    Container,
    Typography,
    Alert,
} from '@mui/material';
import { useForm } from "react-hook-form";
import { useSelector, shallowEqual} from "react-redux";
import useAuthenticationService from "../../domains/AuthenticationService";
import CommonTextField from '../formFieldsControlled/CommonTextField';
import CommonButton from '../commons/CommonButton';
import {useStyles} from "../../theme/themeStyles";
import logoRnec from '../../images/registraduria-nacional.svg'
import logoRnecXxi from '../../images/logos_web_sigloXXI_negro.svg'
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import validateErrors from "../../utilities/validateErrors";
import validateFunction from "../../utilities/validateFields";

const ForgotPassword = (props) => {
    const [newAlert, setNewAlert] = useState({displayAlert: false, alertMessage: ''})
    const [passwordValues, setPasswordValues] = useState({
        showPassword: false,
    })
    const { control, formState, watch, clearErrors, setError, getValues, register} = useForm({
        defaultValues: {
            newPassword: '',
            passwordConfirm: ''
        },
        criteriaMode:"all"
    })
    const { errors, touchedFields, dirtyFields } = formState;
    const classes = useStyles()
    const values = watch()
    const newLoginUser = useSelector( state => state.loginNewUser, shallowEqual)
    const authenticationService = useAuthenticationService()

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
    }, [formState])

    const fields = [
        {
            type: 'password',
            name: 'newPassword',
            label: 'Nueva contraseña',
            placeholder: 'Nueva contraseña',
            rules: {
                required: true,
                type: 'string',
                validate: (value) => value.length <= 7 ? 'La contraseña debe tener mínimo 8 caracteres, por lo menos una letra mayúscula, una minúscua y un número.' : true
            }
        },
        {
            type: 'password',
            name: 'passwordConfirm',
            label: 'Confirmar contraseña',
            placeholder: 'Confirmar contraseña',
            rules: {
                required: true,
                type: "string",
                validate: {
                    length: (value) => value.length <= 7 ? 'La contraseña debe tener mínimo 8 caracteres, por lo menos una letra mayúscula, una minúscua y un número.' : true,
                    diff: (value) => value !== getValues('newPassword') ? 'Su contraseña no coincide' : true
                }
            }
        }
    ]

    const createNewPassword = (password) => {
        try {
            const newPassword = authenticationService.completeNewPassword(newLoginUser, password)
            console.log(newPassword)
            return newPassword
        } catch (e) {
            console.log(e)
        }
    }

    const fieldValidation = () => {
        switch(values.newPassword){
            default:
                return dirtyFields.passwordConfirm !== undefined && values.passwordConfirm === values.newPassword
        }
    }

    const onSubmit = useCallback(
        async (e, values, fields, dirtyFields, setError, errors, password ) => {
            clearErrors()
            try {
                validateFunction(fields, errors, values, setError)
                if (_.isEmpty( errors )) {
                    validateFunction(fields, errors, values, setError)
                    if (_.isEmpty( errors ) && _.isEmpty(dirtyFields) === false && fieldValidation()) {
                        validateFunction(fields, errors, values, setError)
                        if (_.isEmpty( errors )) {
                            await createNewPassword(password)
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
        <Container component="main" maxWidth="xs">
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
                    Cambiar contraseña
                </Typography>
                <Box component="form" display='flex' flexDirection='column' sx={{ mt: 1, width: 1 }} >
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
                                type={field.type}
                            />
                        })
                    }
                </Box>
                <Grid container columns={1} direction="column" alignItems='center' >
                    <CommonButton text={'CAMBIAR'} type='primario' onClick={(e)=>onSubmit(e, values, fields, dirtyFields, setError, errors, values.passwordConfirm )} />
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
                        <Typography variant="alertTittle"
                        >
                            {newAlert.alertMessage}
                        </Typography>
                    </Alert>
                    : <></>
            }
        </Container>
    )
}
export default ForgotPassword