import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image
} from 'react-native';
import settings from '../settings';
import {MonoText} from "../components/StyledText";
import WeatherCard from "../components/WeatherCard";

export default class WeatherScreen extends React.Component {

    state = {
        isLoading: false,
        currWeather: {},
    };

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=${settings.location_id}&appid=${settings.key}&units=${settings.units}`)
            .then(res => {
                res.json().then(resJson => {
                    this.setState({
                        isLoading: false,
                        currWeather: resJson,
                    });
                    console.log(resJson);
                });
            });
    }

    render() {
        const {isLoading, currWeather} = this.state;

        if (isLoading || !Object.keys(currWeather).length) {
            return (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color='#2B7C85'/>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView
                        style={styles.container}>
                        <WeatherCard currWeather={currWeather}/>
                    </ScrollView>
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
    }
});
