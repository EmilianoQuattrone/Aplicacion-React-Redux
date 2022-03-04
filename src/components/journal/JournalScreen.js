import * as React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NadaSeleccionado } from './NadaSeleccionado';
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {

    const { activo } = useSelector(state => state.notes);

    return (

        <div className='journal__main-content'>

            <Sidebar />

            <main>

                {
                    (activo)
                        ?
                        (<NoteScreen />)
                        :
                        (<NadaSeleccionado />)
                }

            </main>

        </div>
    )
}
