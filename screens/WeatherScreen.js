import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator, Image
} from 'react-native';
import settings from '../settings';
import WeatherCard from "../components/WeatherCard";
import Colors from "../constants/Colors";
import {MonoText} from "../components/StyledText";
import ForecastTable from "../components/ForecastTable";

export default class WeatherScreen extends React.Component {

    state = {
        isLoading: false,
        currWeather: {},
        forecast: {}
    };

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=${settings.location_id}&appid=${settings.key}&units=${settings.units}`)
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
    },
    mainCard: {
        padding: 15,
        width: '100%',
        height: 300,
        backgroundColor: new Date().getHours() > 18 ? 'steelblue' : 'skyblue'
    },
    mainCardBigText: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    mainCardSmallText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    },
    weather: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    temperatureText: {
        fontSize: 40,
        color: 'white',
        marginTop: 21
    },
    forecastTable: {
        borderWidth: 2,
        borderColor: Colors.tabIconDefault,
        borderRadius: 5,
        height: 100,
        marginTop: -5,
        backgroundColor: 'white',
        padding: 10
    }
});
