import React from 'react';
import { ScrollView, StyleSheet, Text, Image } from 'react-native';
import { View } from 'react-native'
//import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import { BarChartExample } from '../components/Graphic.js'
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import Colors from "../constants/Colors";

export default class GraphicScreen extends React.Component {

    state = {
        dateGraphic: []
    };

    constructor(props) {
        super(props);
        console.log(this.state.dataGraphic);
        this.state = {
            dateGraphic: [
                { x:   <Image
                  style={{width: 20, height: 20, paddingLeft: 10}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                  />, y: 273 + 18 },
                { x: '00:00', y: 273 + 18 },
                { x: '03:00', y: 273 + 14 },
                { x: '06:00', y: 273 + 15 },
                { x: '09:00', y: 273 + 15 },
                { x: '12:00', y: 273 + 17 },
                { x: '15:00', y: 273 + 18 },
                { x: '18:00', y: 273 + 16 },
                { x: '21:00', y: 273 + 14 }
            ]
        }
    }


    chooseDate = (date) => {
        date = date.format('YYYY-MM-DD');
        var datetest = moment().add(1, 'days').format('YYYY-MM-DD');
        //СДЕЛАТЬ switch пока для теста
        console.log(date, datetest);
        if (date === datetest) {
            this.setState({
                dateGraphic: [
                    { x:   <Image
                      style={{width: 20, height: 20, paddingLeft: 10}}
                        source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                      />, y: 273 + 18 },
                    { x: '00:00', y: 273 + 18 },
                    { x: '03:00', y: 273 + 14 },
                    { x: '06:00', y: 273 + 15 },
                    { x: '09:00', y: 273 + 15 },
                    { x: '12:00', y: 273 + 17 },
                    { x: '15:00', y: 273 + 18 },
                    { x: '18:00', y: 273 + 16 },
                    { x: '21:00', y: 273 + 14 }
                ]
            })
        } else {
            this.setState({
                dateGraphic: [
                    { x: '00:00', y: 18 },
                    { x: '03:00', y: 14 },
                    { x: '06:00', y: 5 },
                    { x: '09:00', y: 15 },
                    { x: '12:00', y: 17 },
                    { x: '15:00', y: 18 },
                    { x: '18:00', y: 16 },
                    { x: '21:00', y: 14 }
                ]
            });
        }
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
         calendarColor={Colors.day} dateNumberStyle={{color: 'white'}}
         dateNameStyle={{color: 'white'}}
         highlightDateNumberStyle={{color: 'yellow'}}
         highlightDateNameStyle={{color: 'yellow'}}
         disabledDateNameStyle={{color: 'red'}}
         disabledDateNumberStyle={{color: 'red'}}
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
