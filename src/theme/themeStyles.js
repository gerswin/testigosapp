import react from 'react'
import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/material';

export const theme = createTheme({
    bg: "white",
    palette: {
        type: "light",
        primary: {
            main:"#459096",
            light: "rgba('#459096, 0.4')",
            dark:"#459096",
            contrastText: "#fff"
        },
        grey: {
            textos: "#333333",
            grisOscuro: "#555555",
            textoGris: "#B0B0B0",
            grisDetalles: "#CCCCCC",
        },
        error: {
            main: "#EE002D"
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Lato, sans-serif",
        fontSize: '16px',
        fontWeight: 500,
        h1: {
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            fontSize: "28px",
            lineHeight: "32.81px"
        },
        h2: {
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            lineHeight: "26px"
        },
        h3: {
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "21px",
            fontStyle: 'normal',
        },
        subtitle1: {
            fontFamily: "'Lato', sans-serif",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "22px"
        },
        body1: {
            fontFamily: "'Lato', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "19px",
            color: '#555555'
        }
    },
    shape: {
        borderRadiusBig: "4px"
    },
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                    padding: '10px 0'
                }
            }
        }
    },
    spacing: 4
})
theme.shadows.push("-4px 5px 15px rgba(176, 176, 176, 0.45)")

export const useStyles = makeStyles({
    logo: {
        maxWidth: 160,
        marginTop: 20,
        marginBottom: 30
    },
    logoSmall: {
        maxWidth: 92,
        marginTop: 20,
        marginBottom: 30
    },
    buttonReg: {
        backgroundColor: "primary.main",
    }
})