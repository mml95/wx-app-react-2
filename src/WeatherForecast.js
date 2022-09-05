import React from "react";
import "./WeatherForecast.css";
import "./Weather.css";
import axios from "axios";

export default function WeatherForecast(props) {
  function handleResponse(response) {
    console.log(response.data);
  }

  const apiKey = "a4291214a1e333b12b6de7b256df44ea";
  let longitude = props.coordinates.lon;
  let latitude = props.coordinates.lat;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(handleResponse);
  return (
    <div className="row group-days px-md-5">
      <div className="col-md g-3 border-0">
        <ul className="list-group list-group-flush">
          <li className="list-group-item border-0" id="day-week">
            <span className="weather-forecast-day">Sun</span>
          </li>
          <li className="list-group-item border-0" id="emoji-week">
            <img
              src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
              alt=""
              className="current-emoji"
              width="30"
            />
          </li>
          <li className="list-group-item" id="high-low-week">
            <span className="highs" id="high-weekday">
              {80}
            </span>
            <span className="lows" id="low-weekday">
              {95}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
