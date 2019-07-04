import React from 'react';
import {Text, View} from 'react-native';

export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>Settings</Text>
            </View>
        );
    }
}

SettingsScreen.navigationOptions = {
    title: 'Settings',
};
