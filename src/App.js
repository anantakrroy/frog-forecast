import logo from './logo.svg';
import './App.css';
import UserInput from './components/UserInput';
import { useEffect, useState } from 'react';
import { MdMyLocation, MdLocationSearching } from 'react-icons/md'

function App() {
  const [location, setLocation] = useState({ latitude: 26.1445, longitude: 91.7362 });
  const [city, setCity] = useState('Guwahati');
  let apidata = {};

  useEffect(() => {
    console.log('City and coords >>  ', city, location);
    // document.getElementById('city-name').value = city;
    const weatherurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=[minutely,hourly]&appid=94014be88226aec7a02dbc4b61bc3485`;

    // Get weather of place 
    fetch(weatherurl)
      .then(res => res.json())
      .then(data => console.log('Weather data > >', data))
      .catch(err => `Error fetching weather data : ${err}`);
  },[location]);

  // Get city coordinates
  function getCoords(city) {
    const coordsurl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=94014be88226aec7a02dbc4b61bc3485`
    fetch(coordsurl)
      .then(res => res.json())
      .then(data => { 
        console.log('New coords >> ', data);
        const newCoords = { latitude: data[0].lat, longitude: data[0].lon }; 
        setLocation(newCoords); 
      })
      .catch(err => `Error fetching coordinates of city : ${err}`)
  }

  // Get city name from coordinates
  function getCity() {
    const cityurl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&appid=94014be88226aec7a02dbc4b61bc3485`;
    fetch(cityurl)
      .then(res => res.json())
      .then(data => {
        setCity(data[0].name)
        document.getElementById('city-name').value = city;
      })
      .catch(err => `Error fetching city from coordinates : ${err}`);
  }

  // Get user location
  const options = {
    maximumAge: 0,
    timeout: 1000,
    enableHighAccuracy: true
  }

  const success = (pos) => {
    // console.log(pos);
    setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
  }

  const error = (err) => {
    console.log(`Error ${err.code} : ${err.message}`);
  }

  return (
    <>
      <div className="user-input">
        <input id="city-name" type="text" placeholder="Guwahati" />
        <button id="get-forecast" onClick={() => {
          const newcity = document.getElementById('city-name').value;
          console.log('New city >> ', newcity);
          setCity(newcity);
          getCoords(newcity);
        }}>Get Forecast</button>
        <button id="get-location" onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options);
            console.log(navigator);
          }
        }}>Use current location <span><MdMyLocation /></span></button>
      </div>
      <h1></h1>
    </>
  );
}

export default App;
