import { useState } from 'react';

export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {

        setValues(newFormState);
    }


    const handleInputChange = ({ target }) => {

        setValues({

            ...values,
            //name del componente (caja de texto)
            [target.name]: target.value
        });

    }
    return [values, handleInputChange, reset];
}