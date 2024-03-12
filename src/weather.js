import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiThermometerExterior, WiStrongWind, WiHot, WiThermometerInternal } from 'weather-icons-react';
import clear_icon from './assets/clear.png';
import cloud_icon from './assets/cloud.png';
import drizzle_icon from './assets/drizzle.png';
import rain_icon from './assets/rain.png';
import snow_icon from './assets/snow.png';
import search_icon from './assets/search.png';


const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [uvIndex, setUvIndex] = useState(null);
    const [city, setCity] = useState('Toronto');
    const [searchTerm, setSearchTerm] = useState('');

    const apiKey = '00da85eee8b1c0631e3d29b84f835c32'; 

    const [weatherIcon, setWeatherIcon] = useState(clear_icon);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                setWeather(weatherResponse.data);
                
                const { lat, lon } = weatherResponse.data.coord;
                
                const uvIndexResponse = await axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`);
                setUvIndex(uvIndexResponse.data);

                const iconCode = weatherResponse.data.weather[0].icon;
                switch (iconCode) {
                    case "01d":
                    case "01n":
                        setWeatherIcon(clear_icon);
                        break;
                    case "02d":
                    case "02n":
                        setWeatherIcon(cloud_icon);
                        break;
                    case "03d":
                    case "03n":
                        setWeatherIcon(drizzle_icon);
                        break;
                    case "04d":
                    case "04n":
                        setWeatherIcon(drizzle_icon);
                        break;
                    case "10d":
                    case "10n":
                        setWeatherIcon(rain_icon);
                        break;
                    case "13d":
                    case "13n":
                        setWeatherIcon(snow_icon);
                        break;
                    case "09d":
                    case "09n":
                        setWeatherIcon(rain_icon);
                        break;
                    default:
                        setWeatherIcon(clear_icon); 
                }
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (city) fetchWeather();
    }, [city]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            setCity(searchTerm);
            setSearchTerm(searchTerm);
        }
    };


    return (
        <div className='weather-widget'>
            <div className='search-bar'>
                <input 
                    type="text"
                    className="cityInput" 
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown} 
                />
                <div className="search-icon"> 
                    <img src={search_icon} alt=""/>
                </div>
            </div>
            
            {weather && (
                <>
                    <div className="weather-container">
                            <div className='weather-icon'> 
                                <img src={weatherIcon} alt="Weather Icon" style={{ width: '100%', height: 'auto' }} />
                            </div>

                            <h4>{weather?.name}</h4>
                    
                            <p>
                            <WiThermometerExterior size={25} color="#000" />
                            Temperature: {weather.main.temp}°C
                            </p>

                            <p>
                            <WiThermometerInternal size={35} color="#000" />
                            Feels Like: {weather.main.feels_like}°C 
                            </p>
                            <p class="wind-speed">
                            <WiStrongWind size={25} color='#000' />
                            Wind Speed: {weather.wind.speed} km/h
                            </p>
                            
                            <p>
                            <WiHot size={25} color='#000' />
                            UV Index: {uvIndex?.value}
                            </p>
                            
                    </div>
                </>

            )}
        </div>
    );
};

export default Weather;
