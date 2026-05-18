import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const countriesToShow = value === '' 
    ? [] 
    : countries.filter(c => c.name.common.toLowerCase().includes(value.toLowerCase()))

  return (
    <div>
      <div>
        find countries <input value={value} onChange={handleChange} />
      </div>
      <Content countries={countriesToShow} />
    </div>
  )
}

export default App