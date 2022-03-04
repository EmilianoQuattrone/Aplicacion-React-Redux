import { types } from "../types/types";

/*
    (*) Cuando no este autenticado state = {}.

    (*) Cuando el usuario este autenticado 

    {
        uid: abd-123,
        nombre: 'Emiliano'
    }
*/

export const authReducer = (state = {}, action) => {

    switch (action.type) {

        case types.login:

            return {

                uid: action.payload.uid,
                nombre: action.payload.displayName
            }

        case types.logout:

            return {}

        default:

            return state;
    }
}