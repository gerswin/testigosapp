import React from 'react'
import { useController } from 'react-hook-form'

// Ant Design
import TextField from '@mui/material/TextField';

const onSearch = value => console.log(value);

const CommonTextField = ({ name, label, control, rules }) => {

    const { field, fieldState, formState} = useController({name, control, rules})

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
                />
        }
    }
    return (

        <div>
            {
                renderInput()
            }
        </div>
    )
}

export default CommonTextField
