import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
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
            {/* <img
              src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
              alt=""
              className="d-block current-emoji"
              width="220"
            /> */}
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
                        className="btn btn-light rounded-0 press-two"
                        type="click"
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
