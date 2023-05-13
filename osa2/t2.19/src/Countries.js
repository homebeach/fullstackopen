import React from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook

const Countries = ({ countries }) => {

  const history = useHistory(); // Initialize useHistory hook

    const handleShowButtonClick = (event, country) => {
      event.preventDefault(); // Prevents the form submission and page reload
      const lowercaseCountryName = country.name.common.toLowerCase();
      history.push(`/coAntry/${lowercaseCountryName}`); // Navigate to Country component with the selected country

    };

    return (
      <div>
        <h2>Countries</h2>
        <ul>
          {Array.isArray(countries) && countries.map((country, index) => (
              <li key={index}>
              <h3>{country.name.common}</h3> <button type="submit" onClick={(event) => handleShowButtonClick(event, country)}> show </button>
              </li>
          ))}
        </ul>
      </div>
    );
    
};

export default Countries;