import { useEffect, useState } from 'react';
import './Weather_List.css'
import axios from 'axios';

interface WeatherListProps {
  onCityClick: (cityName: string, countryCode: string) => void;
}

export function WeatherList({ onCityClick }: WeatherListProps) {

    const countryList = [{ code: "PH", name: "Cebu" },
    { code: "KR", name: "Seoul" },
    { code: "JP", name: "Tokyo" },
    { code: "CN", name: "Beijing" },
    { code: "PH", name: "Manila" }];

    const [weatherListData, setWeatherListData] = useState<any[]>([]);
    const apiKey = 'df57ff491d7cf80e1d2e1f00d950fe78';

    useEffect(() => {

        const weatherData = async () => {
            try {
                const promises = countryList.map(city =>
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.code}&appid=${apiKey}`)
                );

                const results = await Promise.all(promises);
                const allData = results.map(res => res.data);
                setWeatherListData(allData);
            }
            catch (err) {
                console.error("Error fetching data: ", err)
            }
        }

        weatherData();

        const interval = setInterval(weatherData, 1800000);

        return () => clearInterval(interval);
    }, []);

    const windDirection = (deg: number): string => {
        if (deg >= 337.5 || deg < 22.5) return 'North';
        if (deg >= 22.5 && deg < 67.5) return 'North-East';
        if (deg >= 67.5 && deg < 112.5) return 'East';
        if (deg >= 112.5 && deg < 157.5) return 'South-East';
        if (deg >= 157.5 && deg < 202.5) return 'South';
        if (deg >= 202.5 && deg < 247.5) return 'South-West';
        if (deg >= 247.5 && deg < 292.5) return 'West';
        if (deg >= 292.5 && deg < 337.5) return 'North-West';
        return 'Calm';
    }

    return (
        <div className="weather-list-container">
            {weatherListData.map((list, index) => (
                <div className='weather-list-holder' key={index} onClick={()=>onCityClick(list.name, list.sys.country)}>
                    <div className='weather-name'>
                        <div className='nameW'>{list.name}</div>
                        <div className='countryW'>{list.sys.country}</div>
                    </div>
                    <div className='weather-icon'>
                        <img className='iconW' src={`https://openweathermap.org/img/wn/${list.weather[0].icon}@4x.png`} />
                    </div>
                    <div className='weather-main'>
                        <p>{list.weather[0].main}</p>
                    </div>
                    <div className='weather-temp-humid-speed-deg'>
                        <div className='weather-thsd'>
                            <p className='weatherW'>{(list.main.temp - 273.15).toFixed(1)}°C</p>
                            <p className='labelW'>Temperature</p>
                        </div>
                        <div className='weather-thsd'>
                            <p className='weatherW'>
                                {windDirection(list.wind.deg)}
                            </p>
                            <p className='labelW'>Wind Direction</p>
                        </div>
                        <div className='weather-thsd'>
                            <p className='weatherW'>{list.main.humidity}%</p>
                            <p className='labelW'>Humidity</p>
                        </div>
                        <div className='weather-thsd'>
                            <p className='weatherW'>{(list.wind.speed * 3.6).toFixed(1)} km/h</p>
                            <p className='labelW'>Wind Speed</p>
                        </div>

                    </div>
                </div>
            ))}

        </div>
    )
}