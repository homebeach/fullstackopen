import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [name, setName] = useState("")

  function handleInputChange(event) {
    setName(event.target.value)
  }

  function handleButtonClick(event) {

    event.preventDefault() // Prevents the form submission and page reload

    let person = {name}
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
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={name} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleButtonClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )

}

export default App