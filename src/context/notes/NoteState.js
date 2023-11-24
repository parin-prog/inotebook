import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props)=> {
  const host = 'http://localhost:5000'
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all Note
    const getNotes = async () =>{
      // API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzOTZlYjlkNDg1NzRlMzM5YmNlMTYwIn0sImlhdCI6MTY4MTczMDI2NH0.AzUMsyWUd670J11T9RmYj_gf4Fw-7t-3OHrCPeoX-KM"
        },
        body: JSON.stringify() // body data type must match "Content-Type" header
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      setNotes(json)
  }

      // Add a Note
      const addNote = async (title, description, tags) =>{
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzOTZlYjlkNDg1NzRlMzM5YmNlMTYwIn0sImlhdCI6MTY4MTczMDI2NH0.AzUMsyWUd670J11T9RmYj_gf4Fw-7t-3OHrCPeoX-KM"
          },
          body: JSON.stringify({title, description, tags}) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)
    }

    // Delete a Note
    const deleteNote = async (id) =>{
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzOTZlYjlkNDg1NzRlMzM5YmNlMTYwIn0sImlhdCI6MTY4MTczMDI2NH0.AzUMsyWUd670J11T9RmYj_gf4Fw-7t-3OHrCPeoX-KM"
          },
          body: JSON.stringify() // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)
        getNotes()
    }

    // Edit a note
    const editNote = async (id, title, description, tags) =>{
      // API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzOTZlYjlkNDg1NzRlMzM5YmNlMTYwIn0sImlhdCI6MTY4MTczMDI2NH0.AzUMsyWUd670J11T9RmYj_gf4Fw-7t-3OHrCPeoX-KM"
        },
        body: JSON.stringify({title, description, tags}) // body data type must match "Content-Type" header
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)
      let newNotes = JSON.parse(JSON.stringify(notes))


      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id) {
          element.title = title;
          element.description = description;
          element.tags = tags;
          break;
        }
      }

      setNotes(newNotes)
    }

  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;