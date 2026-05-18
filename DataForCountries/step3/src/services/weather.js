import axios from 'axios';

const api_key = import.meta.env.VITE_SOME_KEY;

const getWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  return axios.get(url).then(res => res.data);
};

export default { getWeather };
