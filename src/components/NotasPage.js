
import React, { useState, useEffect } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import '../NotasPage.css';
import { Link, useParams } from 'react-router-dom';
import { NavBar2 } from './NavBar2';
import axios from 'axios'; // Import Axios
import { NgrokUrl } from "./NgrokUrl";

const NotasPage = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const { id_escena } = useParams(); 
  const [notasEditadas, setNotaseditadas] = useState('');
  const [update, setUpdate] = useState(false);

  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`https://${NgrokUrl}/api/notas/${id_escena}`);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [id_escena, update]); 

  const handleChange = (event) => {
    setNoteText(event.target.value);
  };

  const fetchUserIdFromSceneId = async (id_escena) => { // Update function parameter name
    try {
      const response = await axios.get(`https://${NgrokUrl}/api/userAndProjects2/${id_escena}`);
      return response.data.userId;
    } catch (error) {
      console.error('Error fetching user id:', error);
      return null;
    }
  };
  
  const handleupdateChanges = (e, id) => {
    setNotes(notes.map((note) => (note.id_nota === id ? { ...note, contenido: e.target.value } : note)));
        setNotaseditadas(e.target.value)
  }

  // Agregar un nuevo estado para manejar el mensaje de error
  const [errorMessage, setErrorMessage] = useState('');

  // Dentro de handleAddNote, mostrar un mensaje de error si no se puede obtener el id_usuario
  const handleAddNote = async () => {
    if (noteText.trim().length > 0) {
      const id_usuario = await fetchUserIdFromSceneId(id_escena);
      if (id_usuario !== null) {
        try {
          const response = await axios.post(`https://${NgrokUrl}/api/notas`, {
            id_escena: id_escena,
            contenido: noteText
          });
  
          if (response.status === 201) {
            // Add the newly created note to the local state
            setNotes([...notes, response.data]);
            setUpdate(!update);
            // Clear the note text only if a new note is being created
            setNoteText('');
            // Clear the error message if the note is added successfully
            setErrorMessage('');
          } else {
            console.error('Failed to create note:', response.statusText);
            // Show an error message to the user
            setErrorMessage('Failed to create note. Please try again later.');
          }
        } catch (error) {
          console.error('Error adding note:', error);
          // Show an error message to the user
          setErrorMessage('Error adding notes. Please try again later.');
        }
      } else {
        console.error('Could not fetch user ID for scene:', id_escena);
        // Show an error message to the user
        setErrorMessage('Could not fetch user ID for this scene.');
      }
    }
  };

  

  const handleUpdateNote = async (id) => {
    try {
      const response = await axios.put(`https://${NgrokUrl}/api/notas/${id}`, {
        contenido: notasEditadas
      });
      if (response.status === 200) {
        setNotes(notes.map((note) => (note.id_nota === id ? { ...note, contenido: notasEditadas } : note)));
        setNotaseditadas('')
      } else {
        console.error('Failed to update note:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`https://${NgrokUrl}/api/notas/${id}`);
      setNotes(notes.filter((note) => note.id_nota !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className='body'>
      <NavBar2 />
      <div className="content">
        <div className='header'>
          <h1>Notas</h1>
        </div>
        <div className='notes-list'>
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <div className='note' key={note.id_nota}>
                <textarea
                  rows='3'
                  cols='30'
                  value={note.contenido}
                  onChange={(e) =>  handleChange(e, note.id_nota)}
                ></textarea>
                
                <div className='note-footer'>
                  <small>{note.fecha}</small>
                  <MdEdit
                    onClick={() => handleUpdateNote(note.id_nota)}
                    className='edit-icon'
                    size='1.3em'
                  />
                  <MdDeleteForever
                    onClick={() => handleDeleteNote(note.id_nota)}
                    className='delete-icon'
                    size='1.3em'
                  />
                </div>
              </div>
            ))
          ) : (
            <div>No hay notas disponibles.</div>
          )}
          <div className='note new add-note'>
            <textarea
              rows='8'
              cols='10'
              placeholder='Type to add a note...'
              value={noteText}
              onChange={handleChange}
            ></textarea>
            <div className='note-footer'>
            <button className='save' onClick={handleAddNote}>
              Save
            </button>
            </div>
          </div>
        </div>
      </div>
      <Link to={`/ar/${id_escena}`} className="notas-button">Back to AR page</Link>
    </div>
  );
}

export default NotasPage;
