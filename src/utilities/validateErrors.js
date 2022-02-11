import _ from 'underscore';

const useValidateErrors = (touchedFields, errors, dirtyFields, values, clearErrors) => {
    if ( _.isEmpty(touchedFields) || _.isEmpty(touchedFields) !== true ) {
        Object.keys(dirtyFields).forEach( dirtyField => {
            if (errors.hasOwnProperty(dirtyField) && values[dirtyField] !== '' && values[dirtyField] !== undefined) {
                if (values.password || values.newPassword || values.passwordConfirm) {
                    return values.password && values.password.length <= 7  || values.newPassword && values.newPassword.length <= 7 || values.passwordConfirm && values.passwordConfirm.length <= 7
                }
                clearErrors(dirtyField)
            }
        })
    }
}

export default useValidateErrors