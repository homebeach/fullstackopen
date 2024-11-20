import React from 'react';

const Filter = ({ persons, setFilteredPersons }) => {

  const handleFilterTextInputChange = (event) => {
    const filterText = event.target.value;
    setFilteredPersons(
      persons.filter((person) => {
        const name = person.name.toLowerCase();
        const filterTextLowerCase = filterText.toLowerCase();
        return name.includes(filterTextLowerCase);
      })
    );
  };  

  return (
    <div>
      filter shown with: <input onChange={handleFilterTextInputChange} />
    </div>
  );
};

export default Filter;