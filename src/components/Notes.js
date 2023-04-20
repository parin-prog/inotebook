import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote'

export const Note = () => {
    const context = useContext(noteContext);
    const {notes} = context;

    return (
        <div className='row my-3'>
            <AddNote />
            <h2>Your notes</h2>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note}/>
            })}
        </div>
    )
}
