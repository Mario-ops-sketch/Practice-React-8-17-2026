import { useEffect, useRef, useState } from 'react';
import "./Weather_page.css"
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { WeatherList } from './weather/Weather_List'

dayjs.extend(utc);
dayjs.extend(relativeTime);

interface Weather {
    coord: {
        lon: number;
        lat: number;
    };

    id: number;
    dt: number;

    main: {
        humidity: number;
        pressure: number;
        temp: number
    }

    name: string;
    sys: {
        country: string;
        id: number;
        sunrise: number;
        sunset: number;
    }
    timezone: number;
    visibility: number;

    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];

    wind: {
        speed: number;
        deg: number;
    }

}

export function WeatherPage() {

    
    const apiKey = 'df57ff491d7cf80e1d2e1f00d950fe78';
    const cityRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);

    const [weatherData, setWeatherData] = useState<Weather | null>(null);
    const [cityInput, setCityInput] = useState('Cebu');
    const [countryInput, setCountryInput] = useState('ph');
    const [showCityError, setShowCityError] = useState(false);
    const [showCountryError, setShowCountryError] = useState(false);
    const [customAlert, setCustomAlert] = useState<{ show: boolean, message: string }>({
        show: false,
        message: ""
    })
    const [currentTime, setCurrentTime] = useState(dayjs.utc());

    const countryAbb = [{ code: "PH", name: "Philippines" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "CN", name: "China" },
    { code: "IN", name: "India" },
    { code: "SG", name: "Singapore" },
    { code: "UAE", name: "United of Arab Emirates" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "DE", name: "Germany" },
    { code: "ES", name: "Spain" },
    { code: "AU", name: "Austraila" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "NL", name: "Netherlands" }

    ];


    const fetchWeatherData = async (manualCity?: string, manualCountry?: string) => {

       const city = manualCity || cityInput;
        const country = manualCountry || countryInput;

        if (cityInput.length === 0 && countryInput.length === 0) {
            showCityErrorDiv();
            showCountryErrorDiv();
            return;
        }

        if (countryInput.length === 0) {
            showCountryErrorDiv();
            return;
        }

        if (cityInput.length === 0) {
            showCityErrorDiv();
            return;
        }


        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`);
            const data = res.data;
            console.log(data);

            if (data && data.name) {
                setWeatherData(data);
            }

        }
        catch (err: any) {
            if (err.response?.status === 404) {
                triggerAlert("We couldn't find that city. Please check the spelling!");
            } else if (err.response?.status === 429) {
                alert("Too many requests. Please wait.");
            } else {
                console.error("Error fetching weather:", err);
            }

        }

    }


    const triggerAlert = (msg: string) => {
        setCustomAlert({ show: true, message: msg })
    }

    useEffect(() => {
        
        fetchWeatherData();

        const timer = setInterval(() => {
            setCurrentTime(dayjs.utc());
        }, 60000);

        const dataTimer = setInterval(() => {
            if(cityInput && countryInput){
                fetchWeatherData();
            }
        }, 1800000);

        return () => {
            clearInterval(timer); 
            clearInterval(dataTimer);
        }
    }, [])

    const handleCityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCityInput(event.target.value);
        setShowCityError(false);
    }




    const clearCity = () => {
        setCityInput('');
        cityRef.current?.focus();
    }

    const clearCountry = () => {
        setCountryInput('');
        countryRef.current?.focus();
    }

    const getWeather = () => {
        fetchWeatherData();
    }

    const showCityErrorDiv = () => {
        setShowCityError(true);
        setTimeout(() => {
            setShowCityError(false);
        }, 5000);
    }

    const showCountryErrorDiv = () => {
        setShowCountryError(true);
        setTimeout(() => {
            setShowCountryError(false);
        }, 5000);
    }

    const tempCelcius = () => {
        const tempData = weatherData?.main.temp;

        if (tempData === undefined) return '---'

        const celciusFormat = tempData - 273.15;
        return celciusFormat.toFixed(1);

    }

    const sunriseRaw = weatherData?.sys.sunrise || 0;
    const sunsetRaw = weatherData?.sys.sunset || 0;
    const timezoneOffset = weatherData?.timezone || 0;

    return (
        <>
            <div className="weather-container">
                <div className="weather-holder">
                    <div className='weather-search'>
                        <div className='search-logo'>
                            <p>Search</p>
                        </div>

                        <div className='search-city-country'>

                            <div className='search-box'>
                                <label htmlFor='cityInput'><i className="fa-solid fa-magnifying-glass"></i></label>
                                <input id='cityInput' ref={cityRef} value={cityInput} onChange={handleCityInput} className='weather-input' placeholder='Enter City' type='text' />
                                <button onClick={clearCity}>✖</button>
                            </div>
                            <div style={{
                                opacity: showCityError ? 1 : 0
                            }} className='no-city-input'>✖ Input City name</div>

                            <div className='search-box'>
                                <label htmlFor='countryInput'><i className="fa-solid fa-magnifying-glass"></i></label>
                                <input id='countryInput' ref={countryRef} value={countryInput} onChange={(e) => { setCountryInput(e.target.value); setShowCountryError(false) }} className='weather-input' placeholder='Enter Country Code' type='text' />
                                <button onClick={clearCountry}>✖</button>
                            </div>
                            <div style={{
                                opacity: showCountryError ? 1 : 0
                            }} className='no-country-input'>✖ Input Country name</div>

                            <button onClick={getWeather} className='get-weather'>Get Weather</button>
                        </div>

                        <div className='country-abb'>
                            <div className='country-abb-list'>
                                <h1>Country Abbrevations</h1>
                                <div className='country-list'>
                                    {countryAbb.map((country, index) => {
                                        return (
                                            <div className='abb' key={index}>
                                                <p className='country-name'>{country.name}</p>
                                                <div className='country-code'><p>{country.code}</p></div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="weather-description">
                        <div className='weather-location-date'>
                            <div className='weather-location'>
                                <h1>{weatherData?.name}</h1>
                                <p>{weatherData?.sys.country}</p>
                            </div>
                            <div className='weather-date'>
                                <h1>
                                    {weatherData ?
                                        currentTime.add(weatherData.timezone, 'second').format('h:mm A')
                                        : '00:00 AM'
                                    }
                                </h1>
                                <p>{weatherData ?
                                    `UTC (${dayjs.utc().utcOffset(weatherData.timezone / 60).format('Z')})`
                                    : '---'
                                }</p>
                            </div>
                        </div>
                        <div className='weather-icon-descrip'>
                            <div className='weather-icon'>
                                <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`}
                                    alt={weatherData?.weather[0].description} />
                            </div>
                            <div className='weather-descrip-temp'>
                                <p className='weather-temp'>{tempCelcius()} °C</p>
                                <p className='weather-descrip'>{weatherData?.weather[0].description}</p>
                            </div>
                        </div>
                        <div className='weather-main-humid-pressure'>
                            <div className='weather-main'>
                                <h1>Main</h1>
                                <p>{weatherData?.weather[0].main}</p>
                            </div>
                            <div className='weather-humid'>
                                <h1>Humidity</h1>
                                <p>{weatherData?.main.humidity}%</p>
                            </div>
                            <div className='weather-pressure'>
                                <h1>Speed</h1>
                                <p>{weatherData ? `${(weatherData.wind.speed * 3.6).toFixed(2)} km/h` : `---`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="weather-details">
                        <div className='details'>
                            <h1>Details</h1>
                            <div className='detail-container'>
                                <p>Latitude:</p>
                                <p>{weatherData?.coord.lat}</p>
                            </div>

                            <div className='detail-container'>
                                <p>Longitude:</p>
                                <p>{weatherData?.coord.lon}</p>
                            </div>

                            <div className='detail-container'>
                                <p>City ID:</p>
                                <p>{weatherData?.id}</p>
                            </div>

                            <div className='detail-container'>
                                <p>Sunrise:</p>
                                <p>{weatherData ?
                                    dayjs.utc(sunriseRaw * 1000).add(timezoneOffset, 'second').format('h:mm A')
                                    : "00:00 am"
                                }</p>
                            </div>

                            <div className='detail-container'>
                                <p>Sunset:</p>
                                <p>{weatherData ?
                                    dayjs.utc(sunsetRaw * 1000).add(timezoneOffset, 'second').format('h:mm A')
                                    : "00:00 am"
                                }
                                </p>
                            </div>

                            <div className='detail-container'>
                                <p>Visibility:</p>
                                <p>{weatherData ? `${weatherData.visibility / 1000} km` : "---"}</p>
                            </div>

                            <div className='detail-container'>
                                <p>Pressure:</p>
                                <p>{weatherData?.main.pressure} hPa</p>
                            </div>

                            <div className='detail-container'>
                                <p>Deg:</p>
                                <p>
                                    <i className="fa-solid fa-arrow-up"
                                        style={{ transform: `rotate(${weatherData?.wind.deg}deg)` }}>
                                    </i>
                                    {weatherData ? `${weatherData.wind.deg}°` : `---`}

                                </p>
                            </div>

                            <div className='detail-container'>
                                <p>Last Updated:</p>
                                <p>{weatherData ?
                                    dayjs(weatherData.dt * 1000).fromNow()
                                    : "00:00 am"
                                }</p>
                            </div>
                        </div>
                        <div className='notice'>
                            <div className='notice-detail'><span>Notice:</span>Weather synchronized every 3 hours. Local variances may occur.</div>
                        </div>
                    </div>

                    {customAlert.show && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                <p>{customAlert.message}</p>
                                <button onClick={() => setCustomAlert({ ...customAlert, show: false })}>
                                    Got it
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
            
            <WeatherList onCityClick={(city, country) => {
                setCityInput(city);
                setCountryInput(country);
                fetchWeatherData(city, country);
            }} />
        </>

    );
}