import React from 'react'
import AddNote from './AddNote'

export const Note = (props) => {

    return (
        <div className='row my-3'>
            <AddNote showAlert={props.showAlert}/>
        </div>
    )
}
