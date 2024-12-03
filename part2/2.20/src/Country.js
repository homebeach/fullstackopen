import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Country = () => {
  const { countryName } = useParams()
  const flagUrl = `https://www.countryflags.com/wp-content/uploads/${countryName}-flag-png-large.png`

  const baseUrl = 'https://restcountries.com/v3.1/name/'
  const fields = 'name,capital,area,languages'
  const url = `${baseUrl}${countryName}?fields=${fields}`


  const [weatherInfo, setWeatherInfo] = useState({})

  const [country, setCountry] = useState({
    name: { common: '' },
    capital: '',
    area: '',
    languages: {},
  })

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCountry(response.data[0])
      })
      .catch((error) => {
        console.error(error)
      })
  }, [url])

  const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + country.capital + "," + country.name.common + "&units=metric&appid=3ccc2416686687acca73e166671633a3"

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then((response) => {
        setWeatherInfo(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [weatherUrl])

  const weatherArray = weatherInfo.weather

  let icon = ""
  if (Array.isArray(weatherArray) && weatherArray.length > 0) {
    icon = weatherArray[0]?.icon ?? "unknown" // "03d"
  }

  let iconUrl = ""
  if (icon !== "unknown") {
    iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
  }
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

          <h2>Weather in {country.name.common}</h2>
          <p>temperature: {weatherInfo?.main?.temp} Celsius</p>

          <img src={iconUrl} />

          <p>wind: {weatherInfo?.wind?.speed} m/s</p>

        </div>
      }
    </div>
  )
}

export default Country
