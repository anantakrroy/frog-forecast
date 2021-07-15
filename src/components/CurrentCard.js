// import { Chart } from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import DateCalc from "../utils/dateCalc";
// import DayCalc from "../utils/dayCalc";
import "../styles/CurrentCard.css";

function CurrentCard({ weather }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [chart, setChart] = useState(false);
  const daily = weather.daily;
  weather = weather.current;
  const date = new Date(weather.dt * 1000);
  const fdate = `${date.getDate()} / ${date.getMonth()}`;
  const day = `${days[date.getDay()]}`;
  // const weatherChart = new Chart(ctx);

  // Weekly graph plot
  const dailyHighs = daily.map(d => d.temp.max);
  const dailyLows = daily.map(d => d.temp.min);
  const dailyLabels = daily.map(d => DateCalc(d.dt));
  
  console.log(`Daily >> ${+dailyHighs[0] % 100} and ${+dailyLows[0] / 100 }`);
  // Data for chart
  const data = {
    labels: dailyLabels,
    color: "white",
    datasets: [
      {
        label: "High \xB0	C",
        data: dailyHighs,
        backgroundColor: ["rgba(72, 235, 200, 0.7)"],
      },
      {
        label: "Low \xB0 C",
        data: dailyLows,
        backgroundColor: ["rgba(255, 255, 255, 1)"],
      },
    ],
  };

  // Config for chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
          font: {
            family: "Oswald",
            weight: 100,
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Dates",
          color: "white",
          font: {
            size: "14px",
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Temperature",
          color: "white",
          font: {
            size: "14px",
          },
        },
      },
    },
  };

  //  Return component for current weather
  return (
    <>
      {/* Show current weather data */}
      {console.log(chart)}
      <div className={chart ? "hide" : "display"}>
        <div className="current-title">
          <p id="curr-title">Current Weather</p>
          <button
            className={chart ? "select" : "unselect"}
            id="weekly-btn"
            onClick={() => {
              // weatherChart.destroy();
              setChart(!chart);
            }}
          >
            Weekly Graph
          </button>
        </div>
        <div id="curr-date" className="date">
          <p className="date-text">{fdate}</p>
          <p className="date-day">{day}</p>
        </div>
        <div className="details">
          <div className="description">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={`Current weather icon : ${weather.weather[0].main}`}
            />
            <p>
              {weather.weather[0].description
                .split(" ")
                .map((e) => e.substring(0, 1).toUpperCase() + e.substring(1))
                .join(" ")}
            </p>
          </div>
          <div className="vert-sep"></div>
          <div className="temps">
            <div className="maxmin">
              <span className="max-label">Temp.</span>
              <span className="max-val">{weather.temp.toFixed(1)} &#8451;</span>
            </div>
            <div className="feels">
              <p>
                <em>Feels Like : {weather.feels_like.toFixed(1)} &#8451;</em>
              </p>
            </div>
            <div className="addl-info">
              <span>Humidity: {weather.humidity}%</span>
              <span>Wind: {weather.wind_speed} kmph</span>
            </div>
          </div>
        </div>
      </div>

      {/* Show weather graph */}

      <div className={chart ? "display" : "hide"}>
        <div className="current-title">
          <p id="curr-title">Current Weather</p>
          <button
            className={chart ? "select" : "unselect"}
            id="weekly-btn"
            onClick={() => {
              // weatherChart.destroy();
              setChart(!chart);
            }}
          >
            Weekly Graph
          </button>
        </div>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}

export default CurrentCard;
