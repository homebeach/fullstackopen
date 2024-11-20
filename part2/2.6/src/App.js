import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [name, setName] = useState("");

  function handleInputChange(event) {
    setName(event.target.value);
  }

  function handleButtonClick() {
    let person = { name: {name} }
    setPersons([...persons, person]);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input  value={name} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleButtonClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}

      </ul>
    </div>
  )

}

export default App