import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activaNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

//Logica pesada.
export const NoteScreen = () => {

    const { activo: note } = useSelector(state => state.notes);

    const dispatch = useDispatch();

    /*
        Esta propiedad me trae el siguiente objeto con sus propiedades.
        activo: {
            id:""
            titulo:""
            body:""
            date:
        }
    */

    const [values, handleInputChange, reset] = useForm(note);

    const { titulo, body, id } = values;

    const idActivo = useRef(note.id);
    // console.log(idActivo);

    useEffect(() => {

        if (note.id !== idActivo.current) {

            reset(note);
            idActivo.current = note.id;
        }

    }, [note, reset]);

    useEffect(() => {

        dispatch(activaNote(values.id, { ...values }));

    }, [values, dispatch]);

    const handleDelete = () => {

        dispatch(startDelete(id));
    }

    return (

        <div className='notes_main-content'>

            <NotesAppBar />

            <div className='nodes__content'>

                <input
                    type="text"
                    placeholder='Escribe algo'
                    className='notes__titulo-input'
                    autoComplete='off'
                    name='titulo'
                    value={titulo}
                    onChange={handleInputChange}
                />

                <textarea className='notes__textarea' placeholder='Algo'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    (note.url)
                    &&
                    (<div className='notes_imagenes'>

                        <img
                            alt="Imagen"
                            src={note.url} />
                    </div>)
                }

            </div>

            <button className='btn btn-danger' onClick={handleDelete}>Eliminar</button>
        </div>
    )
}