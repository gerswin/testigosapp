import React from 'react'
import { useController } from 'react-hook-form'
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import FormHelperText from '@mui/material/FormHelperText';
import {TextField} from "@mui/material";

const CommonRadioGroup = ({ field, control, error }) => {
    const { name, label, rules, options, row } = field
    const { field: {value, onChange, onBlur}} = useController({name, control, rules})

    //console.log(error)
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
                {options.map(option => (
                        option.addInput === true ?
                            <Box key={option.value} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <FormControlLabel
                                    name={name}
                                    value={option.value}
                                    control={<Radio/>}
                                    label={option.label}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    required={true}
                                    autoFocus={true}
                                    onBlur={onBlur}
                                />
                            </Box>
                            : <FormControlLabel
                                name={name}
                                key={option.value}
                                value={option.value}
                                control={<Radio/>}
                                label={option.label}
                                onBlur={onBlur}
                                onChange={onChange}
                            />
                    )
                )}
            </RadioGroup>
        </>
    )
}

export default CommonRadioGroup