const Content = ({ countries }) => {
  // 1. More than 10 matches
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  
  // 2. Between 2 and 10 matches
  if (countries.length > 1) {
    return (
      <div>
        {countries.map(c => <div key={c.cca3}>{c.name.common}</div>)}
      </div>
    )
  }

  // 3. Exactly one match (The view in image_476a11.png)
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} width="150" />
      </div>
    )
  }

  return null
}