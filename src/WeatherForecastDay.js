import React from "react";

export default function WeatherForecastDay(props) {
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  function forecastIcon() {
    let icon = `https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`;
    return `${icon}`;
  }
  return (
    <div>
      <div className="WeatherForecast-day text-center">
        <ul className="list-group list-group-flush">
          <li className="list-group-item border-0" id="day-week">
            <span className="forecast-day">{day()}</span>
          </li>
          <li className="list-group-item border-0" id="emoji-week">
            <img src={forecastIcon()} alt="" width="40" />
          </li>
          <li className="list-group-item" id="high-low-week">
            <span className="highs" id="high-weekday">
              {Math.round(props.data.temp.max)}°{" "}
            </span>
            <span className="lows" id="low-weekday">
              {Math.round(props.data.temp.min)}°
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
