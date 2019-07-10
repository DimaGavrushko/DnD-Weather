import React from 'react'
import {Text, Image, Dimensions, PixelRatio, View} from 'react-native';
import PureChart from 'react-native-pure-chart';

export class BarChartExample extends React.PureComponent {

  constructor(props) {
      super(props);

  }

  render() {
    funcOfCustomValueRender = (index, point, unitsValue) => {
      var tempVal = point.y;
      var postfix = '';
      if (unitsValue === 'imperial') {
        //tempVal = Math.round((point.y * 9/5) + 32);
        postfix = 'F'
      }
      else {
        postfix = 'C'
      }
      return (
      // <Image
      // style={{width: 20, height: 20}}
      //   source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
      // />
      <Text style={{textAlign: 'center'}}>{tempVal}°{postfix}</Text>
      )
    }

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
            return funcOfCustomValueRender(index, point, this.props.unitsTemp);
          }
        }


        //  let tempViewAfterFunction = this.

            //if (index % 1 === 0) return null
            // return (
            //   // <Image
            //   // style={{width: 20, height: 20}}
            //   //   source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
            //   // />
            //   <Text style={{textAlign: 'center'}}>{resaultViewTemp({point.y}).toString()}</Text>
            // )
          //}
          />//</View>
        )
    }
}

  export default BarChartExample
