import React from 'react';
import {Button, StyleSheet, Text, View, TextInput} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import cities from '../list.json';
import RadioForm from 'react-native-radio-form';
import Colors from "../constants/Colors";

var selectedCity;

var radio_props = [
    {label: 'Kelvin', value: 0},
    {label: 'Fahrenheit', value: 1},
    {label: 'Celsius', value: 2}
];

function choseBackgroundColor() {
    let hours = new Date().getHours();
    if (hours >= 6 && hours < 12) {
        return Colors.morning;
    } else if (hours >= 12 && hours < 18) {
        return Colors.day;
    } else if (hours >= 18 && hours <= 23) {
        return Colors.evening;
    } else if (hours >= 0 && hours < 6) {
        return Colors.night;
    }
}

export default class SettingsScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            city: {
                name: "Not selected"
            }
        }
    }

    //Здесь нужно забрать имя города текущего местоположения
    getCityName() {
        return this.state.city.name;
    }

    //Этим методом сетаю город из селекта
    setCity(city) {
        selectedCity = city;
        this.setState({
            city: city
        });
    }

    render() {
        return (
            <View>
                <View style={styles.container}>

                    <View style={styles.subcontainer}>
                        <Text style={styles.text}>
                            Location
                        </Text>

                        <Text style={styles.subtext}>
                            {this.getCityName()}
                        </Text>
                    </View>

                    <Text style={styles.label}>
                        Find by geolocation
                    </Text>

                    <Button
                        onPress={() => alert("JSON.stringify(value)")}
                        title="Get my location"
                        color={Colors.buttonColor}
                    />

                    <Text style={styles.label}>
                        Find by name
                    </Text>
                    <SearchableDropdown
                        containerStyle={{
                            padding: 1
                        }}
                        onItemSelect={item => this.setCity(item)}
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
                    <Text style={styles.text}>
                        API key
                    </Text>
                    <Text style={styles.label}>
                        Set API key
                    </Text>
                    <TextInput
                        style={{
                            height: 53,
                            backgroundColor: 'white',
                            borderColor: Colors.evening,
                            borderWidth: 1,
                            paddingLeft: 13,
                            borderRadius: 5,
                        }}
                        placeholder="Start typing"
                        placeholderTextColor={'grey'}
                        onChangeText={(text) => this.setState({text})}
                    />
                    <View style={{
                        padding: 5,
                        alignSelf: 'center',
                        width: 100
                    }}>
                        <Button
                            onPress={() => alert("JSON.stringify(value)")}
                            title="Submit"
                            color={Colors.buttonColor}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>
                        Temperture metric
                    </Text>
                    <RadioForm
                        dataSource={radio_props}
                        outerColor={'white'}
                        innerColor={Colors.buttonColor}
                        formHorizontal={false}
                        circleSize={30}
                        labelHorizontal={true}
                        onPress={(value) => alert(JSON.stringify(value))}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        margin: 5,
        borderBottomColor: Colors.tabIconDefault,
        borderBottomWidth: 2,
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
