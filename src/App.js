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
      <div className="searchByCity">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Location..."
          onKeyDown={searchByLocation}
        />
      </div>
      <div className="container">
        <div className="topSection">
          <div className="location">
            <h3>{data.name}</h3>
          </div>
          <div className="temperature">
            {data.main ? <h1> {data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="pressure">
            {data.main ? (
              <p className="bold">{data.main.pressure} hPa</p>
            ) : null}
          </div>
        </div>
        <div className="bottomSection">
          <div className="feels">
            {data.main ? (
              <p className="bold">{data.main.feels_like}°C</p>
            ) : null}
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
          </div>
          <div className="wind">
            {data.main ? (
              <p className="bold">{data.wind.speed.toFixed()}km/h</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
