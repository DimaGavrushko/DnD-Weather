import React from 'react'
import {Text, Image, Dimensions, PixelRatio, View} from 'react-native';
import PureChart from 'react-native-pure-chart';

export class BarChartExample extends React.PureComponent {

  state = {
    update: false
  }
  constructor(props) {
      super(props);
      this.indexBarChart = this.indexBarChart.bind(this);
  }
  indexBarChart(num)
  {
    console.log("Work OF CENTER");
    this.props.changeState(num);
  }
  render() {

    const funcOfCustomValueRender = (index, point, unitsValue) => {
      let tempVal = point.y;
      let postfix = '';
      if (unitsValue === 'imperial') {
        tempVal = Math.round((tempVal * 9/5) + 32);
        postfix = 'F'
      }
      else if (unitsValue === 'metric') {
        postfix = 'C'
      }
      return (<Text style={{textAlign: 'center'}}>{tempVal}°</Text>);
    };

    let valueUnits = this.props.unitsTemp.units;
        return (
          <PureChart type={'line'}
          indexBarChart = {this.indexBarChart}
          style={{padding: 0}}
          data={this.props.data}
          width={'90%'}
          height={150}
          units = {valueUnits}
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
