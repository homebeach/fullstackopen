import React, { useState, useEffect } from 'react';
import PersonForm from './PersonForm';
import Numbers from './Numbers';
import Filter from './Filter';
import noteService from './services/notes'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const fetchData = () => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data);
        setFilteredPersons(response.data);
      })
  };
  
  useEffect(() => {
    fetchData();
  }, []);


  function displayNoteWithTimeout(message) {
    setNote(<div className="note">{message}</div>);
    setTimeout(() => setNote(''), 5000);
  }

  function displayErrorWithTimeout(message) {
    setError(<div className="error">{message}</div>);
    setTimeout(() => setError(''), 5000);
    fetchData();
  }

  const addPerson = (person) => {

    const existingPerson = isNameAlreadyExists(person.content);

    if (existingPerson) {

      if (window.confirm(`${existingPerson.content} is already added to phonebook, replace the old phone number?`)) {        
        noteService
        .update(existingPerson.id, person)
        .then(response => {
          fetchData();
          displayNoteWithTimeout(`${person.content} number was changed.`);
        })
        .catch(error => {
          displayErrorWithTimeout(`${person.content} was already deleted from server`)
        })
      }

    } else {
      const newPersons = [...persons, person];
      noteService
      .create(person)
      .then(response => {
        fetchData();
        displayNoteWithTimeout(`${person.content} succesfully added to phonebook.`);
      })
    }
  };

  const isNameAlreadyExists = (content) => {
    return persons.find((person) => person.content === content);
  };

  const handleDeleteButtonClick = (event, id, name) => {
    event.preventDefault(); // Prevents the form submission and page reload

    if (window.confirm(`Do you really want to delete '${name}'?`)) {
      noteService
      .remove(id)
      .then(response => {
        noteService.getAll().then(updatedPersons => {
          fetchData();
          displayNoteWithTimeout(`${name} was deleted.`);
        });
      });
    }
  };

  return (
    <div>
      {error}
      {note} 
      <h2>Phonebook</h2>
      <Filter persons={persons} setFilteredPersons={setFilteredPersons} />
      <PersonForm addPerson={addPerson} isNameAlreadyExists={isNameAlreadyExists} />
      <Numbers filteredPersons={filteredPersons} handleDeleteButtonClick={handleDeleteButtonClick}/> 
    </div>
  );
};

export default App;