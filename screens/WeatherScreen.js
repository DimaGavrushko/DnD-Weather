import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class WeatherScreen extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <Text>Weather</Text>
                </ScrollView>
            </View>
        );
    }
}

WeatherScreen.navigationOptions = {
    title: 'Weather2',
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    }
});
