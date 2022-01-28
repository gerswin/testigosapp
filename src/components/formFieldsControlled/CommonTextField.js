import React from 'react'
import { useController } from 'react-hook-form'

// Ant Design
import TextField from '@mui/material/TextField';
import {Typography} from "@mui/material";

const CommonTextField = ({ name, label, control, rules, error, multiline, defaultValue, disabled }) => {

    const { field: {value, onChange, onBlur} } = useController({name, control, rules})

    const renderInput = () => {
        switch (rules.type) {
            default:
                return <TextField
                    margin="normal"
                    required
                    fullWidth
                    name={name}
                    label={label}
                    type={rules.type}
                    id={name}
                    autoComplete="current-password"
                    value={value}
                    onChange={onChange}
                    error={error && error.isError}
                    onBlur={onBlur}
                    defaultValue={defaultValue}
                    disabled={disabled}
                />
        }
    }
    return (
        <div>
            {
                multiline ? <>
                        <Typography variant="h3" sx={{mb: '10px', mt: 5, color: 'grey.grisOscuro'}}>
                            {label}
                        </Typography>
                        <TextField
                            defaultValue={defaultValue}
                            multiline
                            rows={8}
                            margin="normal"
                            required
                            fullWidth
                            name={name}
                            type={rules.type}
                            id={name}
                            autoComplete="current-password"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={error && error.isError}
                        />
                    </> :
                renderInput()
            }
        </div>
    )
}

export default CommonTextField
