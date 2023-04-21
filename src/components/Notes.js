import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote'

export const Note = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    const ref = useRef('')
    const refClose = useRef('')
    const [note, setnote] = useState({id:"", etitle:"", edescription:"", etags:"default"});

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags})
    }

    const clickHandle = (e) => {
        e.preventDefault();
        ref.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etags)
    }

    const changeHandle = (e) => {
        setnote({...note, [e.target.name] : e.target.value});
    }

    useEffect(() => {
        getNotes(); // eslint-disable-next-line
    }, [])

    return (
        <div className='row my-3'>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" aria-describedby="etitle" name='etitle' onChange={changeHandle} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={changeHandle} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} onClick={clickHandle} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={clickHandle} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2>Your notes</h2>
            {notes.map((note) => {
                return <Noteitem key={note._id} updateNote={updateNote} note={note} />
            })}
        </div>
    )
}
