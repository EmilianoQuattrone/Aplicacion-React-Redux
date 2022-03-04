import { db } from "../firebase/firebase-config";


export const loadNotes = async (uid) => {

    //Si no tengo notas cargadas que retur un arr vacio return notes = [].
    const getNotes = await db.collection(`${uid}/journal/notes`).get();
    const notes = [];

    getNotes.forEach((note) => {
        //Necesito la propiedad data()
        // console.log(note);

        notes.push({

            id: note.id,
            ...note.data()
        });
    });

    return notes;
}