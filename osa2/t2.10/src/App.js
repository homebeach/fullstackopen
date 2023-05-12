import React, { useState } from 'react';
import PersonForm from './PersonForm';
import Numbers from './Numbers';
import Filter from './Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);

  const [filteredPersons, setFilteredPersons] = useState(persons);

  const addPerson = (person) => {
    if (isNameAlreadyExists(person.name)) {
      alert(`${person.name} is already added to phonebook`);
    } else {
      const newPersons = [...persons, person];
      setPersons(newPersons);
      setFilteredPersons(newPersons);
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