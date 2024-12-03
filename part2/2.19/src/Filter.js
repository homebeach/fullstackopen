import React from 'react'
import axios from 'axios'

const Filter = ({ setCountries, setNote }) => {

  const baseUrl = "https://restcountries.com/v3.1/name/"
  const fields = "name,capital,area,languages"

  function displayNoteWithTimeout(message) {
    setNote(message)
    setTimeout(() => setNote(''), 5000)
  }

  const handleFilterTextInputChange = (event) => {
    const filterText = event.target.value
    const url = `${baseUrl}${filterText}?fields=${fields}`

    axios.get(url)
      .then(response => {
        if(response.data.length < 10) {
          setCountries(response.data)
        } else {
          displayNoteWithTimeout("Too many matches, specify another filter")
        }

      })
      .catch(error => {
        console.error(error)
      }
    )
  }

  return (
    <div>
      filter countries <input onChange={handleFilterTextInputChange} />
    </div>
  )
}

export default Filter