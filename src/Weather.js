import React, { useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
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

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="container">
          <div className="weather-app">
            <header>
              <div className="row">
                <div className="col-md">
                  <ul className="world-cities">
                    <li className="world-city">
                      <a href="/" className="city-color">
                        London
                      </a>
                    </li>
                    <li className="world-city">
                      <a href="/" className="city-color">
                        Tokyo
                      </a>
                    </li>
                    <li className="world-city">
                      <a href="/" className="city-color">
                        New York
                      </a>
                    </li>
                    <li className="world-city">
                      <a href="/" className="city-color">
                        Reykjavik
                      </a>
                    </li>
                    <li className="world-city">
                      <a href="/" className="city-color d-none d-md-inline">
                        Lagos
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </header>

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

            <WeatherInfo data={weatherData} />
            <WeatherForecast coordinates={weatherData.coordinates} />
          </div>
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
