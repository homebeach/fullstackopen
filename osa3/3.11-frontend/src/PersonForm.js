import React, { useState } from 'react';

const PersonForm = ({ addPerson, isNameAlreadyExists }) => {
  const [content, setContent] = useState('');
  const [number, setNumber] = useState('');

  const handleNameInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNumber(event.target.value);
  };

  const handleAddButtonClick = (event) => {
    event.preventDefault(); // Prevents the form submission and page reload

    const person = { content, number };
    addPerson(person);
    setContent('');
    setNumber('');
  };

  return (
    <div>
      <form>
        <div>
          name: <input value={content} onChange={handleNameInputChange} />
          <br />
          number: <input value={number} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddButtonClick}>
            add
          </button>      
        </div>
      </form>
    </div>
  );
};

export default PersonForm;