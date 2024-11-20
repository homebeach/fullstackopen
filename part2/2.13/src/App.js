import React, { useState, useEffect } from 'react';
import PersonForm from './PersonForm';
import Numbers from './Numbers';
import Filter from './Filter';
import axios from 'axios';
import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data);
        setFilteredPersons(response.data);
      })
  }, [])

  const [filteredPersons, setFilteredPersons] = useState(persons);

  const addPerson = (person) => {
    if (isNameAlreadyExists(person.name)) {
      alert(`${person.name} is already added to phonebook`);
    } else {
      const newPersons = [...persons, person];
      noteService
      .create(person)
      .then(response => {
        setPersons(newPersons);
        setFilteredPersons(newPersons);
      })
    }
  };

  const isNameAlreadyExists = (name) => {
    return persons.some((person) => person.name === name);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setFilteredPersons={setFilteredPersons} />
      <PersonForm addPerson={addPerson} isNameAlreadyExists={isNameAlreadyExists} />
      <Numbers filteredPersons={filteredPersons} /> 
    </div>
  );
};

export default App;