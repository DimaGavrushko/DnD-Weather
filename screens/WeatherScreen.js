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
                                    forecast: createReadableForecast(forecastJson)
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
                    <ScrollView
                        style={styles.container}>
                        <WeatherCard currWeather={currWeather}/>
                        <View style={styles.forecastTable}>
                            <MonoText>{forecast[0].date} Night: {forecast[0].night[0]}..{forecast[0].night[1]}</MonoText>
                            <Image
                                style={{width: 40, height: 40}}
                                source={{uri: `http://openweathermap.org/img/wn/${forecast[0].iconNight}@2x.png`}}
                            />
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}

function createReadableForecast(forecast) {
    let result = [];
    let dayHours = [9, 12, 15, 18];
    let dayMin, dayMax, nightMin, nightMax;
    let iconCodesDay = [], iconCodesNight = [];
    dayMin = nightMin = 10000;
    dayMax = nightMax = -10000;
    forecast.list.forEach((item) => {
        let tmp = item.dt_txt.split(/[- :]/);
        tmp[1] = (tmp[1] - 1).toString();
        let date = new Date(...tmp);
        if (date.getHours() === 21) {
            result.push({
                date: date,
                day: [Math.round(dayMin), Math.round(dayMax)],
                night: [Math.round(nightMin), Math.round(nightMax)],
                iconCodesDay: iconCodesDay,
                iconCodesNight: iconCodesNight
            });
            dayMin = nightMin = 10000;
            dayMax = nightMax = -10000;
            iconCodesDay = [];
            iconCodesNight = [];
        }
        if (dayHours.indexOf(date.getHours()) === -1) {
            nightMin = Math.min(nightMin, item.main.temp);
            nightMax = Math.max(nightMax, item.main.temp);
            iconCodesNight.push(item.weather[0].icon);
        } else {
            iconCodesDay.push(item.weather[0].icon);
            dayMin = Math.min(dayMin, item.main.temp);
            dayMax = Math.max(dayMax, item.main.temp);
        }

        //console.log(item.dt_txt, item.weather[0].icon);
    });
    return result.filter(checkTemperature).map(changeNameOfDay).map(choseIcon);
}

function checkTemperature(item) {
    return (item.day[0] > -10000 && item.day[1] < 10000) && (item.night[0] > -10000 && item.night[1] < 10000);
}

function changeNameOfDay(item) {
    let currDay = new Date();
    if (item.date.getDay() === currDay.getDay()) {
        item.date = 'Today';
        return item;
    }
    if (item.date.getDay() - currDay.getDay() === 1) {
        item.date = 'Tomorrow';
        return item;
    }
    item.date = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][item.date.getDay()];
    return item;
}

function choseIcon(item) {
    let iconsNightStat = createIconsStat(item.iconCodesNight);
    let iconsDayStat = createIconsStat(item.iconCodesDay);
    iconsNightStat.sort((a, b) => {
        return (b.rating - a.rating) || (b.count - a.count);
    });
    iconsDayStat.sort((a, b) => {
        return (b.rating - a.rating) || (b.count - a.count);
    });
    item.iconNight = iconsNightStat[0].icon + 'n';
    item.iconDay = iconsDayStat[0].icon + 'd';
    return item;
}


function createIconsStat(icons) {
    let rating = {
        '01': 1,
        '02': 1,
        '03': 1,
        '04': 1,
        '09': 2,
        '10': 2,
        '11': 3,
        '13': 2,
        '50': 2
    };
    let iconsStat = [];
    for (let i = 0; i < icons.length; i++) {
        let icon = icons[i].substr(0, 2);
        let count = 0;
        for (let j = 0; j < icons.length; j++) {
            if (icon === icons[j].substr(0, 2)) count++;
        }
        iconsStat.push({
            icon,
            count,
            rating: rating[icon]
        })
    }
    return iconsStat;
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
