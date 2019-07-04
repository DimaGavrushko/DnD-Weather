import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WeatherScreen from '../screens/WeatherScreen';
import GraphicScreen from '../screens/GraphicScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { TabBar } from 'react-native-animated-nav-tab-bar';
const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const WeatherStack = createStackNavigator(
    {
        Home: WeatherScreen,
    },
    config
);

WeatherStack.navigationOptions = {
    tabBarLabel: 'Weather',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-cloud-circle`
                    : 'md-cloud-circle'
            }
        />
    ),
};

WeatherStack.path = '';

const GraphicStack = createStackNavigator(
    {
        Links: GraphicScreen,
    },
    config
);

GraphicStack.navigationOptions = {
    tabBarLabel: 'Graphic',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}/>
    ),
};

GraphicStack.path = '';

const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen,
    },
    config
);

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
    ),
};

SettingsStack.path = '';
const tabNavigator =createBottomTabNavigator(
    {
      Weather: WeatherStack,
      Graphic: GraphicStack,
      Settings:SettingsStack,
    }, {
        tabBarOptions: {
            activeTintColor: "#2B7C85",
            inactiveTintColor: "#222222",
        },

        tabBarComponent: props => <TabBar
            {...props}
        />,
    }
)

tabNavigator.path = '';
export default tabNavigator;
