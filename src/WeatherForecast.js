import React from "react";
import "./WeatherForecast.css";
import "./Weather.css";

export default function WeatherForecast() {
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
