import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { startUpload } from "../helpers/fileUpload";

export const startNewNotes = () => {

    return async (dispatch, getState) => {

        //El getState, hace exactamente los mismo que el hook useSelector, captura el estado actual.
        const { uid } = getState().auth;

        const newNote = {

            titulo: '',
            body: '',
            date: new Date().getTime()
        }

        const documento = await db.collection(`${uid}/journal/notes`).add(newNote);
        //documento.id es el id de la note en firebase.
        dispatch(activaNote(documento.id, newNote));
        dispatch(addNewNote(documento.id, newNote));
    }
}

export const activaNote = (id, note) => ({

    type: types.notesActive,
    payload: {

        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({

    type: types.notesAddNew,
    payload: {

        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {

    return async (dispatch) => {

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({

    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if (!note.url) {

            delete note.url;
        }

        const noteToFirestore = {
            ...note
        }
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNotes(note.id, note));
        Swal.fire('Save', note.titulo, 'success');
    }
}

export const refreshNotes = (id, note) => ({

    type: types.notesUpdated,
    payload: {

        id,
        //Retorna note en forma de objeto por el probela en la key.
        note: {

            id,
            ...note
        }
    }
});

export const startUploding = (file) => {

    return async (dispatch, getState) => {

        const { activo: notaActiva } = getState().notes;

        const fileUrl = await startUpload(file);
        // console.log(fileUrl);
        notaActiva.url = fileUrl;

        dispatch(startSaveNote(notaActiva));
    }
}

export const startDelete = (id) => {

    return async (dispatch, getState) => {

        const uid = getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const notesLogoutCleaning = () => ({

    type: types.notesLogoutCleaning
});