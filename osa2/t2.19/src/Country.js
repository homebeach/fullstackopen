import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Country = () => {
  const { countryName } = useParams();
  const flagUrl = `https://www.countryflags.com/wp-content/uploads/${countryName}-flag-png-large.png`;

  console.log(flagUrl);

  const baseUrl = 'https://restcountries.com/v3.1/name/';
  const fields = 'name,capital,area,languages';
  const url = `${baseUrl}${countryName}?fields=${fields}`;

  const [country, setCountry] = useState({
    name: { common: '' },
    capital: '',
    area: '',
    languages: {},
  });

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCountry(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  return (
    <div>
      {country.name &&
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
      }
    </div>
  );
};

export default Country;
