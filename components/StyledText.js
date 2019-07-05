import React from 'react';
import {Platform, Text} from 'react-native';

export function MonoText(props) {
    return (
        <Text {...props} style={[props.style, {fontFamily: Platform.OS === 'San-Francisco' ? '' : 'Roboto'}]}/>
    );
}
