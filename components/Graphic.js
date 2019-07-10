import React from 'react'
import {Text, Image, Dimensions, PixelRatio, View} from 'react-native';
import PureChart from 'react-native-pure-chart';

export class BarChartExample extends React.PureComponent {

  constructor(props) {
      super(props);

  }

  render() {
    funcOfCustomValueRender = (index, point, unitsValue) => {
      let tempVal = point.y;
      let postfix = '';
      if (unitsValue === 'imperial') {
        postfix = 'F'
      }
      else if (unitsValue === 'metric') {
        postfix = 'C'
      }
      return (
      <Text style={{textAlign: 'center'}}>{tempVal} °{postfix}</Text>
      )
    }
    let valueUnits = this.props.unitsTemp.units;
        return (
          <PureChart type={'line'}
          style={{padding: 0}}
          data={this.props.data}
          width={'90%'}
          height={200}
          xAxisColor={'white'}
          yAxisColor={'white'}
          xAxisGridLineColor={'white'}
          yAxisGridLineColor={'white'}
          labelColor={'black'}
          showEvenNumberXaxisLabel={false}
          customValueRenderer={(index, point) => {
            return funcOfCustomValueRender(index, point, valueUnits);
            }
          }
          />
        )
    }
}

  export default BarChartExample
