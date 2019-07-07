import React from 'react';
import {MonoText} from "./StyledText";
import {Image, StyleSheet, View} from "react-native";
import settings from "../settings";
import Colors from "../constants/Colors";

export default class WeatherCard extends React.Component {

    render() {
        let currWeather = this.props.currWeather;
        return (
            <View style={styles.mainCard}>
                <MonoText
                    style={styles.mainCardBigText}>{currWeather.name}, {currWeather.sys.country}</MonoText>
                <MonoText
                    style={styles.mainCardSmallText}>{currWeather.weather[0].main}: {currWeather.weather[0].description}</MonoText>
                <View style={styles.weather}>
                    <Image
                        style={{width: 100, height: 100}}
                        source={{uri: `http://openweathermap.org/img/wn/${currWeather.weather[0].icon}@2x.png`}}
                    />
                    <MonoText
                        style={styles.temperatureText}>{currWeather.main.temp} {getCurrentUnit()}</MonoText>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <MonoText style={{
                        ...styles.mainCardSmallText,
                        marginRight: 'auto',
                    }}>{new Date().toDateString()}</MonoText>
                    <MonoText style={{
                        ...styles.mainCardSmallText,
                        marginLeft: 'auto'
                    }}>Humidity: {currWeather.main.humidity}%</MonoText>
                </View>
            </View>
        )
    }
}

function getCurrentUnit() {
    switch (settings.units) {
        case 'metric':
            return '\u2103';
        case 'imperial':
            return '\u2109';
        default:
            return '\u212A';
    }
}

function choseBackgroundColor() {
    let hours = new Date().getHours();
    if (hours >= 6 && hours < 12) {
        return Colors.morning;
    } else if (hours >= 12 && hours < 18) {
        return Colors.day;
    } else if (hours >= 18 && hours < 0) {
        return Colors.evening;
    } else if (hours >= 0 && hours < 6) {
        return Colors.night;
    }
}

const styles = StyleSheet.create({
    mainCard: {
        padding: 15,
        width: '100%',
        height: 270,
        backgroundColor: choseBackgroundColor()
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
        marginTop: 22
    }
});
