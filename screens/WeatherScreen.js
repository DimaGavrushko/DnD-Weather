import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import settings from '../settings';

export default class WeatherScreen extends React.Component {

    state = {
        isLoading: true,
        currWeather: {},
    };

    getCurrentWeather() {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?id=${settings.location_id}&appid=${settings.key}&units=${settings.units}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            res.json()
                .then(resJson => {
                    this.setState({
                        isLoading: false,
                        currWeather: resJson,
                    });
                });
        });
    }

    componentDidMount() {
        this.getCurrentWeather();
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}>
                        <Text>Weather in {this.state.currWeather.name} {settings.location_id}</Text>
                    </ScrollView>
                </View>
            );
        }

        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator size='large' color='#2B7C85'/>
            </View>
        )
    }
}

WeatherScreen.navigationOptions = {
    title: 'Weather',
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    activityIndicator: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});
