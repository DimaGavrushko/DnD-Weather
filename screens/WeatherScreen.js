import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import WeatherCard from "../components/WeatherCard";
import ForecastTable from "../components/ForecastTable";
import {getCurrentCoordinates, getCurrentForecast, getCurrentWeather} from "../utils";

export default class WeatherScreen extends React.Component {

    state = {
        isLoading: true,
        isRefreshing: false,
        currWeather: {},
        forecast: {}
    };

    constructor(props) {
        super(props);
        getCurrentCoordinates().then(res => props.changeLocation(...res));
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({isLoading: true});
            getCurrentWeather(this.props).then(currWeather => {
                getCurrentForecast(this.props).then(forecast => {
                    this.setState({
                        isLoading: false,
                        currWeather,
                        forecast
                    });
                    this.props.changeCity(currWeather.name);
                });
            });
        }
    }

    onRefresh = () => {
        this.setState({isRefreshing: true});
        getCurrentWeather(this.props).then(currWeather => {
            getCurrentForecast(this.props).then(forecast => {
                this.setState({
                    isRefreshing: false,
                    currWeather,
                    forecast
                });
            });
        });
    };

    render() {
        const {isLoading, currWeather, forecast} = this.state;
        if (isLoading || !Object.keys(currWeather).length) {
            return (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size='large' color='#2B7C85'/>
                </View>
            )
        } else {
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    style={styles.container}>
                    <WeatherCard currWeather={currWeather} units={this.props.units}/>
                    <ForecastTable forecast={forecast}/>
                </ScrollView>
            );
        }
    }
}


WeatherScreen.navigationOptions = {
    title: 'Weather',
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    activityIndicator: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});
