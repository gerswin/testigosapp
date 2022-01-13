import React from 'react'
import { useController } from 'react-hook-form'
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const CommonRadioGroup = ({ field, control }) => {
    const { name, label, rules, options } = field

    const { field: {value, onChange}, fieldState, formState} = useController({name, control, rules})

    return (
        <div>
            <FormLabel  >
                <Typography variant="h3" sx={{mb: '10px', mt: 8, color: 'grey.grisOscuro'}}>
                    {label}
                </Typography>
            </FormLabel>

            <RadioGroup
                name={name}
                value={value || '' }
                onChange={onChange}
            >
                {options.map(option => (
                    <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                ))}
            </RadioGroup>
        </div>
    )
}

export default CommonRadioGroup