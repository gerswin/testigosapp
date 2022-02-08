import React, {useState} from 'react';
import {Box, BottomNavigation, BottomNavigationAction, Paper }from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Footer = () => {
    const [value, setValue] = useState(0);

    return (
        <Box sx={{ width: 1 }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        '& .MuiBottomNavigationAction-label': {
                            fontFamily: "'Roboto', sans-serif",
                            fontWeight: 500, fontSize: "12px",
                        }
                    }} label="Home"  href='home' icon={<HomeOutlinedIcon />} />
                    <BottomNavigationAction sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                            '& .MuiBottomNavigationAction-label': {
                                fontFamily: "'Roboto', sans-serif",
                                fontWeight: 500, fontSize: "12px"
                            }
                        }} label="Usuario" href='informacion_general' icon={<PersonIcon />}
                    />
                    <BottomNavigationAction sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                            '& .MuiBottomNavigationAction-label': {
                                fontFamily: "'Roboto', sans-serif",
                                fontWeight: 500, fontSize: "12px"
                            }
                        }} label="Novedades" href='novedades_proceso_eleccion' icon={<MoreVertIcon />}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    )
}

export default Footer