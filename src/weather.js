import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [raining, setrain] = useState(false);
    const [airPollution, setAirPollution] = useState(null);
    const [uvIndex, setUvIndex] = useState(null);
    const [city, setCity] = useState('Toronto');
    const [searchTerm, setSearchTerm] = useState('');

    const apiKey = 'API_KEY_GOES_HERE'; 

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                setWeather(weatherResponse.data);

                const rainData = weatherResponse.data.rain;
                setrain(rainData && (rainData["1h"] || rainData["3h"]));
                
                const { lat, lon } = weatherResponse.data.coord;
                
                const airPollutionResponse = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
                setAirPollution(airPollutionResponse.data);
                
                const uvIndexResponse = await axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`);
                setUvIndex(uvIndexResponse.data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (city) fetchWeather();
    }, [city]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCity(searchTerm);
        setSearchTerm('');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div class='weather-widget'>
            <h3>Showing Weather in {city}</h3>
            <form class="input-form" onSubmit={handleSearch}>
                <input 
                    type="text"
                    placeholder="Enter City"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </form>
            {weather && (
                <>
                    <div className="weather-container">
                        <div className="weather-column">
                            <p>Temperature: {weather.main.temp}°C</p>
                            <p>Condition: {weather.weather[0].main}</p>
                            <p class="wind-speed">Wind Speed: {weather.wind.speed} km/h</p>
                            
                            
                        </div>
                        <div className="weather-column">
                            {airPollution && <p>Air Quality Index: {airPollution.list[0].main.aqi}</p>}
                            {uvIndex && <p>UV Index: {uvIndex.value}</p>}
                            <p>Rain: {raining ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </>

            )}
        </div>
    );
};

export default Weather;
