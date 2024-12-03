import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Filter from './Filter'
import Countries from './Countries'
import Country from './Country' // Import Country component
import './index.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [note, setNote] = useState("")

  return (
    <Router>
      <div>
        {note}
        <Filter setCountries={setCountries} setNote={setNote} />
        <Countries countries={countries} />
        <Switch>
          <Route path="/country/:countryName" component={Country} /> {/* Corrected Route path and added the Country component */}
        </Switch>
      </div>
    </Router>
  )
}

export default App
