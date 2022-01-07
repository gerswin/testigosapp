import react, {useState} from 'react'
import CommonTextField from '../formFieldsControlled/CommonTextField'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { SvgIcon } from '@mui/material';

import logoRnec from '../images/registraduria-nacional.svg'

import { useNavigate, useLocation } from 'react-router-dom';

import { useForm } from "react-hook-form";

const Header = () => {

}

const LogoRNEC = () => (
    <img src={logoRnec} alt='logoRnec'/>
)

const Login = (props) => {
    const { olvidoContrasenaProp } = props
    const { control, formState} = useForm()
    const {errors} = formState;
    let { history } = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({
            email: 'email',
            password: 'password'
        })
    }

    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="informes_asistencia">
                    Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
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

    console.log({olvidoContrasenaProp})

    const [olvidoContrasena, useOlvidoContrasena] = useState({
        route: '/informes_asistencia'
    })

    const onLinkClick = async () => {
        const informesLink = await history.push("/informes_votacion")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 4, bgcolor: 'white', width: 167, height:100 }} src='../images/registraduria-nacional.svg' >
                    {/*<Box
                        component="img"
                        sx={{
                            height: 100,
                            width: 167,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        alt="rnec-logo"
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    />*/}
                   {/* <img src={logoRnec} alt='logoRnec'/>*/}
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
                        //onClick={ async () => await onLinkClick }
                        href="/informes_asistencia"
                    >
                        INGRESAR
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" >
                                ¿Olvidó su contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />

        </Container>
    )

}
export default Login