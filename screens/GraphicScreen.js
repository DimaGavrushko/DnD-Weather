import React from 'react';
import { ScrollView, StyleSheet, Text, Image } from 'react-native';
import { View } from 'react-native'
import { BarChartExample } from '../components/Graphic.js'
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import Colors from "../constants/Colors";
import {getCurrentCoordinates} from "../utils";
export default class GraphicScreen extends React.Component {

    state = {
        dateGraphic: [],
        forecast: {}
    };

    constructor(props) {
        super(props);
        getCurrentCoordinates().then(res => props.changeLocation(...res));
        this.getForecast(props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.getForecast(this.props);
        }
    }
    getForecast(props) {
        let {api_key, lat, lon, units} = props;
        console.log(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`);
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`)
            .then(forecast => {
                forecast.json().then(forecastJson => {
                   this.setState({
                      forecast: forecastJson
                    });
                    this.chooseDate(moment());
                })
          });
    }

   choseBackgroundColor = () => {
        let hours = new Date().getHours();
        if (hours >= 6 && hours < 12) {
            return ([Colors.morning , Colors.disabledDay]);
        } else if (hours >= 12 && hours < 18) {
            return ([ Colors.day , Colors.disabledDay ]);
        } else if (hours >= 18 && hours <= 23) {
            return ([Colors.evening, Colors.disabledNight]);
        } else if (hours >= 0 && hours < 6) {
            return ([Colors.night, Colors.disabledNight]);
        }
    }


   createDateForecast = (forecast) => {
        let result = [];
        let temporary = [];
        forecast.list.forEach((item) => {
            let tmp = item.dt_txt.split(/[- :]/);
            tmp[1] = (tmp[1] - 1).toString();
            let date = new Date(...tmp);
            let temp = item.main;
            temporary.push({
                date: date,
                time: date.getHours(),
                main: temp
            });
            if (date.getHours() === 0) {
                result.push(temporary);
                temporary = [temporary[temporary.length - 1]];
            }
        });
        //console.log(result)
        return result;
    }

   resautlHour = (item) => {
        timeAsString = item.time.toString();
        let timeView = (timeAsString.length === 1  ? ('0' + timeAsString) : timeAsString) +  ':00';
        let temperature = Math.round(item.main.temp);
        var resaultForHour = { x: timeView, y: temperature };
        return resaultForHour;
        }
    chooseDate = (date) => {
        let { forecast } = this.state;
        date = date.format('YYYY-MM-DD');
        let { dateGraphic } = this.state;
        let index = Math.abs((moment().startOf('day')).diff(date, 'days'));
        var forecasts = this.createDateForecast(forecast);
        forecast = forecasts[index].map(this.resautlHour);
        if(forecast.length < 3)
        {

          let addData = forecasts[index+1].map(this.resautlHour);

          //console.log(addData);
          console.log('++++++++++');
          forecast = forecast.concat(addData);
          console.log(forecast);
            console.log('++++++++++');
        }
        newDateGraphic = Array.from(forecast);
        this.setState({dateGraphic: newDateGraphic}, function () {
            console.log(this.state.dateGraphic);
        });
    };

    render() {
        let { dateGraphic } = this.state;
        let datesWhitelist = [{
            start: moment(),
            end: moment().add(4, 'days')
        }];

 return (
         <View style={styles.container}>
         <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
         <View style={{flex: 1}}>
         <CalendarStrip calendarAnimation={{type: 'sequence', duration: 30}}
         daySelectionAnimation={{
         type: 'border',
         duration: 200,
         borderWidth: 1,
         borderHighlightColor: 'white'
         }}
         style={{height: 90, paddingTop: 10, paddingBottom: 0, marginBottom: 0}}
         calendarHeaderStyle={{color: 'white'}}
         calendarColor={ this.choseBackgroundColor()[0]}
         dateNumberStyle={{color: 'white'}}
         dateNameStyle={{color: 'white'}}
         highlightDateNumberStyle={{color: 'yellow'}}
         highlightDateNameStyle={{color: 'yellow'}}
         disabledDateNameStyle={{color: this.choseBackgroundColor()[1]}}
         disabledDateNumberStyle={{color: this.choseBackgroundColor()[1]}}
         selectedDate = {datesWhitelist.start}
         onDateSelected={(date=datesWhitelist.start) => this.chooseDate(date)}
         datesWhitelist={datesWhitelist}/>
         </View>
         <Text>Graphic View</Text>
         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingTop: 10, paddingBottom: 10}}>
              <BarChartExample data={dateGraphic}/>
         </ScrollView>
         </ScrollView>
         </View>
 );
 }
}

GraphicScreen.navigationOptions = {
 title: 'Graphic',
};

const styles = StyleSheet.create({
 container: {
 flex: 1,
 paddingTop: 0,
 backgroundColor: '#fff',
 },
});
