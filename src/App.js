import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b82deac8152118cb574f6c75e5968bb0`;

  const searchByLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="searchByCity">
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Location..."
            onKeyDown={searchByLocation}
          />
        </div>
        <div className="topSection">
          <div>
            <h2>{data.name}</h2>
          </div>
          <div>{data.main ? <h1> {data.main.temp.toFixed()}°C</h1> : null}</div>

          <div className="description">
            <div>
              {data.weather && data.weather[0] && data.weather[0].main ? (
                <p>{data.weather[0].main}</p>
              ) : null}
            </div>

            {data.weather && data.weather[0] && data.weather[0].icon ? (
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt="Weather Icon"
              />
            ) : null}
          </div>
        </div>
        <div className="bottomSection">
          <div>
            {data.main ? (
              <p className="bold">{data.main.feels_like}°C</p>
            ) : null}
            <p>Feels like</p>
          </div>
          <div>
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div>
            {data.main ? (
              <p className="bold">{data.wind.speed.toFixed()}km/h</p>
            ) : null}
            <p>Wind speed</p>
          </div>
          <div>
            {data.main ? <p>{data.main.pressure} hPa</p> : null}
            <p>Pressure</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
