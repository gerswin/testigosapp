import _ from 'underscore';

const useValidateErrors = (touchedFields, errors, dirtyFields, values, clearErrors) => {
    if ( _.isEmpty(touchedFields) || _.isEmpty(touchedFields) !== true ) {
        Object.keys(dirtyFields).forEach( dirtyField => {
            if (errors.hasOwnProperty(dirtyField) && values[dirtyField] !== '' && values[dirtyField] !== undefined) {
                clearErrors(dirtyField)
            }
        })
    }
}

export default useValidateErrors