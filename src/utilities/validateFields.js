
const validateFunction = (fields, errors, values, setError) => {
   // console.log({errors, values})
    return fields.forEach( async field => {
        const requiredRule = field.rules.required
        const typeofRule = field.rules.type

        if (typeofRule !== typeof values[field.name] && values[field.name] !== undefined) {
            await setError(field.name, {type: 'typeOf', message: 'Type of field is not valid', isError: true})
        }

        if (field.rules.hasOwnProperty('validate') && values[field.name] !== undefined) {
            const validationRule = field.rules.validate(values[field.name])
            if (field.rules.validate(values[field.name]) !== true) {
                await setError(field.name, {type: 'invalid', message: validationRule, isError: true})
            }
        }

        if (requiredRule && !values[field.name] ) {
            await setError(field.name, {type: 'required', message: 'This field is required.',  isError: true})
        }
    });
}

export default validateFunction;


