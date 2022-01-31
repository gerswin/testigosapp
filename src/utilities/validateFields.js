
const validateFunction = (fields, errors, values, setError) => {
   // console.log({errors, values})
    return fields.forEach( async field => {
        const requiredRule = field.rules.required
        const typeofRule = field.rules.type

        const fieldInputRequiredRule = field.inputLabel && field.inputLabel.rules.required
        const fieldInputType = field.inputLabel && field.inputLabel.rules.type


        if (field.inputLabel && field.inputLabel.display) {
            if (fieldInputType !== typeof values[field.inputLabel.name] && values[field.inputLabel.name] !== undefined) {
                await setError(field.inputLabel.name, {type: 'typeOf', message: 'Type of field is not valid', isError: true})
            }

            if (field.inputLabel.rules.hasOwnProperty('validate') && values[field.inputLabel.name] !== undefined) {
                const validationRule = field.inputLabel.rules.validate(values[field.inputLabel.name])
                if (field.inputLabel.rules.validate(values[field.inputLabel.name]) !== true) {
                    await setError(field.inputLabel.name, {type: 'invalid', message: validationRule, isError: true})
                }
            }

            if (fieldInputRequiredRule && !values[field.inputLabel.name] ) {
                await setError(field.inputLabel.name, {type: 'required', message: 'This field is required.',  isError: true})
            }
        }

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


