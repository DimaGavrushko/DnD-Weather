import React from 'react';
import {Text, View, Button} from 'react-native';
import settings from '../settings';

export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>Settings</Text>
                <Button title='Press' onPress={() => {
                    settings.location_id = '523750';
                }}/>
            </View>
        );
    }
}

SettingsScreen.navigationOptions = {
    title: 'Settings',
};
