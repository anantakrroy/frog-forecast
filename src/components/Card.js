import '../styles/Card.css';
import DateCalc from '../utils/dateCalc';
import DayCalc from '../utils/dayCalc';

function Card({ weather }) {
    // const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // const date = new Date(weather.dt * 1000);
    // const fdate = `${date.getDate()} / ${date.getMonth()}`;
    // const day = `${days[date.getDay()]}`;
    const fdate = DateCalc(weather.dt);
    const day = DayCalc(weather.dt);
    return (
        <>
            <div className="weather-card">
                <div className="date">
                    <p className="date-text">{fdate}</p>
                    <p className="date-day">{day}</p>
                </div>
                <div className="details">
                    <div className="description">
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={`returt weather icon : ${weather.weather[0].main}`}/>
                        <p>{weather.weather[0].description.split(" ").map(e => e.substring(0,1).toUpperCase() + e.substring(1)).join(" ")}</p>
                    </div>
                    <div className="vert-sep"></div>
                    <div className="temps">
                        <div className="maxmin">
                            <span className="max-label">Max</span>
                            <span className="max-val">{weather.temp["max"].toFixed(1)} &#8451;</span>
                            <span className="min-label">Min</span>
                            <span className="min-val">{weather.temp["min"].toFixed(1)} &#8451;</span>
                        </div>
                        <div className="feels">
                            <p><em>Feels Like : {weather.feels_like["day"].toFixed(1)} &#8451;</em></p>
                        </div>
                        <div className="addl-info">
                            <span>Humidity: {weather.humidity}%</span>
                            <span>Wind: {weather.wind_speed} kmph</span>
                        </div>
                    </div>

                </div>
            </div>
        </>
        // {/* <li>{weather.weather[0].description}</li> */}
    );
}

export default Card;