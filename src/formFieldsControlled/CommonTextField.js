import React from 'react'
import { useController } from 'react-hook-form'

// Ant Design
import TextField from '@mui/material/TextField';

const onSearch = value => console.log(value);

const CommonTextField = ({ name, label, placeholder, defaultValue, control, tooltip, rules, error }) => {

    const { field: { onBlur, value, onChange, ref}, fieldState: {invalid, isTouched, isDirty}, formState: { touchedFields, dirtyFields}} = useController({name, control, rules})

    const renderInput = () => {
        switch (rules.type) {
            case "number":
                return <TextField
                    name={name}
                    value={value}
                    controls='false'
                    min={0}
                    placeholder={placeholder}
                    onChange={onChange}
                    style={{minWidth: '100%', marginRight: '20px'}}
                    inputRef={ref}
                    onBlur={onBlur}
                    defaultValue={defaultValue ?? null}
                />
            case "search":
                return <TextField
                    key={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onSearch={onSearch}
                    enterButton={true}
                    inputRef={ref}
                    onBlur={onBlur}
                    defaultValue={defaultValue ?? null}
                />
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
