import React from 'react';

const Countries = ({ countries }) => {
  if(countries.length === 1) {
    const country = countries[0];

    const countryName = country.name.common.toLowerCase();

    const flagUrl = `https://www.countryflags.com/wp-content/uploads/${countryName}-flag-png-large.png"`

    console.log(flagUrl);

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.entries(country.languages).map(([code, name]) => (
            <li key={code}>
              {name} ({code})
            </li>
          ))}
        </ul>
        <img src={flagUrl} alt={`Flag of ${country.name.common}`} />
      </div>
    );
  }
  else {
    return (
      <div>
        <h2>Countries</h2>
        <ul>
          {Array.isArray(countries) && countries.map((country, index) => (
              <li key={index}>
              <h3>{country.name.common}</h3>
              </li>
          ))}
        </ul>
      </div>
    );
  }    
};

export default Countries;