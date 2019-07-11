import React from 'react';
import {ScrollView, StyleSheet, Text, Image, ActivityIndicator, RefreshControl} from 'react-native';
import {View} from 'react-native'
import BarChartExample from '../components/Graphic.js';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import Colors from "../constants/Colors";
import LineChart from '../node_modules/react-native-pure-chart/examples/pure-chart/components/line-chart.js'
export default class GraphicScreen extends React.Component {

    state = {
      isLoading: true,
      isRefreshing: false,
      date: '',
      dateGraphic: [],
      forecast: {},
      unitsTemp:  '',
      index: 0,
      allInfoWeatherDay: {},
      weatherFirstDayIndex:  null
    };

    constructor(props) {
        super(props);
        this.changeState = this.changeState.bind(this)
        this.getForecast(props);
    }

    changeState(num) {
      console.log("Work OF MAIN take num = " + num);

    this.setState({
      index: num
    })
  }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({isLoading: true});
            this.getForecast(this.props);
        }
    }
    onRefresh = () => {
        this.setState({isRefreshing: true});
        this.getForecast(this.props);
    };

    getForecast(props) {
        let {api_key, lat, lon, units} = props;
        console.log(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`);
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`)
            .then(forecast => {
                forecast.json().then(forecastJson => {
                    this.setState({
                        isRefreshing: false,
                        isLoading: false,
                        forecast: forecastJson,
                        unitsTemp: {units},
                        index: 0,
                        weatherFirstDayIndex:  null,

                    });
                    if(this.state.date) {
                      this.chooseDate(this.state.date);
                    }
                    else {
                      this.chooseDate(moment());
                    }

            })
        });
    }

    choseBackgroundColor = () => {
        let hours = new Date().getHours();
        if (hours >= 6 && hours < 12) {
            return ([Colors.morning, Colors.disabledDay]);
        } else if (hours >= 12 && hours < 18) {
            return ([Colors.day, Colors.disabledDay]);
        } else if (hours >= 18 && hours <= 23) {
            return ([Colors.evening, Colors.disabledNight]);
        } else if (hours >= 0 && hours < 6) {
            return ([Colors.night, Colors.disabledNight]);
        }
    };




    createDateForecast = (forecast) => {
        let result = [];
        let temporary = [];
        const returnDateTimeMainInState = (item) => {
              let tmp = item.dt_txt.split(/[- :]/);
              tmp[1] = (tmp[1] - 1).toString();
              let date = new Date(...tmp);
              let temp = item.main;
              let weather = item.weather;
              let wind = item.wind;
              let resultObj = {
                  date: date,
                  time: date.getHours(),
                  main: temp,
                  weather: weather,
                  wind: wind

              }
              return resultObj;
        };
        if(forecast.list !== undefined)
        {
          forecast.list.forEach(function(item, index, array) {
            //console.log(item);
              let itemToAdd = returnDateTimeMainInState(item);
              temporary.push(itemToAdd);
              if (itemToAdd.date.getHours() === 21 || index + 1 === forecast.list.length) {
                    if((index + 1) < forecast.list.length) {
                      temporary.push(returnDateTimeMainInState(forecast.list[index + 1]));
                    }
                    result.push(temporary);
                    temporary = [];
              }
          });
        }
        return result;
    };

    resultHour = (item, unitsTemp) => {
        let timeAsString = item.time.toString();
        let timeView = (timeAsString.length === 1 ? ('0' + timeAsString) : timeAsString) + ':00';
        let tempFromPops = item.main.temp;
        if(unitsTemp === 'imperial')
        {
          tempFromPops = (tempFromPops - 32) * 5/9;
        }
        let temperature = Math.round(tempFromPops);
        let resultForHour = {x: timeView, y: temperature};
        return resultForHour;
    };

    chooseDate = (dateChoosen) => {
        let {forecast, unitsTemp} = this.state;
        this.setState({index: 0});
        date = dateChoosen.format('YYYY-MM-DD');
        let {dateGraphic} = this.state;
        let index = Math.abs((moment().startOf('day')).diff(date, 'days'));
        let forecasts = this.createDateForecast(forecast);
        if(forecasts.length !== 0){
          forecast = forecasts[index].map((item) => {return this.resultHour(item, unitsTemp.units)});
          forecast[0].x = '         ' + forecast[0].x;
          if (forecast.length < 4) {
            this.setState({weatherFirstDayIndex: forecast.length - 1});
              forecast = forecast.concat(forecasts[index + 1].map((item) => {return this.resultHour(item, unitsTemp.units)}).slice(1));
          }
          let newDateGraphic = Array.from(forecast);
          this.setState({
              dateGraphic: newDateGraphic,
              date: dateChoosen,
              allInfoWeatherDay: forecasts[index],
              unitsTemp
          }, () => {
            console.log(' START state.forecasts[index](after createDateForecast)');
            console.log(forecasts[index]);
            console.log(' END state.forecast');

          });
        }
    };

    render() {
      const {isLoading, dateGraphic, unitsTemp} = this.state;
        let datesWhitelist = [{
            start: moment(),
            end: moment().add(4, 'days')
        }];
        if (isLoading || !Object.keys(dateGraphic).length) {
            return (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color='#2B7C85'/>
                </View>
            )
        } else {
        return (
            <View style={styles.container}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                    />
                }>
                    <View style={{flex: 1}}>
                        <CalendarStrip calendarAnimation={{type: 'sequence', duration: 30}}
                                       daySelectionAnimation={{
                                           type: 'border',
                                           duration: 200,
                                           borderWidth: 1.5,
                                           borderHighlightColor: 'white'
                                       }}
                                       style={{height: 110, paddingTop: 10, paddingBottom: 10, marginBottom: 10}}
                                       calendarHeaderStyle={{color: 'white'}}
                                       calendarColor={this.choseBackgroundColor()[0]}
                                       dateNumberStyle={{color: 'white'}}
                                       dateNameStyle={{color: 'white'}}
                                       highlightDateNumberStyle={{color: 'yellow'}}
                                       highlightDateNameStyle={{color: 'yellow'}}
                                       disabledDateNameStyle={{color: this.choseBackgroundColor()[1]}}
                                       disabledDateNumberStyle={{color: this.choseBackgroundColor()[1]}}
                                       selectedDate={datesWhitelist.start}
                                       onDateSelected={(date) => this.chooseDate(date)}
                                       updateWeek = {false}
                                       datesWhitelist={datesWhitelist}/>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                style={{paddingTop: 10, paddingBottom: 10, margin: 0}}>
                        <BarChartExample data={dateGraphic} unitsTemp={unitsTemp} changeState = {this.changeState}/>
                    </ScrollView>
                    <Text>Hello {this.state.index}</Text>
                </ScrollView>
            </View>
        );
    }
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
    activityIndicator: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});
