import React from 'react';
import {StyleSheet, ScrollView} from "react-native";
import Colors from "../constants/Colors";
import ForecastRow from "./ForecastRow";


export default class ForecastTable extends React.Component {

    render() {
        let forecast = createReadableForecast(this.props.forecast);

        return (
            <ScrollView style={styles.forecastTable}>
                {forecast.map(day => (
                    <ForecastRow key={day.date} day={day}/>
                ))}
            </ScrollView>
        )
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
                day: [Math.floor(dayMin), Math.ceil(dayMax)],
                night: [Math.floor(nightMin), Math.ceil(nightMax)],
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

        //console.log(item.dt_txt, item.main.temp);
    });
    //console.log(result);
    return result.filter(checkTemperature).map(fixTemperature).map(changeNameOfDay).map(choseIcon);
}

function fixTemperature(item) {
    item.day[0] = item.day[0] > 0 ? '+' + item.day[0] : item.day[0];
    item.day[1] = item.day[1] > 0 ? '+' + item.day[1] : item.day[1];
    item.night[0] = item.night[0] > 0 ? '+' + item.night[0] : item.night[0];
    item.night[1] = item.night[1] > 0 ? '+' + item.night[1] : item.night[1];
    return item;
}

function checkTemperature(item) {
    return (item.day[0] < 10000 && item.day[1] > -10000) && (item.night[0] < 10000 && item.night[1] > -10000);
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

const styles = StyleSheet.create({
    forecastTable: {
        height: '100%',
        marginTop: -10,
        backgroundColor: 'white',
        paddingTop: 10
    }
});