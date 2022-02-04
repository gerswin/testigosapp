import React, {useEffect} from 'react'
import { useController } from 'react-hook-form'
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import CommonTextField from "./CommonTextField";

const CommonRadioGroup = ({ field, control, error }) => {
    const { name, rules, options, row, novelty, addInput } = field
    const { field: {value, onChange, onBlur}} = useController({name, control, rules})

    const otherObject = {
        "type": "typeNovelties",
        "id": "other"+name,
        "attributes": {
            "eventTypeCode": "02",
            "eventTypeText": "Apertura de puesto - Si con novedad",
            "novelty": "Otra",
            "status": "Active",
            "actionDelete": "active",
            "actionEdit": "active",
            "validationMessageDelete": "",
            "validationMessageEdit": ""
        }
    }
    const createOther = ()=> {
            if ( novelty === true && addInput === true) {
                const index = options.findIndex(obj => {
                    return obj.attributes.novelty === "Otra"
                })
                if (index === -1) {
                    options.push(otherObject)
                }
            }
    }
    createOther()

    return (
        <>
            <FormLabel htmlFor={field.name} >
                <Typography variant="h3" sx={{mb: '10px', mt: 4, color: error && error.isError ? 'error.main' : 'grey.grisOscuro'}}>
                    {field.label}
                </Typography>
            </FormLabel>
            <RadioGroup
                sx={{width: 1, }}
                row={row}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            >
                {
                    options.map(option => {
                        if (novelty === true) {
                            return option && option.attributes && option.attributes.novelty === 'Otra' ?
                                 <Box key={option.id} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <FormControlLabel
                                        name={name}
                                        value={option.attributes.novelty}
                                        control={<Radio/>}
                                        label={option.attributes.novelty}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                    />
                                    <CommonTextField
                                        key={option.id}
                                        name={option.id}
                                        value={option.id}
                                        //disabled={value !== 'otra'}
                                        control={control}
                                        rules={field.inputLabel.rules}
                                    />
                                </Box> : (
                                <FormControlLabel
                                    name={name}
                                    key={option.attributes.novelty}
                                    value={option.attributes.novelty}
                                    control={<Radio/>}
                                    label={option.attributes.novelty}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )
                        } else {
                            return (
                                <FormControlLabel
                                    name={name}
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio/>}
                                    label={option.label}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )
                        }
                    }
                    )
                }
            </RadioGroup>
        </>
    )
}

export default CommonRadioGroup