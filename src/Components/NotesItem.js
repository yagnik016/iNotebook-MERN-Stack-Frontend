import React, { useContext, useState } from 'react'
import noteContext from '../context/note/Notecontext'

export default function NotesItem(props) {
    const context = useContext(noteContext); // get the context
    const {deleteNote } = context;
    const {showAlert} = props;

    const [hoveredNote, setHoveredNote] = useState(null);

      // Function to handle hover events
  const handleHover = (note) => {
    setHoveredNote(note);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setHoveredNote(null);
  };

  const handleDelete = () => {
    deleteNote(props.note._id);
    showAlert("Note Deleted Successfully", "success");
  }
  return (
    <div className='col-md-3'>
    <div
    className='card mx-3 my-3'
    onMouseEnter={() => handleHover(props.note)}
    onMouseLeave={handleMouseLeave}
  >
    <div className='card-body'>
      <h5 className='card-title'>
        {props.note.title}
        <i
          className='fa-solid fa-trash'
          style={{ float: 'right', cursor: 'pointer', position: 'relative' }}
          title='Delete this note'
          onClick={handleDelete}
        >
          {hoveredNote === props.note && (
            <span className='tooltip' style={{ position: 'absolute', top: '20px', right: '20px' }}>
              Delete this note
            </span>
          )}
        </i>
        <i
          className='fa-solid fa-pen-to-square mx-3'
          style={{ float: 'right', cursor: 'pointer', position: 'relative' }}
          title='Edit this note'
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal"
          onClick={() => {
            props.updateNoteModal(props.note);
          }}
          
        >
          {hoveredNote === props.note && (
            <span className='tooltip' style={{ position: 'absolute', top: '20px', right: '20px' }}>
              Edit this note
            </span>
          )}
        </i>
      </h5>
      <p className='card-text'>{props.note.description}</p>
      <p className='card-text'>{props.note.tag}</p>
    </div>
  </div>
    </div>
  )
}
