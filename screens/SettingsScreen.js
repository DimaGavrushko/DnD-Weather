import React from 'react';
import {Text, View, Button} from 'react-native';

export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>Settings</Text>
                <Button title='Press' onPress={() => {
                    this.props.change_location('50.519871', '22.139681');
                }}/>
            </View>
        );
    }
}

SettingsScreen.navigationOptions = {
    title: 'Settings',
};
