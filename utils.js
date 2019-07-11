export function getCurrentCoordinates() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                return res([currentLatitude, currentLongitude]);
            },
            (error) => rej(error.message),
            {
                enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
            }
        );
    })
}

export function getCurrentWeather(props) {
    let {api_key, lat, lon, units} = props;
    return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`)
        .then(currWeather => {
            return currWeather.json().then(currWeatherJson => {
                return currWeatherJson;
            });
        });
}

export function getCurrentForecast(props) {
    let {api_key, lat, lon, units} = props;
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`)
        .then(forecast => {
            return forecast.json().then(forecastJson => {
                return forecastJson;
            });
        });
}
