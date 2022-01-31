import react, { useState } from 'react';
import HeaderCustom from "../header/HeaderCustom";
import Footer from "../footer/Footer";
import {Box, Typography, Container, Grid, TextField, FormControl} from "@mui/material";
import CommonTextField from "../formFieldsControlled/CommonTextField";
import {useForm} from "react-hook-form";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import React from "react";
import axios from "axios";
import {Route, useNavigate} from "react-router-dom";




import useAuthenticationService from "../../domains/AuthenticationService";
import checkGreenIcon from '../../images/estados/checkGreenIcon.svg'
import dangerYellowIcon from '../../images/estados/dangerYellowIcon.svg'
import CommonButton from "../commons/CommonButton";



const InformeKitElectoral =  () => {
   
    const {control, formState} = useForm()
    const {errors} = formState;
    const [mesas, setMesas] = useState([]);
    const [count, setCount] = useState({
        'bueno':{},
        'dano':{},
        'inservible':{},
        'faltantes':{}

    });
    const [tableAssignment, setTableAssignment] = useState([]);
    const estadosCode = {};
    let navigate = useNavigate();


    //const authenticationService = useAuthenticationService()
    //const currentUser = authenticationService.currentUser();
    //const document = currentUser.identityDocument
    
    const document = 1120387794; //@todo todavia  no funciona lo de currentUser

    const url = process.env.API_PUESTOS_URL+'/delegates?document='+document;
    

    
    axios.get(url)
      .then(res => {

        if (!res.data.data[0]['attributes']['tableAssignment']) {
            return false;
        }
        const mesasLael = [];
        res.data.data[0]['attributes']['tableAssignment'].forEach( function(element, index) {
            mesasLael.push({label: 'Mesa '+element,id:element,name:'mesa_'+element+''});
        });

        setMesas(mesasLael);

    });


    const handleSubmit = async (event) => {
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        const oject = {};
        for (let [key, value] of formData.entries()) {
            oject[key] = value;
        }


        for (var key in count) {

            for (var keyNew in count[key]) {
               tableAssignment.push({ 
                "tableCodes":keyNew,
                "statusReceptionKit":estadosCode[key]}
                );
            }
          
        }

        console.log(tableAssignment);

        const data  =  {
            "data": {
                "type": "delegates",
                "attributes": {
                    "document": document,
                    "numberKitReception":oject['numer_kits'],
                    "tableAssignment": tableAssignment
                }
            }
        };

        console.log(data);


        try {
            let response
            const url = process.env.API_PUESTOS_URL+'/delegates/reception';
            response = await axios.post( url, data )
            response = response.data
            console.log(response)
            if (response.data.status === 201) {
                navigate('/informes_puestos_votacion2')
            }
           
        } catch (e) {
            console.log(e)
        }
    };


    const changeTable = (event) => {
        const target = event.target;
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;
        const part   = name.split("_");

        count[value][part[1]] = part[1];

        


    }


/*
    const fields = [
        {
            name: 'kitNumber',
            label: 'kit',
            rules: {
                required: true,
                type: 'number',
            }
        }
    ]
    */
    const estados = [
        {
            label: 'Buen estado',
            color: '#33FF00',
            value: 'bueno',
            icon: checkGreenIcon
        },
        {
            label: 'Daño no significativo',
            color: '#FFF500',
            value: 'dano',
            icon: dangerYellowIcon
        },
        {
            label: 'Inservible',
            color: '#EE002D',
            value: 'inservible'
        },
        {
            label: 'Faltantes',
            color: '#B0B0B0',
            value: 'faltantes'
        },
    ]
    
    for (var key in estados) {
        estadosCode[estados[key]['value']] = estados[key]['label']
    }

    return (
        <>
            <HeaderCustom/>
            <Container component="main" maxWidth="xs" sx={{mb: 20}}>
                <Typography variant="h3" sx={{mb: 5, ml: 5, mt: 5, fontWeight: 700, color: "grey.grisOscuro"}} >
                    Delegados
                </Typography>
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 5
                    }}
                >
                    <Typography variant="h1" sx={{mb: 5}}>
                        Elección de Congreso 2022
                    </Typography>
                    <Typography variant="h2" sx={{mb: 5}} >
                        Informe puesto de votación
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                <Grid container sx={{borderTop: 1, borderBottom: 1, borderColor: "grey.grisDetalles", py: "15px", justifyContent: 'space-between'  }} >
                    <Grid item xs={6} sx={{my: "auto"}} >
                        <Typography variant="titleInput">Numero de kits a recibir</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type="number"
                            variant="outlined"
                            name ="numer_kits"
                            required={true}
                            autoFocus={true}
                        />
                    </Grid>
                </Grid>

                 <Grid container sx={{mt: 6, borderTop: 1, borderColor: "grey.grisDetalles", py: "15px" }} >
                    <Grid item xs={12} sx={{my: "auto", ml: 3}} >
                        <Typography variant="titleInput">Seleccione el Estado</Typography>
                    </Grid>
                    {
                        mesas.map(mesa => {
                            return (
                                <Grid sx={{mt: 1, borderBottom: 1, borderLeft: 1, borderRight: 1, borderColor: "grey.grisDetalles", py: "15px", width: 1, px: 4 }} item >
                                    <FormControl component="fieldset" sx={{width: 1, display: 'flex', flexDirection: 'row'  }} >
                                        <FormLabel sx={{width: 0.4}} >
                                            <Typography variant="h3" sx={{mb: 3, mt: 3, color: 'grey.grisOscuro'}}>
                                                {mesa.label}
                                            </Typography>
                                        </FormLabel>
                                        <RadioGroup
                                            //error={error}
                                            name={mesa.name}
                                            //value={value }
                                            //onChange={onChange}
                                            sx={{width: 1, display: 'flex', flexDirection: 'row', justifyItems: 'space-around'}}
                                        >
                                            {estados.map(estado => (
                                                <Radio  onChange={changeTable} control={control} value={estado.value} key={estado.name} sx={{
                                                    width: '55px',
                                                    '&, &.Mui-checked': {
                                                        color: estado.color,
                                                    }
                                                }}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            )
                        })
                    }
                </Grid>
               
                {
                    estados.map(estado => (
                        <Grid container sx={{ borderBottom: 1, borderColor: "grey.grisDetalles", py: "15px", justifyContent: 'space-between' }} >
                            <Grid item xs={6} sx={{my: "auto"}} >
                                <Typography variant="titleInput">{estado.label}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    type="number"
                                    variant="outlined"
                                    required={true}
                                    autoFocus={true}
                                    name={estado.value}
                                    value={Object.keys(count[estado.value]).length}
                                />
                            </Grid>
                        </Grid>
                    ))
                }
                <Grid container columns={1} direction="column" alignItems='center' >
                    <button type="submit">Guardar</button>
                </Grid>
                </form>
                <Footer/>
            </Container>
        </>
    )
}

export default InformeKitElectoral