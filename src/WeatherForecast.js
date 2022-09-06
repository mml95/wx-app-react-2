import React, { useState } from "react";
import "./WeatherForecast.css";
import "./Weather.css";
import axios from "axios";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="row group-days px-md-5">
        <div className="col-md g-3 border-0">
          <ul className="list-group list-group-flush">
            <li className="list-group-item border-0" id="day-week">
              <span className="weather-forecast-day">{forecast[0].dt}</span>
            </li>
            <li className="list-group-item border-0" id="emoji-week">
              {/* <img
                src={props.data.iconUrl}
                alt={props.data.description}
                width="30"
                className="d-block current-emoji"
              /> */}
            </li>
            <li className="list-group-item" id="high-low-week">
              <span className="highs" id="high-weekday">
                {forecast[0].temp.max}°
              </span>
              <span className="lows" id="low-weekday">
                {forecast[0].temp.min}°
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    let apiKey = "c34fe5357ee430b2fa097f83b1285021";
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(handleResponse);

    return null;
  }
}
