import React, { useState } from 'react';

const PersonForm = ({ addPerson, isNameAlreadyExists }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameInputChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNumber(event.target.value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevents the form submission and page reload

    const person = { name, number };
    addPerson(person);
    setName('');
    setNumber('');
  };

  return (
    <div>
      <form>
        <div>
          name: <input value={name} onChange={handleNameInputChange} />
          <br />
          number: <input value={number} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit" onClick={handleButtonClick}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;