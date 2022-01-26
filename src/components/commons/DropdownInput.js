import React, {useEffect} from "react";
import { MenuItem, Select, NativeSelect, Typography} from "@mui/material";
import { useController } from "react-hook-form";

const DropdownInput = ({ name, label, control, rules, error, options, defaultValue }) => {

    const { field: {value, onChange, onBlur}} = useController({name, control, rules})

    const renderDropdownOptions = () => {
        if (options) {
            return options.map( option => (
                <MenuItem
                    key={option.id}
                    value={ option.id }
                >
                    { option.attributes.novelty}
                </MenuItem>
            ))
        }
    }

    return (
            <>
                <Typography variant="h3" sx={{mb: '10px', mt: 3, color: 'grey.grisOscuro'}}>
                    {label}
                </Typography>
                <Select
                    name={name}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{mb: 3}}
                    variant="outlined"
                    placeholder="seleccione"
                    fullWidth
                    onBlur={onBlur}
                    //native
                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange}
                    error={error && error.isError}
                    control={control}
                >
                    {
                        renderDropdownOptions()
                    }
                </Select>
            </>
    )
}

export default DropdownInput