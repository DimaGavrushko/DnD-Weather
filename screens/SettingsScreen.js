import React from 'react';
import {Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import cities from '../current.city.list.min';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Colors from "../constants/Colors";
import {choseBackgroundColor, getCurrentCoordinates} from "../utils";
import {MonoText} from "../components/StyledText";

let radio_props = [
    {label: 'Kelvin', value: ''},
    {label: 'Fahrenheit', value: 'imperial'},
    {label: 'Celsius', value: 'metric'}
];

export default class SettingsScreen extends React.Component {

    state = {
        isValid: true,
        api_key: this.props.api_key
    };

    checkApiKey(key) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.props.lat}&lon=${this.props.lon}&appid=${key}`)
            .then(currWeather => {
                if (currWeather.status !== 200) {
                    this.setState({
                        isValid: false,
                        api_key: this.props.api_key
                    })
                } else {
                    this.props.changeApiKey(key);
                    this.setState({isValid: true, api_key: this.props.api_key});
                }
            });
    }

    render() {
        return (
            <View>
            <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>

                    <View style={styles.subcontainer}>
                        <MonoText style={styles.text}>
                            Location
                        </MonoText>
                        <MonoText style={styles.subtext}>
                            {this.props.city}
                        </MonoText>
                    </View>

                    <MonoText style={styles.label}>
                        Find by geolocation
                    </MonoText>
                    <Button
                        onPress={() => getCurrentCoordinates().then(res => this.props.changeLocation(...res))}
                        title="Get my location"
                        color={Colors.buttonColor}
                    />

                    <MonoText style={styles.label}>
                        Find by name
                    </MonoText>
                    <SearchableDropdown
                        containerStyle={{
                            padding: 1
                        }}
                        onItemSelect={item => {
                            this.props.changeLocation(item.coord.lat, item.coord.lon)
                        }}
                        textInputStyle={{
                            padding: 12,
                            borderWidth: 1,
                            backgroundColor: 'white',
                            borderColor: Colors.evening,
                            borderRadius: 5,
                        }}
                        itemStyle={{
                            padding: 11,
                            marginTop: 2,
                            backgroundColor: 'white',
                            borderColor: Colors.evening,
                            borderWidth: 2,
                            borderRadius: 5,
                        }}
                        itemTextStyle={{color: 'black'}}
                        itemsContainerStyle={{
                            maxHeight: 140
                        }}
                        items={cities}
                        defaultIndex={0}
                        placeholder="Start typing"
                        placeholderTextColor={'grey'}
                        resetValue={true}
                        underlineColorAndroid="transparent"
                    />
                </View>

                <View style={styles.container}>
                    <MonoText style={styles.text}>
                        API key
                    </MonoText>
                    <MonoText style={styles.label}>
                        Set API key
                    </MonoText>

                    <TextInput
                        style={{
                            height: 53,
                            backgroundColor: 'white',
                            borderColor: this.state.isValid ? Colors.evening : 'red',
                            borderWidth: this.state.isValid ? 1 : 3,
                            paddingLeft: 13,
                            borderRadius: 5,
                        }}
                        placeholder="Start typing"
                        placeholderTextColor={'grey'}
                        onChangeText={api_key => this.setState({api_key})}
                        onBlur={() => this.setState({isValid: true})}
                        value={this.state.api_key}
                    />
                    <View style={{
                        padding: 5,
                        alignSelf: 'center',
                        width: 100
                    }}>
                        <Button
                            onPress={() => this.checkApiKey(this.state.api_key)}
                            title="Submit"
                            color={Colors.buttonColor}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <MonoText style={styles.text}>
                        Temperature metric
                    </MonoText>
                    <RadioForm
                        formHorizontal={false}
                        animation={true}
                        labelColor={'white'}
                    >
                        {radio_props.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i}>
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={this.props.units === radio_props[i].value}
                                    onPress={unit => this.props.changeUnit(unit)}
                                    borderWidth={2}
                                    buttonOuterColor={'white'}
                                    buttonInnerColor={Colors.buttonColor}
                                    buttonWrapStyle={{marginLeft: 10}}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    labelHorizontal={true}
                                    onPress={radio => this.props.changeUnit(radio.value)}
                                    labelStyle={{color: 'white', fontFamily: 'roboto-regular'}}
                                />
                            </RadioButton>
                        ))}
                    </RadioForm>
                </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        margin: 5,
        backgroundColor: choseBackgroundColor()
    },
    subcontainer: {
        flexDirection: 'row',
    },
    text: {
        fontWeight: 'bold',
        marginRight: 'auto',
        color: 'white',
        fontSize: 20,
        padding: 5
    },
    subtext: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 10,
        paddingTop: 8
    },
    label: {
        color: 'white',
        fontSize: 16,
        paddingLeft: 10,
        paddingVertical: 5
    }
});

SettingsScreen.navigationOptions = {
    title: 'Settings',
};
