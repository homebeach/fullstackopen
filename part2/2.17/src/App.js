import React, { useState, useEffect } from 'react';
import PersonForm from './PersonForm';
import Numbers from './Numbers';
import Filter from './Filter';
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const fetchData = () => {
    personService
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

    const existingPerson = isNameAlreadyExists(person.name);

    if (existingPerson) {

      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old phone number?`)) {
        personService
        .update(existingPerson.id, person)
        .then(response => {
          fetchData();
          displayNoteWithTimeout(`${person.name} number was changed.`);
        })
        .catch(error => {
          displayErrorWithTimeout(`${person.name} was already deleted from server`)
        })
      }

    } else {
      const newPersons = [...persons, person];
      personService
      .create(person)
      .then(response => {
        fetchData();
        displayNoteWithTimeout(`${person.name} succesfully added to phonebook.`);
      })
    }
  };

  const isNameAlreadyExists = (name) => {
    return persons.find((person) => person.name === name);
  };

  const handleDeleteButtonClick = (event, id, name) => {
    event.preventDefault(); // Prevents the form submission and page reload

    if (window.confirm(`Do you really want to delete '${name}'?`)) {
      personService
      .remove(id)
      .then(response => {
        personService.getAll().then(updatedPersons => {
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