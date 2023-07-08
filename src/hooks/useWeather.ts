import { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherTypes } from '../types/types';

export const useWeather = () => {
    const [weatherData, setWeatherData] = useState<WeatherTypes | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cityId, setCityId] = useState('280010');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCityId(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDate(event.target.value);
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`https://weather.tsukumijima.net/api/forecast/city/${cityId}`);
                const data = response.data;
                setWeatherData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        fetchWeatherData();
    }, [cityId]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
          month: 'numeric',
          day: 'numeric',
          weekday: 'short',
        };
        return date.toLocaleDateString('ja-JP', options);
    };

    return { weatherData, isLoading, cityId, selectedDate, handleCityChange, handleDateChange, formatDate  };
}