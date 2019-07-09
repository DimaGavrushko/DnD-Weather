import React from 'react'
//import { AreaChart, BarChart, Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import {Text, Image, Dimensions, PixelRatio, View} from 'react-native';
// import { Circle, Path } from 'react-native-svg'
import PureChart from 'react-native-pure-chart';

export class BarChartExample extends React.PureComponent {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         date: { date: null },
  //     }
  // }
  render() {
        return (
          // <View style={{padding: 0, marginTop: 20}}>
          // <Text></Text>
          <PureChart type={'line'}
          style={{padding: 0}}
          data={this.props.data}
          width={'90%'}
          height={200}
          //numberOfYAxisGuideLine={10}
          xAxisColor={'white'}
          yAxisColor={'white'}
          xAxisGridLineColor={'white'}
          yAxisGridLineColor={'white'}
          labelColor={'black'}
          // minValue={273}
          showEvenNumberXaxisLabel={false}
          customValueRenderer={(index, point) => {
            //if (index % 1 === 0) return null
            return (
              // <Image
              // style={{width: 20, height: 20}}
              //   source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
              // />
              <Text style={{textAlign: 'center'}}>{point.y}</Text>
            )
          }}/>//</View>
        )
    }
}

  export default BarChartExample
