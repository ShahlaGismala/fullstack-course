import { useState, useEffect } from 'react';
import countryService from './services/countries';

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

function CountryDetail({ country }) {
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
    </div>
  );
}

export default App;
