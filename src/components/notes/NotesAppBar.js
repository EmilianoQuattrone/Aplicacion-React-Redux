import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploding } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { activo } = useSelector(state => state.notes);

    const handlePicture = () => {

        document.querySelector('#fileSelector').click();
    }

    const handleSave = () => {

        dispatch(startSaveNote(activo));
    }

    const handleFile = (e) => {

        const files = e.target.files[0];

        if (files) {

            dispatch(startUploding(files));
        }
    }

    return (

        <div className='notes_appbar'>

            <span>23 de febrero 2022</span>

            <input id='fileSelector' type="file" style={{ display: 'none' }} onChange={handleFile} />

            <div>
                <button className='btn' onClick={handlePicture}> Picture </button>
                <button className='btn' onClick={handleSave}> Guardar </button>
            </div>

        </div>
    )
}