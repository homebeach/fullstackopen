import React from 'react'

const Numbers = ({ filteredPersons, handleDeleteButtonClick }) => {

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {Array.isArray(filteredPersons) && filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number} <button type="submit" onClick={(event) => handleDeleteButtonClick(event, person.id, person.name)}> delete </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Numbers