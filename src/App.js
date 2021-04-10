import logo from './logo.svg';
import './App.css';
import CardList from './components/CardList';
import { useEffect, useState } from 'react';
import { MdMyLocation, MdLocationSearching } from 'react-icons/md'

function App() {
  const [location, setLocation] = useState({ latitude: 26.1445, longitude: 91.7362 });
  const [city, setCity] = useState('Guwahati');
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    // console.log('useeffect called...');
    document.getElementById('city-name').value = city;
    // console.log('Value inside useeffect >> ', location);
    getCity();
    const weatherurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=[minutely,hourly]&units=metric&appid=94014be88226aec7a02dbc4b61bc3485`;

    // Get weather of place 
    fetch(weatherurl)
      .then(res => res.json())
      .then(data => setForecast({ ...data }))
      .catch(err => `Error fetching weather data : ${err}`);
  }, [location, city]);

  // Get city coordinates
  function getCoords(city) {
    setCity(city);
    const coordsurl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=94014be88226aec7a02dbc4b61bc3485`
    fetch(coordsurl)
      .then(res => res.json())
      .then(data => {
        // console.log('New coords >> ', data);
        const newCoords = { latitude: data[0].lat, longitude: data[0].lon };
        setLocation(newCoords);
      })
      .catch(err => `Error fetching coordinates of city : ${err}`)
  }

  // Get city name from coordinates
  function getCity() {
    // setLocation(coords);
    // console.log('New coords >>> ', location);
    // document.getElementById('city-name').value = 'loading...';
    const cityurl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&appid=94014be88226aec7a02dbc4b61bc3485`;
    fetch(cityurl)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setCity(data[0].name);
      })
      .catch(err => `Error fetching city from coordinates : ${err}`);
  }

  // Get user location
  const options = {
    maximumAge: 30000,
    timeout: 1000,
    enableHighAccuracy: true
  }

  const success = (pos) => {
    // console.log(pos);
    const newcoords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude }
    setLocation(newcoords);
    console.log('New coords >>> ', location);
    getCity();
  }

  const error = (err) => {
    console.log(`Error ${err.code} : ${err.message}`);
  }

  return (
    <div className="container">
      <div className="user-input">
        <input id="city-name" type="text" placeholder="Guwahati" />
        <div className="btn-group">
          <button id="get-forecast" onClick={() => {
            const newcity = document.getElementById('city-name').value;
            getCoords(newcity);
          }}>Forecast</button>
          <button id="get-location" onClick={() => {
            if ('geolocation' in navigator) {
              navigator.geolocation.getCurrentPosition(success, error, options)
              console.log('did this execute before position?');
            } else {
              alert(`Geolocation not available ! `)
            }
            getCity();
          }}>Current location <span><MdMyLocation /></span></button>
        </div>
      </div>
      <div className="daily-forecast">
        {Object.keys(forecast).length > 0 ? <CardList data={forecast.daily} /> : <></>}
      </div>
    </div>
  );
}

export default App;
