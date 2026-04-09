import { useState, useEffect } from 'react';
import countryService from './services/countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    countryService.getAll().then(data => setCountries(data));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

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
            <li key={c.cca3}>{c.name.common}</li>
          ))}
        </ul>
      );
    } else if (filtered.length === 1) {
      const country = filtered[0];
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
    } else {
      return <p>No matches found</p>;
    }
  };

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      {renderCountries()}
    </div>
  );
}

export default App;
