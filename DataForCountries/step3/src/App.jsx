import { useState, useEffect } from 'react';
import countryService from './services/countries';
import weatherService from './services/weather';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then(data => setCountries(data));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null); // reset when typing new filter
  };

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const showCountry = (country) => {
    setSelectedCountry(country);
  };

  const renderCountries = () => {
    if (filter === '') {
      return null;
    }

    if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filtered.length > 1) {
      return (
        <ul>
          {filtered.map(c => (
            <li key={c.cca3}>
              {c.name.common}{' '}
              <button onClick={() => showCountry(c)}>Show</button>
            </li>
          ))}
        </ul>
      );
    } else if (filtered.length === 1) {
      return <CountryDetail country={filtered[0]} />;
    } else {
      return <p>No matches found</p>;
    }
  };

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        renderCountries()
      )}
    </div>
  );
}

const api_key = import.meta.env.VITE_SOME_KEY;
console.log("API key:", import.meta.env.VITE_SOME_KEY);

function CountryDetail({ country }) {
  const [weather, setWeather] = useState(null);
  const capital = country.capital[0]; 

  useEffect(() => {
    weatherService.getWeather(capital)
      .then(data => setWeather(data))
      .catch(err => console.error("Weather fetch failed:", err));
  }, [capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
}

export default App;
