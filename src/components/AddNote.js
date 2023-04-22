import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tags: "" });

    const clickHandle = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tags)
        setnote({ title: "", description: "", tags: "" })
    }

    const changeHandle = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h2>Add a Note</h2>

            <form className='my-3'>
                <div className="form-floating mb-3">
                    <textarea className="form-control" placeholder="Leave a comment here" id="title" name="title" onChange={changeHandle} style={{ height: "100px" }}></textarea>
                    <label htmlFor="title">Title</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" placeholder="Leave a comment here" id="description" name="description" onChange={changeHandle} style={{ height: "100px" }}></textarea>
                    <label htmlFor="description">Description</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" placeholder="Leave a comment here" id="tags" name="tags" onChange={changeHandle} style={{ height: "100px" }}></textarea>
                    <label htmlFor="tags">Tags</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={clickHandle}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;