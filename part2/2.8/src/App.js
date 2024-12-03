import React from 'react'
import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])


  const [name, setName] = useState("")

  const [number, setNumber] = useState("")

  function handleNameInputChange(event) {
    setName(event.target.value)
  }

  function handleNumberInputChange(event) {
    setNumber(event.target.value)
  }

  function handleButtonClick(event) {

    event.preventDefault() // Prevents the form submission and page reload

    let person = {name, number}
    if (isNameAlreadyExists(name)) {
      alert(`${person.name} is already added to phonebook`)
    } else {
      setPersons([...persons, person])
    }
  }

  const isNameAlreadyExists = (name) => {
    return persons.some((person) => person.name === name)
  }

  return (
    <div>
      <h2>Phonebook this is hello</h2>
      <form>
        <div>
          name: <input value={name} onChange={handleNameInputChange}/>
          <br/>
          number: <input value={number} onChange={handleNumberInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleButtonClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )

}

export default App