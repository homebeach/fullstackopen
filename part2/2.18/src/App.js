import React, { useState } from 'react';
import Filter from './Filter';
import Countries from './Countries';
import './index.css'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [note, setNote] = useState("");

  return (
    <div>
      {note}
      <h2>Phonebook</h2>
      <Filter setCountries={setCountries} setNote={setNote} />
      <Countries countries={countries} /> 
    </div>
  );
};

export default App;