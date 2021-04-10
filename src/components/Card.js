import '../styles/Card.css';

function Card({weather}) {
    const date = new Date(weather.dt * 1000);
    const fdate = `${date.getDate()} / ${date.getMonth()}`;
    return (
        <>
        <div className="weather-card">
            <div className="date">
                <p className="date-text">{fdate}</p>
            </div>
            <div className="details">
                <div className="description">
                    <p>{weather.weather[0].main}</p>
                    <p><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}/></p>
                    <p>{weather.weather[0].description}</p>
                </div>
                <div className="temps">

                </div>
                <div className="addl-info"></div>
            </div>
        </div>
        </>
        // {/* <li>{weather.weather[0].description}</li> */}
    );
}

export default Card;