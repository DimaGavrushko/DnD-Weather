import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

export default function GraphicScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text>Graphic</Text>
        </ScrollView>
    );
}

GraphicScreen.navigationOptions = {
    title: 'Graphic',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
