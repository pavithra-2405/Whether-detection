import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [historyData, setHistoryData] = useState([]);
  const fetchHistoryData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/history');
      console.log(response.data);
      setHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/weather?city=${city}`);
        console.log('Weather data:', response.data);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    if (city) {
      fetchWeather();
      fetchHistoryData();
    }
  }, [city]);
  

 


  useEffect(() => {
    

    fetchHistoryData();
  }, []);
  const handleSearch = async (event) => {
    event.preventDefault();
    const newCity = document.getElementById('locationInput').value;
    setCity(newCity);
    fetchHistoryData();
  };

  return (
    <>
      <div className="Container">
        <h1>Weather App</h1>
        <input type="text" id="locationInput" placeholder="Enter city name" />
        <button id="searchButton" onClick={handleSearch}>Search </button>
        <div className="weather-info">
          <h2>Weather</h2>
          {weatherData ? (
            <>
            <p>Temperature: {weatherData.searchedCityTemperature ? ((weatherData.searchedCityTemperature - 273.15).toFixed(2)) : 'N/A'} C</p>
            <p>Description: {weatherData && weatherData.searchedCityDescription ? weatherData.searchedCityDescription : 'N/A'}</p>


          </>
          
          
          
          ) : (
            <p>Please enter a city name and search.</p>
          )}
        </div>
      </div>
      <div className="Container2">
        <h3>History</h3>
        {
          historyData.map((history)=>{
            return (
              <>
              <div className="hist-cont">
              <p>{history.name}</p>
              <p>{history.temperature}</p>
              <p>{history.description}</p>
              </div>
              
              </>
            )
          })

        }
      </div>
    </>
  );
}

export default App;
