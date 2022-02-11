import React, {useState} from 'react'
import { useController } from 'react-hook-form'

// Ant Design
import {Typography, TextField, InputLabel, OutlinedInput, InputAdornment, IconButton} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useStyles} from "../../theme/themeStyles";

const CommonTextField = ({ name, label, control, rules, error, multiline, defaultValue, disabled, type }) => {
    const { field: {value, onChange, onBlur, ref} } = useController({name, control, rules: rules})
    const classes = useStyles()
    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const renderInput = () => {
        switch (type) {
            case 'password':
                return <TextField
                    margin="normal"
                    required
                    fullWidth
                    name={name}
                    label={value ? '' : label}
                    type={values.showPassword ? 'string' : type}
                    id={name}
                    inputRef={ref}
                    size='small'
                    InputLabelProps={{
                        style: {
                            color: 'grey', fontFamily: "'Lato', sans-serif",
                            fontWeight: 400,
                            fontSize: "16px",
                            //lineHeight: "19.2px",
                        },
                        shrink: false,
                    }}
                    InputProps={{ endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                color='grey'
                            >
                                {!values.showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                        </InputAdornment>
                    )}}
                    value={value}
                    onChange={onChange}
                    //error={error && error.isError}
                    FormHelperTextProps={{ component: 'span', style: {marginTop: '5px'}}}
                    onBlur={onBlur}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    helperText={(<Typography variant='mandatoryField'>{error && error.message}</Typography>)}
                />
            default:
                return <TextField
                    margin="normal"
                    required
                    fullWidth
                    name={name}
                    label={value ? '' : label}
                    type={rules.type}
                    id={name}
                    value={value}
                    onChange={onChange}
                    InputLabelProps={{
                        style: {
                            color: 'grey', fontFamily: "'Lato', sans-serif",
                            fontWeight: 400,
                            fontSize: "16px",
                            //lineHeight: "19.2px",
                        },
                        shrink: false,
                    }}
                    size='small'
                    //error={error && error.isError}
                    onBlur={onBlur}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    FormHelperTextProps={{ component: 'span', style: {marginTop: '5px'}}}
                    helperText={error && error.message ? (<Typography variant='mandatoryField'>{error && error.message}</Typography>) : null}
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
