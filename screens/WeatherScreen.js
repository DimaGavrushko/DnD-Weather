import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text
} from 'react-native';

export default function WeatherScreen() {
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

WeatherScreen.navigationOptions = {
    title: 'Weather',
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
