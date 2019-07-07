import React from 'react';
import {MonoText} from "./StyledText";
import {View, Image, StyleSheet} from "react-native";
import Colors from "../constants/Colors";


export default class ForecastRow extends React.Component {

    render() {
        let day = this.props.day;

        return (
            <View style={styles.forecastRow}>
                <MonoText style={styles.forecastDate} key={day.date}>{day.date}</MonoText>
                <View style={{
                    marginLeft: 'auto',
                    flexDirection: 'column'
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            style={styles.forecastIcon}
                            source={{uri: `http://openweathermap.org/img/wn/${day.iconNight}@2x.png`}}
                        />
                        <MonoText>{day.night[0]}..{day.night[1]}</MonoText>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            style={styles.forecastIcon}
                            source={{uri: `http://openweathermap.org/img/wn/${day.iconDay}@2x.png`}}
                        />
                        <MonoText>{day.day[0]}..{day.day[1]}</MonoText>
                    </View>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    forecastRow: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.tabIconDefault
    },
    forecastDate: {
        fontSize: 18,
        marginTop: -20,
        textAlignVertical: 'center'
    },
    forecastIcon: {
        width: 45,
        height: 45,
        marginTop: -10
    }
});