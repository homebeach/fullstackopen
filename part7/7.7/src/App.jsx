import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        // Make the API call to get country information
        const response = await fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
        
        if (!response.ok) {
          // Country not found
          const notFoundData = { found: false };
          setCountry(notFoundData);
          return;
        }

        const data = await response.json();
        data.found = true;

        // Set the country state with the retrieved information
        setCountry(data);
      } catch (error) {
        console.error('Error fetching country information:', error.message);
        // Optionally, you can handle errors and set the country state accordingly
        setCountry(null);
      }
    };

    // Call the fetchCountry function when the component mounts or when the name prop changes
    fetchCountry();
  }, [name]); // Dependency array to re-run the effect when the name prop changes

  return country;
};


const Country = ({ country }) => {
  console.log("country")

  console.log(country)

  if (!country) {
    return null
  }

  console.log("country.found")

  console.log(country.found)

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital[0]} </div>
      <div>population {country.population}</div>
      <img src={country.flags.svg} height="100" alt={`flag of ${country.name.common}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App