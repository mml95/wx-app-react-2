import React, { useState } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";
import "./Weather.css";
import "./Footer";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
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

  function search() {
    const apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function searchLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(handleResponse);
  }

  function currentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="container">
          <div className="weather-app">
            <section>
              <form onSubmit={handleSubmit} className="float-left">
                <div className="row px-md-5">
                  <div className="col-10">
                    <div className="search-bar">
                      <input
                        type="search"
                        placeholder="Find your city..."
                        autoFocus="on"
                        autoComplete="off"
                        className="form-control shadow-sm rounded-0"
                        onChange={handleCityChange}
                      />
                    </div>
                  </div>
                  <div className="col-2 p-0">
                    <input
                      className="d-none d-md-block form-control btn btn-light shadow-sm rounded-0 press-one w-100"
                      type="submit"
                      value="Search"
                    />
                    <button
                      type="submit"
                      className="d-block d-md-none form-control btn btn-light shadow-sm rounded-0 mobile-search w-100"
                    >
                      Find
                    </button>
                  </div>
                </div>
              </form>
            </section>

            <section>
              <div className="row px-5">
                <div className="col-md detail-block text-center">
                  <div className="star-city">{weatherData.data.city}</div>

                  <img
                    src={weatherData.data.iconUrl}
                    alt={weatherData.data.description}
                    width="220"
                    className="d-block current-emoji"
                  />
                </div>

                <div className="col-md text-center">
                  <div className="current-focus-details">
                    <div className="clearfix weather-temperature">
                      <div className="float-right">
                        <WeatherTemperature
                          fahrenheit={weatherData.data.temperature}
                        />

                        <ul className="current-details">
                          <li>
                            <FormattedDate date={weatherData.data.date} />
                          </li>
                          <li>Feels Like: {weatherData.data.feelsLike}°</li>
                          <li>Humidity: {weatherData.data.humidity}%</li>
                          <li>Wind: {weatherData.data.wind} mph</li>
                          <li className="weather-description text-capitalize">
                            {weatherData.data.description}
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

          <WeatherForecast coordinates={weatherData.coordinates} />
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
