import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activaNote } from '../../actions/notes';

export const JournalEntrie = ({ id, titulo, body, date, url }) => {

    const dispatch = useDispatch();

    const noteDate = moment(date);

    const handleEntryClick = () => {

        dispatch(activaNote(id,
            {
                titulo,
                body,
                date,
                url
            }
        ));
    }
    return (

        <div className='journal__entry pointer' onClick={handleEntryClick}>

            {
                url &&
                <div className='journal__entry-picture'
                    style={{

                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}></div>
            }

            <div className='journal__entry-body'>

                <p className='journal__entry-titulo'> {titulo} </p>

                <p className='journal__entry-contenido'> {body} </p>

            </div>

            <div className='journal__date'>

                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>

            </div>

        </div>
    )
}