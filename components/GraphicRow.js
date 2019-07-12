import React from 'react';
import {MonoText} from "./StyledText";
import {View, Image, StyleSheet} from "react-native";
import Colors from "../constants/Colors";


export default class GraphicRow extends React.Component {

    render() {
        let label = this.props.text.toString();
        let info = this.props.info;

        return (
            <View style={styles.forecastRow}>
                <MonoText style={styles.forecastDate} >{label}</MonoText>
                <View style={{
                    marginLeft: 'auto',
                    flexDirection: 'column'
                }}>
                <Image
                    style={styles.forecastIcon}
                    source={{uri: `http://openweathermap.org/img/wn/${day.iconNight}@2x.png`}}
                />

                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    forecastRow: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20,
        borderBottomWidth: 5,
        borderBottomColor: Colors.tabIconDefault
    },
    forecastDate: {
        fontSize: 18,
        marginTop: -20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignSelf: "center"
    },
    forecastIcon: {
        width: 45,
        height: 45,
        marginTop: -10
    }
});
