import react from 'react';
import { ButtonUnstyled } from '@mui/base';
import ButtonBase from "@mui/material/ButtonBase";

const CommonButton = (props) => {
    const {type, label, href} = props
    //const {primario, inactivo, secundario} = type

    return (
        <ButtonUnstyled
            sx={{
                m: '20 auto',
                mt: 3, mb: 2, px: 14,
                bgcolor: 'primary.main', fontWeight: 500,
                color: 'white',
                fontweight: 'fontWeightLight',
            }}
            href={"/informes_asistencia"}
            component={ButtonBase}
        >
            {props.text}
        </ButtonUnstyled>
    )
}

export default CommonButton