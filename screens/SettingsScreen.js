import React from 'react';
import {Text, View} from 'react-native';

export default function SettingsScreen() {
    return (
        <View>
            <Text>Settings</Text>
        </View>
    );
}

SettingsScreen.navigationOptions = {
    title: 'Settings',
};
