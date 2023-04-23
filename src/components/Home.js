import React from 'react'
import { Note } from './Notes';

function Home(props) {

  return (
    <div>
      <Note showAlert={props.showAlert}/>
    </div>
  )
}

export default Home