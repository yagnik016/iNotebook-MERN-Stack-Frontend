import React, { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/note/Notecontext';

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addnotes } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const onChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Check if required fields (title and description) are filled
    if (note.title.trim() === '' || note.description.trim() === '') {
      // Show an alert or handle the error as needed
      console.error('Title and description are required.');
      return;
    }

    addnotes(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
    props.showAlert('Note added successfully', 'success');
  };

  // State to track whether the button is being hovered
  const [isHovered, setIsHovered] = useState(false);

  // Check if required fields are filled
  const isFormValid = note.title.trim() !== '' && note.description.trim() !== '';

  return (
    <div>
      <form className="container my-4 w-50 bg-light rounded shadow mb-5 mt-5 p-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title" value={note.title} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" className="form-control" id="description" value={note.description} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control" id="tag" value={note.tag} onChange={onChange} />
        </div>

        <button
          type="submit"
          className="btn btn-success mt-3"
          style={{ marginLeft: '45%', position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          disabled={!isFormValid}
        >
          Add Note
          {isHovered && (
            <span className="tooltip" style={{ position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)' }}>
              Add this note
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
