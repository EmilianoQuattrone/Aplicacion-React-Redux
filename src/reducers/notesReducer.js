/*
    {
        notes: [],
        Cuando no tengamos una nota seleccionada
        activo: null,
        Cuando este seleccionado 
        activo: {

            id: 'asd-4312',
            titulo: '',
            body: '',
            imagenURL: '',
            date: 123654789
        }
    }
*/

import { type } from "@testing-library/user-event/dist/type";
import { types } from "../types/types";

const initialState = {

    notes: [],
    activo: null
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.notesAddNew:

            return {

                ...state,
                notes: [action.payload, ...state.notes]
            }

        case types.notesActive:

            return {

                ...state,
                activo: {

                    ...action.payload
                }
            }

        case types.notesLoad:

            return {

                ...state,
                notes: [...action.payload]
            }

        case types.notesUpdated:

            return {

                ...state,
                notes: state.notes.map(

                    (note) =>

                        note.id === action.payload.id
                            ? action.payload.note
                            : note
                )
            }

        case types.notesDelete:

            return {

                ...state,
                activo: null,
                //action.payload tiene el id de la nota que el usuario quiere eliminar.
                //Debe de regresar una arreglo con las notas, menos la que el usuario selecciono.
                notes: state.notes.filter(note => note.id !== action.payload)
            }

        case types.notesLogoutCleaning:

            return {

                ...state,
                notes: [],
                activo: null,
            }

        default:
            return state;
    }
}