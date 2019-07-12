import React from 'react';
import {StyleSheet, ScrollView, Text, View, Image} from "react-native";
import GraphicRow from "./GraphicRow";
import {MonoText} from "./StyledText";
import Colors from "../constants/Colors";

export default class GraphicInfoTable extends React.Component {

    render() {
        let allInfoWeatherDay = this.props.allInfoWeatherDay;
        let index = this.props.allInfoWeatherDay;//createReadableForecast(this.props.forecast);
        let uni = this.props.unitsTemp;
        // console.log('START');
        // console.log(this.props.allInfoWeatherDay);
        // console.log('End');
        this.props.allInfoWeatherDay.wind.deg = degToText(this.props.allInfoWeatherDay.wind.deg);

        const funcOfCustomValueRender = (tempVal, unitsValue) => {
          unitsValue = unitsValue.units
          let postfix = '';
          let prefix = ''
          if (unitsValue === 'imperial') {
            postfix = ' °F'
          }
          else if (unitsValue === '') {
            postfix = ' K'
          }
          else if (unitsValue === 'metric') {
            postfix = ' °C'
          }
          if(tempVal > 0)
            prefix = '+'
          else if(tempVal < 0)
              prefix = '-'
          return ( tempVal + postfix);
        };
        //Сверху погода и Today or Tomorrow время и иконка
        //
        //////////FROM main
        ////////main.humidity in %
        /////////main.sea_level Atmospheric pressure on the sea level, hPa
        //

        //FROM weather
        //weather.main (STATE)
        //weather.sea_level Atmospheric pressure on the sea level, hPa
        ///////weather.description
        //weather.icon

        /////// FROM wind
        ////// wind.deg
        ////// wind.speed

        // <ScrollView style={styles.forecastTable}>
        // {forecast.map(day => (
        //     <ForecastRow key={day.date} day={day}/>
        // ))}GraphicRow
        //    </ScrollView>
      //<Text>{allInfoWeatherDay.wind.deg}</Text>
        return (
          <ScrollView style={styles.forecastTable}>

          <View style={styles.forecastRow}>
            <MonoText style={styles.forecastDateON} >{'Weather'}</MonoText>
            <Image
                style={styles.forecastIcon}
                source={{uri: `http://openweathermap.org/img/wn/${this.props.allInfoWeatherDay.weather[0].icon}@2x.png`}}
            />
            <MonoText style={styles.forecastDateImage} >{funcOfCustomValueRender(this.props.allInfoWeatherDay.main.temp, uni)}</MonoText>

          </View>

          <View style={styles.forecastRow}>
            <MonoText style={styles.forecastDateON} >{'Description'}</MonoText>
            <MonoText style={styles.forecastDate} >{this.props.allInfoWeatherDay.weather[0].description} </MonoText>
          </View>

          <View style={styles.forecastRow}>
            <MonoText style={styles.forecastDateON} >{'Humidity'}</MonoText>
            <MonoText style={styles.forecastDate} >{this.props.allInfoWeatherDay.main.humidity} %</MonoText>
          </View>

          <View style={styles.forecastRow}>
            <MonoText style={styles.forecastDateON} >{'Wind speed'}</MonoText>
            <MonoText style={styles.forecastDate} >{this.props.allInfoWeatherDay.wind.deg} {this.props.allInfoWeatherDay.wind.speed} m/s</MonoText>
          </View>

          <View style={styles.forecastRow}>
            <MonoText style={styles.forecastDateON} >{'Sea level'}</MonoText>
            <MonoText style={styles.forecastDate} >{this.props.allInfoWeatherDay.main.sea_level} hPa</MonoText>
          </View>
          </ScrollView>
        )
    }
}

function degToText(val) {
  val = parseFloat(val);
  let text = ''
  if( val >= 348.75 || val <= 11.25)
    text  =  'N';
  else if( val >= 11.25 && val <= 33.75)
    text  =  'NNE';
  else if( val >= 33.75 && val <= 56.25)
    text  =  'NE';
  else if( val >= 56.25 && val <= 78.75)
    text  =  'ENE';
  else if( val >= 78.75 && val <= 101.25)
    text  =  'E';
  else if( val >= 101.25 && val <= 123.75)
    text  =  'ESE';
  else if( val >= 123.75 && val <= 146.25)
    text  =  'SE';
  else if( val >= 146.25 && val <= 168.75)
    text  =  'SSE';
  else if( val >= 168.75 && val <= 191.25)
    text  =  'S';
  else if( val >= 191.25 && val <= 213.75)
    text  =  'SSW';
  else if( val >= 213.75 && val <= 236.25)
    text  =  'SW';
  else if( val >= 236.25 && val <= 258.75)
    text  =  'WSW';
  else if( val >= 258.75 && val <= 281.25)
    text  =  'W';
  else if( val >= 281.25 && val <= 303.75)
    text  =  'WNW';
  else if( val >= 303.75 && val <= 326.25)
    text  =  'NW';
  else if( val >= 326.25  && val <= 348.75)
    text  =  'NNW';
  return text;

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
        fontSize: 17,
        margin: 2,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignSelf: "center"
    },
    forecastDateON: {
        fontSize: 11,
        fontWeight: 'bold',
        marginTop: 2,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignSelf: "center"
    },
    forecastDateImage: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
        //paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignSelf: "center"
    },
    forecastIcon: {
        width: 45,
        height: 45,
      //  marginTop: -10
    }
});
