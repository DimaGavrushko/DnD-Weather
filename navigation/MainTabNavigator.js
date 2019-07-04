import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBar from "react-native-tab-bar-interaction";
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

// render() {
//  return (<TabBar>
//         <TabBar.Item
//          icon={require('./tab1.png')}
//          selectedIcon={require('./tab1_sel.png')}
//          title="Tab1"
//          screenBackgroundColor={{ backgroundColor: '#008080' }}
//      >
//         <View>
//
//         </View>
//         </TabBar.Item>
//         <TabBar.Item
//          icon={require('./tab2.png')}
//          selectedIcon={require('./tab2_sel.png')}
//          title="Tab2"
//          screenBackgroundColor={{ backgroundColor: '#F08080' }}
//      >
//         <View>
//
//         </View>
//         </TabBar.Item>
//         <TabBar.Item
//          icon={require('./tab3.png')}
//          selectedIcon={require('./tab3_sel.png')}
//          title="Tab3"
//          screenBackgroundColor={{ backgroundColor: '#485d72' }}
//      >
//          <View>
//
//          </View>
//          </TabBar.Item>
//          </TabBar>);
// }

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Weather',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-cloud-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Graphic',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
