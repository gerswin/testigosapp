import React, {useEffect} from "react";
import { MenuItem, Select, NativeSelect, Typography} from "@mui/material";
import { useController } from "react-hook-form";

const DropdownInput = ({ name, label, control, rules, error, options, defaultValue, mesas }) => {
    const { field: {value, onChange, onBlur}} = useController({name, control, rules})
    console.log(options)
    const renderDropdownOptions = () => {
        return mesas === true ?
            options.map( option => (
                option.type === "typeNovelties" ?
                    <MenuItem
                        key={option.id}
                        value={option.attributes.novelty}
                    >
                        {option.attributes.novelty}
                    </MenuItem> :
                    <MenuItem
                        key={option.tableCode}
                        value={option.tableCode}
                    >
                        Mesa {option.tableCode}
                    </MenuItem>
                )) :
            options.map( option => (
                <MenuItem
                    key={option.id}
                    value={option.id}
                >
                    {option.label}
                </MenuItem>
            ))
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