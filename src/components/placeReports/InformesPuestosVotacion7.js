import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import moment from 'moment';
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, Grid, Snackbar, TextField, Typography} from "@mui/material";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";
import CommonDialog from "../commons/CommonDialog";
import useFetch from "../../utilities/useFetch";
import { useDispatch, useSelector } from 'react-redux';
import { updateTableAssignment, dataTableAssignment} from "../../redux/actions";

const mesasEj = [
    {
        name: '1',
        value: 0
    },
    {
        name: '2',
        value: 0
    },
    {
        name: '3',
        value: 0
    },
    {
        name: '4',
        value: 0
    },
    {
        name: '5',
        value: 0
    },
    {
        name: '6',
        value: 0
    },
    {
        name: '7',
        value: 0
    },
    {
        name: '8',
        value: 0
    },
    {
        name: '9',
        value: 0
    },
    {
        name: '10',
        value: 0
    }
]

const InformesPuestosVotacion7 = () => {
    const [displayModal, setDisplayModal] = useState({})
    const [open, setOpen] = useState(false)
    const [newAlert, setNewAlert] = useState({displayAlert: false, alertMessage: ''})
    const { formState, watch, control} = useForm({
        defaultValues: {
            q1: '',
            q2: '',
        }
    })
    const { errors } = formState;
    const values = watch()
    const parametersUrl =  process.env.API_PUESTOS_URL + '/parameters'
    const delegatesUrl =  process.env.API_PUESTOS_URL + '/delegates' + '?document=1120498069'
    const updateVotingUrl = process.env.API_PUESTOS_URL + '/delegates/voting'
    const { data, loading, error } = useFetch(parametersUrl)
    const dispatch = useDispatch()
    let mesas = useSelector((state)=> state.dataTableAssignment)
    let navigate = useNavigate();

    useEffect(()=>{
        const showErrorAlert = () => {
            if (Object.values(errors).length >= 1) {
                setNewAlert({
                    ...newAlert,
                    displayAlert: true,
                    alertMessage: 'Debe seleccionar una opción válida para continuar'
                })
            }
        }
        return showErrorAlert()
    }, [formState.errors])

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get(delegatesUrl, { cancelToken: source.token } )
            .then(res => {
                //dispatch(dataTableAssignment(res.data.data[0].attributes.tableAssignment))
                dispatch(dataTableAssignment(mesasEj))
            })
            .catch(err => {
                console.log(err)
            })
        return () => {
            source.cancel();
        }
    }, [delegatesUrl])

    const startTimeVoterReportOne = data && data.parameters[0].startTimeVoterReportOne
    const datetime = moment(startTimeVoterReportOne, 'HH:mm').format('HH:mm');

    const fields = [
        {
            type: 'number',
            name: 'q1',
            label: 'Total Votantes',
            disabled: true,
            value: '200',
            rules: {
                required: true,
                type: 'number',
            },
            inputLabel: {
                display: true
            }
        },
        {
            type: 'time',
            name: 'q2',
            label: 'Hora',
            disabled: true,
            value: datetime,
            rules: {
                required: true,
                type: 'text',
            },
            inputLabel: {
                display: true
            }
        }
    ]
    const handleOpen = ( mesa) => {
        setOpen(true)
        setDisplayModal(mesa)

    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleAlertClose = () => {
        setNewAlert({
            ...newAlert,
            displayAlert: false,
            alertMessage: ""
        })
    }
    const body = {
        "data": {
            "type": "delegates",
                "attributes": {
                "document": "1120498069",
                    "hourVoting":"12:00",
                    "tableAssignment": mesas
            }
        }
    }
    const sendUpdateTableAssignment = (mesa, value) => {
        dispatch(updateTableAssignment({name: mesa, value: value}))
        handleClose()
    }
    const postTablesData = async (body) => {
        let response
        try {
            response = await axios.put( updateVotingUrl, body )
            response = await response.data
            console.log(response)
            if (response.data.status === 201) {
                //setAcceptButton(true)
                navigate('/home')
            }
            return response
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <HeaderCustom />
            <Container component="main" maxWidth="xs" sx={{mb: 20}}>
                <Typography variant="h3" sx={{mb: 5, ml: 5, mt: 1, fontWeight: 700, color: "grey.grisOscuro"}} >
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
                    <FormControl component="fieldset" sx={{width: 1, mb: 4, display: 'flex', flexDirection: 'row'}}>
                        <Grid container direction="row" spacing={4} sx={{mb: 1, width: 1}} >
                        {
                            fields.map(field =>
                                field.inputLabel.display === true ?
                                    (
                                        <Grid item xs={6} key={field.name}>
                                            <Typography variant="h3" sx={{mb: '10px', mt: 3, color: 'grey.grisOscuro'}}>
                                                {
                                                    field.label
                                                }
                                            </Typography>
                                            <TextField
                                                type={field.type}
                                                variant="outlined"
                                                required={true}
                                                autoFocus={true}
                                                disabled={field.disabled}
                                                value={field.value}
                                            />
                                        </Grid>
                                    ) : null
                            )
                        }
                        </Grid>
                    </FormControl>

                    <Grid container direction="row" rowSpacing={4} columnSpacing={4}>
                        {
                            mesas.map(mesa => {
                                return (
                                    <Grid key={mesa.name} item xs={4} sx={{mt: 1,  width: 1,}} >
                                        <Box
                                            component="a"
                                            sx={{ boxShadow: 3, height: '100px', borderRadius: '15px',  display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                                            onClick={()=> mesa.value === 0 ? handleOpen( mesa ) : null}
                                            style={{textDecoration: 'none'}}>

                                                <Box sx={{
                                                    borderTopRightRadius: '15px',
                                                    borderTopLeftRadius: '15px',
                                                    width: 1,
                                                    mb: 4,
                                                    justifySelf: 'start',
                                                    height: '12px',
                                                    backgroundColor: mesa.value === 0 ? 'grey.textoGris' : 'primary.main'//if mesa has input values change color to primary.main else grey
                                                }}
                                                />
                                                <Typography
                                                    color={ mesa.value === 0 ? 'grey.textoGris' : 'primary.main'} //if mesa has inputed values primary.main else grey
                                                    x={{ mt: 3, textDecoration: 'none'}}
                                                    variant="h4"
                                                    textAlign="center"
                                                >
                                                    Mesa {mesa.name}
                                                </Typography>
                                                <Typography
                                                    variant="h6" sx={{ mt: 2}}
                                                >
                                                    {mesa.value === 0 ? null : mesa.value }
                                                </Typography>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <CommonButton style={{margin: '0 auto'}} sx={{marginTop: 8}} onClick={()=>postTablesData(body)} text={'GUARDAR'} type='primario' />
                </Box>
                <CommonDialog
                    isinput={true}
                    mesa={displayModal}
                    dialogTitle='Ingrese la cantidad de votantes de la Mesa '
                    open={open}
                    onClose={handleClose}
                    control={control}
                    error={errors[displayModal.name]}
                    rules={{
                        required: true,
                        type: "number",
                        validate: (value) => typeof value !== 'number' ? 'typeof value error' : true
                    }}
                    submitInfo={sendUpdateTableAssignment}
                />
            </Container>
            <Snackbar
                open={newAlert.displayAlert}
                autoHideDuration={5000}
                sx={{display: 'flex', mb: 15, padding: '16px', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgb(251, 235, 234)'}}
                onClose={handleAlertClose}
                children={(
                    <Typography variant="alertTittleS" >{newAlert.alertMessage}</Typography>
                )}
                anchorOrigin={{ vertical: 'bottom', horizontal: "center" }}
            />
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion7
