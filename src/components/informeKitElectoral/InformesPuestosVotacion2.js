import {Route} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import HeaderCustom from "../header/HeaderCustom";
import {Box, Container, FormControl, Typography} from "@mui/material";
import CommonRadioGroup from "../formFieldsControlled/CommonRadioGroup";
import CommonButton from "../commons/CommonButton";
import Footer from "../footer/Footer";

const InformesPuestosVotacion2 = () => {
    const { control, formState, getValues, watch} = useForm({
        defaultValues: {
            q1: '',
            q2: ''
        }
    })
    const { errors } = formState;
    //const [displayQ2, setDisplayQ2] = useState(false)

    const values = watch()

    const fields = [
        {
            type: 'radioGroup',
            name: 'q1',
            display: true,
            label: '¿Abrió el puesto de votación?',
            rules: {
                required: true,
                type: 'radio',
            },
            options: [
                {
                    label: 'Si',
                    value: 'si'
                },
                {
                    label: 'Si con novedad',
                    value: 'si_con_novedad',
                },
                {
                    label: 'No',
                    value: 'no'
                }
            ]
        },
        {
            type: 'radioGroup',
            name: 'q2',
            //display: displayQ2,
            label: 'Seleccione una novedad',
            rules: {
                required: false,
                type: "radio"
            },
            options: [
                {
                    label: 'sin_mesas_y_sillas',
                    value: 'Sin mesas y sillas'
                },
                {
                    label: 'Urnas y cubículos mojados',
                    value: 'urnas_y_cubiculos_mojados'
                },
                {
                    label: 'Baños cerrados',
                    value: 'baños_cerrados'
                },
                {
                    label: 'Otra',
                    value: 'otra',
                    addInput: true,
                },
            ]
        },
        {
            type: 'radioGroup',
            name: 'q2',
            //display: displayQ2,
            label: 'Seleccione una novedad',
            rules: {
                required: false,
                type: "radio"
            },
            options: [
                {
                    label: 'Bloqueos para el ingreso al puesto de votación',
                    value: 'bloqueos_para_el_ingreso_al_puesto_de_votación'
                },
                {
                    label: 'No se encuentra el encargado de las llaves',
                    value: 'no_se_encuentra_el_encargado_de_las_llaves'
                },
                {
                    label: 'Problemas por disturbios',
                    value: 'problemas_por_disturbios'
                },
                {
                    label: 'Otra',
                    value: 'otra',
                    addInput: true
                },
            ]
        }
    ]

    return (
        <>
            <HeaderCustom />
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
                    <Box component="form" noValidate sx={{ mt: 1, width: 1 }} display="flex" flexDirection='column' alignItems='center'>
                        <FormControl component="fieldset" sx={{width: 1}}>
                            {
                                fields.slice(0, 1).map(field =>
                                    <CommonRadioGroup
                                        key={field.name}
                                        field={field}
                                        error={errors[field.name]}
                                        control={control}
                                    />
                                )
                            }
                            {
                                fields.slice(2, 3).map(field =>
                                    <CommonRadioGroup
                                        key={field.name}
                                        field={field}
                                        error={errors[field.name]}
                                        control={control}
                                    />
                                )
                            }
                        </FormControl>

                        <CommonButton style={{margin: '0 auto'}} href={'informacion_general'} text={'GUARDAR'} type='primario' />
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default InformesPuestosVotacion2