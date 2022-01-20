import react from 'react';
import { ButtonUnstyled } from '@mui/base';
import ButtonBase from "@mui/material/ButtonBase";

const CommonButton = (props) => {
    const {type, label, href, sx, onClick} = props
    const {primario, inactivo, secundario} = type

    const renderButton = () => {
        switch (type) {
            case 'primario':
                return (
                    <ButtonUnstyled
                        sx={{
                            m: '20 auto', mt: 3, mb: 2,
                            px: 5,
                            bgcolor: 'primary.main',
                            fontWeight: 500,
                            color: 'white',
                            maxWidth: "max-content",
                            fontSize: "14px",
                            ...sx
                        }}
                        onClick={onClick}
                        href={ href }
                        component={ButtonBase}
                    >
                        {props.text}
                    </ButtonUnstyled>
                )
            case 'secundario':
                return (
                    <ButtonUnstyled
                        sx={{
                            m: '20 auto', mt: 3, mb: 2,
                            px: 5,
                            bgcolor: 'white',
                            fontWeight: 500,
                            color: 'primary.main',
                            maxWidth: "max-content",
                            fontSize: "14px",
                            border: 1
                        }}
                        href={ href }
                        component={ButtonBase}
                    >
                        {props.text}
                    </ButtonUnstyled>
                )
            default:
                return (
                    <ButtonUnstyled
                        component={ButtonBase}
                    >
                        {props.text}
                    </ButtonUnstyled>
                )
        }
    }

    return (
        renderButton()
    )
}

export default CommonButton