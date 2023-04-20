import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props)=> {
    const notesInitial = [
      {
        "_id": "643d31e5c6cc03d46ff07c2d",
        "user": "64396eb9d48574e339bce160",
        "title": "Add for a day",
        "description": "daily routine plan",
        "tags": "Vevsdvv",
        "date": "2023-04-17T11:47:49.804Z",
        "__v": 0
      },
      {
        "_id": "643f78e86a43e64b58fa3eb8",
        "user": "64396eb9d48574e339bce160",
        "title": "Note2",
        "description": "another note",
        "tags": "note",
        "date": "2023-04-19T05:15:20.234Z",
        "__v": 0
      },
      {
        "_id": "643f78ee6a43e64b58fa3eba",
        "user": "64396eb9d48574e339bce160",
        "title": "Note3",
        "description": "another note",
        "tags": "note",
        "date": "2023-04-19T05:15:26.578Z",
        "__v": 0
      }
    ]
    const [notes, setNotes] = useState(notesInitial)

    // Add a Note
    const addNote = (title, description, tags) =>{
      // TO DO : API call
      const note = {
        "_id": "643f78ee6a43e64b58fa3eba",
        "user": "64396eb9d48574e339bce160",
        "title": title,
        "description": description,
        "tags": tags,
        "date": "2023-04-19T05:15:26.578Z",
        "__v": 0
      };
      setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = (id) =>{
      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes)
    }

    // Edit a note
    const editNote = () =>{

    }

  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;