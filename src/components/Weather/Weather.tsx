import { useWeather } from '../../hooks/useWeather';
import Styles from './css/Weather.module.css';

export const Weather = () => {
    const { weatherData, isLoading, cityId, selectedDate, handleCityChange, handleDateChange, formatDate  } = useWeather();

    return (
        <section className={Styles.weather}>
            {isLoading ? (
                <p>Loading...</p>
            ) : weatherData && (
                <>
                    <ul className={Styles.selectWrap}>
                        <li>
                            <h4>日付</h4>
                            <select value={selectedDate} onChange={handleDateChange}>
                                {weatherData.forecasts.map((forecast) => (
                                    <option key={forecast.date} value={forecast.date}>
                                        {formatDate(forecast.date)}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <h4>現在地</h4>
                            <select value={cityId} onChange={handleCityChange}>
                                <option value="280010">神戸</option>
                                <option value="270000">大阪</option>
                                <option value="260010">京都</option>
                                <option value="250020">彦根</option>
                                <option value="290010">奈良</option>
                                <option value="300010">和歌山</option>
                            </select>
                        </li>
                    </ul>

                    {weatherData.forecasts.map((forecast) => forecast.date === selectedDate && (
                        <div className={Styles.weatherWrap} key={forecast.date}>
                            <div className={Styles.main}>
                                <div className={Styles.date}>{formatDate(forecast.date)}</div>
                                <div className={Styles.innerMain}>
                                    <img src={forecast.image.url} alt={forecast.image.title} />
                                    <h3>{forecast.temperature.max.celsius}<span>℃</span></h3>
                                </div>
                            </div>

                            <div className={Styles.sub}>
                                {forecast.chanceOfRain && (
                                    Object.entries(forecast.chanceOfRain).map(([time, chance]) => {
                                        const startHour = time.slice(1, 3).replace(/^0/, '');
                                        const endHour = time.slice(4, 6).replace(/^0/, '');
                                        const formattedTime = `${startHour === '' ? '0' : startHour}:00-${endHour === '' ? '0' : endHour}:00`;
                                        return (
                                            <div className={Styles.chanceOfRain} key={time}>
                                                <h5>{formattedTime}:</h5>
                                                <p>{chance || '--'}</p>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </section>
    );
};
