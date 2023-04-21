import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {

    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setnote] = useState({title:"", description:"", tags:"default"});

    const clickHandle = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tags)
    }

    const changeHandle = (e) => {
        setnote({...note, [e.target.name] : e.target.value});
    }

    return (
        <div>
            <h2>Add a Note</h2>

            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="title" name='title' onChange={changeHandle}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description'  onChange={changeHandle}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tags" name='tags'  onChange={changeHandle}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={clickHandle}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote