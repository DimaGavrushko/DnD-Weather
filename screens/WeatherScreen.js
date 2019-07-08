import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import WeatherCard from "../components/WeatherCard";
import ForecastTable from "../components/ForecastTable";
import {getCurrentCoordinates} from "../utils";

export default class WeatherScreen extends React.Component {

    state = {
        isLoading: true,
        currWeather: {},
        forecast: {}
    };

    constructor(props) {
        super(props);
        getCurrentCoordinates().then(res => props.change_location(...res));
    }

    getWeatherAndForecast(props) {
        let {api_key, lat, lon, units} = props;
        return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`)
            .then(currWeather => {
                currWeather.json().then(currWeatherJson => {
                    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`)
                        .then(forecast => {
                            forecast.json().then(forecastJson => {
                                this.setState({
                                    isLoading: false,
                                    currWeather: currWeatherJson,
                                    forecast: forecastJson
                                });
                            })
                        });
                });
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({isLoading: true});
            this.getWeatherAndForecast(this.props);
        }
    }

    render() {
        const {isLoading, currWeather, forecast} = this.state;
        if (isLoading || !Object.keys(currWeather).length) {
            return (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color='#2B7C85'/>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View
                        style={styles.container}>
                        <WeatherCard currWeather={currWeather}/>
                        <ForecastTable forecast={forecast}/>
                    </View>
                </View>
            );
        }
    }
}


WeatherScreen.navigationOptions = {
    title: 'Weather',
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    activityIndicator: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});
