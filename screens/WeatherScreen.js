import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import settings from '../settings';
import WeatherCard from "../components/WeatherCard";
import ForecastTable from "../components/ForecastTable";

export default class WeatherScreen extends React.Component {

    state = {
        isLoading: true,
        currWeather: {},
        forecast: {}
    };

    getData() {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?id=${settings.location_id}&appid=${settings.key}&units=${settings.units}`)
            .then(currWeather => {
                currWeather.json().then(currWeatherJson => {
                    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${settings.location_id}&appid=${settings.key}&units=${settings.units}`)
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

    render() {
        this.getData();
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
