import React from 'react';
import {StyleSheet, ScrollView} from "react-native";
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

function degToText(val) {
  val = parseFloat(val);
  if( val >= 348.75 || x <= 11.25)
    return 'N';
  if( val >= 11.25 && x <= 33.75)
    return 'NNE';
  if( val >= 33.75 && x <= 56.25)
    return 'NE';
  if( val >= 56.25 && x <= 78.75)
    return 'ENE';
  if( val >= 78.75 && x <= 101.25)
    return 'E';
  if( val >= 101.25 && x <= 123.75)
    return 'ESE';
  if( val >= 123.75 && x <= 146.25)
    return 'SE';
  if( val >= 146.25 && x <= 168.75)
    return 'SSE';
  if( val >= 168.75 && x <= 191.25)
    return 'S';
  if( val >= 191.25 && x <= 213.75)
    return 'SSW';
  if( val >= 213.75 && x <= 236.25)
    return 'SW';
  if( val >= 236.25 && x <= 258.75)
    return 'WSW';
  if( val >= 258.75 && x <= 281.25)
    return 'W';
  if( val >= 281.25 && x <= 303.75)
    return 'WNW';
  if( val >= 303.75 && x <= 326.25)
    return 'NW';
  if( val >= 326.25  && x <= 348.75)
    return 'NNW';
}
