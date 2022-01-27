import react from 'react'
import {Alert, AlertTitle, Snackbar, Stack} from '@mui/material'

const ErrorNotifications = ({handleClose, error}) => {
    return (
        <Alert icon={false} sx={{width: 1, display: 'flex', flexDirection: 'row'}} variant='standard' color='error' severity="error">
            <AlertTitle sx={{color: '#EE002D'}}>
                {error}
            </AlertTitle>
        </Alert>
    )
}
export default ErrorNotifications;