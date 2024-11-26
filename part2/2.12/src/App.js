import React, { useState, useEffect } from 'react';
import PersonForm from './PersonForm';
import Numbers from './Numbers';
import Filter from './Filter';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const result = await axios.get("http://localhost:3001/persons");
        setPersons(result.data);
        setFilteredPersons(result.data);

    };
    fetchData();
  }, []);

  const [filteredPersons, setFilteredPersons] = useState(persons);

  const addPerson = (person) => {
    if (isNameAlreadyExists(person.name)) {
      alert(`${person.name} is already added to phonebook`);
    } else {
      const newPersons = [...persons, person];
      setPersons(newPersons);
      setFilteredPersons(newPersons);

      axios.post('http://localhost:3001/persons', person);
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