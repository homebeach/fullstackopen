import { React, useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios
      .get(' http://localhost:3001/persons')
      .then(response => {
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  return (
    <div>
      {notes.map(note => (
        <div key={note.id}>
          <p>{note.name}</p>
          <p>{note.number}</p>
        </div>
      ))}
    </div>
  )
}

export default App