import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

export default function Home(props) {
  const {showAlert}=props
  return (
    <div className='container'>
      <h1 className='text-center mb-5'>iNotebok - Your Notes On Cloud</h1>
      <AddNote showAlert={showAlert} />
      <Notes showAlert={showAlert} />
    </div>
  )
}
