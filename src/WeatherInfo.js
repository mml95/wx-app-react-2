import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";
import "./Weather.css";

export default function WeatherInfo(props) {
  let [weatherData, setWeatherData] = useState({ ready: false });
  // let city = useState(props.defaultCity);
  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      date: new Date(response.data.dt * 1000),
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      city: response.data.name,
      description: response.data.weather[0].description,
      iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function searchLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = `b47fdf6445cd8b64ab889be77dbe56d4`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(handleResponse);
  }

  function currentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  return (
    <div className="WeatherInfo">
      <section>
        <div className="row px-5">
          <div className="col-md detail-block text-center">
            <div className="star-city">{props.data.city}</div>

            <img
              src={props.data.iconUrl}
              alt={props.data.description}
              width="220"
              className="d-block current-emoji"
            />
          </div>

          <div className="col-md text-center">
            <div className="current-focus-details">
              <div className="clearfix weather-temperature">
                <div className="float-right">
                  <WeatherTemperature fahrenheit={props.data.temperature} />

                  <ul className="current-details">
                    <li>
                      <FormattedDate date={props.data.date} />
                    </li>
                    <li>Feels Like: {props.data.feelsLike}°</li>
                    <li>Humidity: {props.data.humidity}%</li>
                    <li>Wind: {props.data.wind} mph</li>
                    <li className="weather-description text-capitalize">
                      {props.data.description}
                    </li>
                    <li>
                      <button
                        onClick={currentLocation}
                        className="btn btn-light rounded-0 press-two"
                        type="button"
                      >
                        Current Location
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="weather-forecast text-center"></div>
      </section>
    </div>
  );
}
