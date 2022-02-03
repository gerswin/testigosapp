import React from 'react'
import { useController } from 'react-hook-form'
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import CommonTextField from "./CommonTextField";

const CommonRadioGroup = ({ field, control, error }) => {
    const { name, rules, options, row } = field
    const { field: {value, onChange, onBlur}} = useController({name, control, rules})

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
                        if (field.novelty === true) {
                            return (
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
                        } else if (option.addInput === true) {
                            return (
                                <Box key={option.value} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <FormControlLabel
                                        name={name}
                                        value={option.value}
                                        control={<Radio/>}
                                        label={option.label}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                    />
                                    <CommonTextField
                                        key={option.inputLabel.name}
                                        name={option.inputLabel.name}
                                        value={value}
                                        disabled={value !== 'otra'}
                                        control={control}
                                        rules={option.inputLabel.rules}
                                    />
                                </Box>
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