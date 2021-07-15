import appLogo from "./appLogo.png";
import "./App.css";
import dotenv from "dotenv";
import CardList from "./components/CardList";
import CurrentCard from "./components/CurrentCard";
// import OnlineStatus from "./utils/networkCheck";
import Error from "./components/Error";
import { useEffect, useState } from "react";
import { MdMyLocation } from "react-icons/md";

dotenv.config();

function App() {
  const [location, setLocation] = useState({
    latitude: 26.1445,
    longitude: 91.7362,
  });
  const [city, setCity] = useState("Guwahati");
  const [forecast, setForecast] = useState({});
  const [err, setErr] = useState({});

  useEffect(() => {
    // console.log('useeffect called...');
    document.getElementById("city-name").value = city;
    // console.log('Value inside useeffect >> ', location);
    getCity();
    const weatherurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,hourly&units=metric&appid=94014be88226aec7a02dbc4b61bc3485`;

    // Get weather of place
    fetch(weatherurl)
      .then((res) => res.json())
      .then((data) => setForecast({ ...data }))
      .catch((err) => {
        if (err instanceof TypeError) setErr({ error: err });
      });
  }, [location, city]);

  // Get city coordinates from city name
  function getCoords(city) {
    setCity(city);
    const coordsurl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.APP_ID}`;
    fetch(coordsurl)
      .then((res) => res.json())
      .then((data) => {
        console.log("New coords >> ", data);
        const newCoords = { latitude: data[0].lat, longitude: data[0].lon };
        setLocation(newCoords);
      })
      .catch((err) => `Error fetching coordinates of city : ${err}`);
  }

  // Get city name from coordinates
  function getCity() {
    // setLocation(coords);
    // console.log('New coords >>> ', location);
    // document.getElementById('city-name').value = 'loading...';
    const cityurl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&appid=94014be88226aec7a02dbc4b61bc3485`;
    fetch(cityurl)
      .then((res) => res.json())
      .then((data) => {
        console.log("City Name >>> ", data);
        setCity(data[0].name);
      })
      .catch((err) => `Error fetching city from coordinates : ${err}`);
  }

  // Get user location
  const options = {
    maximumAge: 30000,
    timeout: 1000,
    enableHighAccuracy: true,
  };

  const success = (pos) => {
    // console.log(pos);
    const newcoords = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };
    setLocation(newcoords);
    console.log("New coords >>> ", location);
    getCity();
  };

  const error = (err) => {
    console.log(`Error ${err.code} : ${err.message}`);
  };

  return (
    <div className="container">
      <div className="app-title">
        <p id="app-title">
          frog<br></br>
          <span className="orangeTxt">Forecast</span>
        </p>
        <img id="app-logo" src={appLogo} alt="App logo"></img>
      </div>
      <div className="user-input">
        <input id="city-name" type="text" placeholder={`${city}`} />
        <span
          id="loc-tag"
          onClick={() => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(success, error, options);
            } else {
              alert(`Geolocation not available ! `);
            }
            getCity();
          }}
        >
          <MdMyLocation />
        </span>
        {/* <div className="btn-group" id="forecast-btn"> */}
        <button
          id="forecast-btn"
          onClick={() => {
            const newcity = document.getElementById("city-name").value;
            getCoords(newcity);
          }}
        >
          Forecast
        </button>

      </div>
      {console.log(err)}
      {!Object.keys(err).length ? (
        <>
          <div className="current-weather">
            {Object.keys(forecast).length > 0 ? (
              <CurrentCard id="current" weather={forecast} />
            ) : (
              <></>
            )}
          </div>
          <div className="daily-forecast">
            {Object.keys(forecast).length > 0 ? (
              <CardList data={forecast.daily} />
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className="current-weather">
          <Error error={err}></Error>
        </div>
      )}
    </div>
  );
}

export default App;
