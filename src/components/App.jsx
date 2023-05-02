/* eslint-disable import/no-extraneous-dependencies */
import {
  Droplet, MapPin, Search, Wind,
} from 'react-feather';
import { useEffect, useRef, useState } from 'react';
import './style.scss';
import axios from 'axios';
import Error404 from './404/Error404';

function App() {
  const APIKEY = 'YOUR_API_KEY';

  const [searchValue, setSearchValue] = useState('');
  const [MeteoData, setMeteoData] = useState(null);
  const [celsiusTemp, setCelsiusTemp] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const inputElement = useRef(null);

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const handleSearch = (searchValue) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIKEY}`)
      .then((res) => {
        setMeteoData(res.data);
        const celsius = Math.round((res.data.main.temp - 273.15) * 10) / 10;
        setCelsiusTemp(celsius);
      })
      .catch((error) => {
        // console.log(error);
        setError('Oups, un problème est survenue, just refresh', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(true);
    handleSearch(searchValue);
    setSearchValue('');
  };

  return (
    <div className={!isOpen ? 'container' : 'container-open'}>
      <div className="search-box">
        <form onSubmit={handleSubmit}>
          <MapPin size="32px" className="Icon Icon-map" />
          <input ref={inputElement} type="text" placeholder="Enter Your Location..." value={searchValue} onChange={(e) => { setSearchValue(e.target.value); }} />
          <button type="submit" className="search-button">
            <Search size="24px" className="Icon" />
          </button>
        </form>
      </div>

      {error && (
        <Error404>{error}</Error404>
      )}

      {MeteoData && !error && (
        <div className="weather-box">
          <h1 className="city">{MeteoData.name}</h1>
          <img className="wlogo" src={`http://openweathermap.org/img/w/${MeteoData.weather[0].icon}.png`} alt="" />
          <p className="temperature">{celsiusTemp !== null ? `${celsiusTemp} °C` : ''}</p>
          <p className="weather-description">{MeteoData.weather[0].description}</p>
        </div>
      )}

      {MeteoData && !error && (
        <div className="specialInfos">
          <div className="wind">
            <Wind size="42px" />
            <p className="wind">
              {MeteoData.wind.speed}
              {' '}
              Km/h
            </p>
          </div>
          <div className="humidity">
            <Droplet size="42px" />
            <p>
              {MeteoData.main.humidity}
              {' '}
              %
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
