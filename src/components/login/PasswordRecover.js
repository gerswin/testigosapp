import React, {useCallback, useEffect, useState} from 'react'
import {Grid, Link, Box, Container, Typography, Alert} from '@mui/material'
import { useForm } from "react-hook-form";
import CommonButton from '../commons/CommonButton'
import CommonTextField from '../formFieldsControlled/CommonTextField'
import {useStyles} from "../../theme/themeStyles";
import logoRnec from '../../images/registraduria-nacional.svg'
import logoRnecXxi from '../../images/logos_web_sigloXXI_negro.svg'
import useAuthenticationService from "../../domains/AuthenticationService";
import validateFunction from "../../utilities/validateFields";
import _ from "underscore";
import CancelIcon from "@mui/icons-material/Cancel";
import CommonDialog from "../commons/CommonDialog";
import validateErrors from "../../utilities/validateErrors";
import PersonIcon from "@mui/icons-material/Person";

const PasswordRecover = () => {
    const [newAlert, setNewAlert] = useState({displayAlert: false, alertMessage: ''})
    const [codeIsSent, setCodeIsSent] = useState(false)
    const [greenAlert, setGreenAlert ] = useState({displayAlert: false, alertMessage: ''})
    const [acceptButton, setAcceptButton] = useState(false)
    const [open, setOpen] = useState(false)
    const { control, formState, watch, clearErrors, setError} = useForm({
        defaultValues: {
            username: '',
            resetCode: ''
        },
    })
    const {errors, dirtyFields, touchedFields } = formState;
    const classes = useStyles()
    const values = watch()
    const authenticationService = useAuthenticationService()

    useEffect(() => {
        validateErrors(touchedFields, errors, dirtyFields, values, clearErrors)
    }, [formState])

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
            name: 'resetCode',
            label: 'Ingrese su código de verificación',
            rules: {
                required: true,
                type: "number",
                validate: (value) => typeof value !== 'number' ? 'typeof value error' : true
            }
        }
    ]

    const sendPasswordRecover = async () => {
        try {
            let sendForgotPassword = await authenticationService.forgotPassword(values.username)
            if(sendForgotPassword && sendForgotPassword.message ) {
                let errorMessage
                if (sendForgotPassword.message === 'User password cannot be reset in the current state.' ) {
                    errorMessage = 'La contraseña del usuario no puede ser restablecida en el estado actual'
                }
                if (sendForgotPassword.message === 'Username/client id combination not found.') {
                    errorMessage = 'Usuario no válido'
                }
                setNewAlert({
                    ...newAlert,
                    displayAlert: true,
                    alertMessage: errorMessage
                })
            }
            if(sendForgotPassword && sendForgotPassword.CodeDeliveryDetails) {
                setOpen(true)
                setAcceptButton(true)
                setGreenAlert({
                    ...greenAlert,
                    displayAlert: true,
                    alertMessage: "Código de acceso enviado a " + sendForgotPassword.CodeDeliveryDetails.Destination
                })
                //setCodeIsSent(true)
            }
            return sendForgotPassword
        } catch (e) {
            if (e) {
                setNewAlert({
                    ...newAlert,
                    displayAlert: true,
                    alertMessage: e.message
                })
            }
        }
    }

    const handleClose = () => {
        setOpen(false)
        setGreenAlert({
            ...greenAlert,
            displayAlert: false,
            alertMessage: ""
        })
    }

    const onSubmit = useCallback(
        async (e, values, fields, dirtyFields, setError, errors, username ) => {
            clearErrors()
            try {
                validateFunction(fields, errors, values, setError)
                if (_.isEmpty( errors )) {
                    validateFunction(fields, errors, values, setError)
                    if (_.isEmpty( errors ) && _.isEmpty(dirtyFields) === false && dirtyFields.username !== undefined) {
                        validateFunction(fields, errors, values, setError)
                        if (_.isEmpty( errors )) {
                            await sendPasswordRecover(username)
                        }
                    } else {
                        validateFunction(fields, errors, values, setError)
                    }
                }
                else {
                    validateFunction(fields, errors, values, setError)
                }
            } catch (e) {
                if (e) {
                    setNewAlert({
                        ...newAlert,
                        displayAlert: true,
                        alertMessage: "Usuario y/o contraseña inválida"
                    })
                }
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
                <Box component="form" display='flex' flexDirection='column' sx={{ mt: 1, width: 1 }} >
                    {
                        codeIsSent === true ?
                            fields.slice(1, 2).map(field=> {
                                return <CommonTextField
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    control={control}
                                    rules={field.rules}
                                    error={errors[field.name]}
                                />
                            }) : fields.slice(0, 1).map(field=> {
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
                        <CommonButton text={'CANCELAR'} href='/' type='secundario' />
                        {
                            codeIsSent === true ?
                                <CommonButton text={'LOGIN'} href='/' type='primario' /> :
                                <CommonButton text={'REESTABLECER'} onClick={(e)=>onSubmit(e, values, fields, dirtyFields, setError, errors, values.username )} type='primario' />
                        }
                    </Box>
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
            <CommonDialog
                dialogTitle={greenAlert && greenAlert.alertMessage}
                open={open}
                onClose={handleClose}
                acceptButton={acceptButton}
                isinput={false}
            />
        </Container>
    )

}
export default PasswordRecover