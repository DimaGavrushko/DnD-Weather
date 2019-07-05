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
        isLoading: false,
        currWeather: {},
    };

    componentDidMount() {
        this.setState({isLoading: true,});
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=${settings.location_id}&appid=${settings.key}&units=${settings.units}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }}).then(res => {
                this.setState({
                    isLoading: false,
                    currWeather: res,
                })
        });
    }

    render() {
        const {isLoading, currWeather} = this.state;

        if (isLoading) {
            return (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color='#2B7C85'/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}>
                    <View style={styles.mainCard}>
                        <Text style={{textAlign: 'center'}}>{currWeather.name}</Text>
                    </View>
                </ScrollView>
            </View>
        );
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
        backgroundColor: 'skyblue'
    }
});
