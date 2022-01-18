import React from 'react'
import { useController } from 'react-hook-form'
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";

const CommonRadioGroup = ({ field, control, error,  }) => {
    const { name, label, rules, options } = field
    const { field: {value, onChange}, fieldState, formState} = useController({name, control, rules})

    return (
        <Box sx={{width: 1}}>
            <FormLabel>
                <Typography variant="h3" sx={{mb: '10px', mt: 4, color: 'grey.grisOscuro'}}>
                    {label}
                </Typography>
            </FormLabel>

            <RadioGroup
                error={error}
                name={name}
                value={value }
                onChange={onChange}
            >
                {options.map(option => (
                    option.addInput === true ?
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <FormControlLabel
                                key={option.value} value={option.value}
                                control={<Radio/>} label={option.label}
                            />
                            <TextField
                                type="text"
                                variant="outlined"
                                required={true}
                                autoFocus={true}
                            />
                        </Box>
                         : <FormControlLabel
                            key={option.value} value={option.value}
                            control={<Radio/>} label={option.label}
                        />
                    )
                )}
            </RadioGroup>


        </Box>
    )
}

export default CommonRadioGroup