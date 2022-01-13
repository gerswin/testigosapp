import react from 'react'
import {AppBar, Toolbar, IconButton, Box} from '@mui/material'
import logoRnecXxi from "../images/logos_web_sigloXXI_negro.svg";
import logoRnec from "../images/registraduria-nacional.svg";
import {useStyles} from "../theme/themeStyles";

const HeaderCustom = () => {
    const classes = useStyles()

    return (
        <Box sx={{bgcolor: 'bg'}}>
            <AppBar position="static" color='transparent'>
                <Toolbar >
                        <img src={logoRnec} alt='logoRnec' className={classes.logoSmall} />
                        <img src={logoRnecXxi} alt='logoRnec' className={classes.logo} />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default HeaderCustom