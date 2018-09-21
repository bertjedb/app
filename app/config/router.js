import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Feed from '../screens/Feed';
import ScannerQR from '../screens/ScannerQR';
import Upload from '../screens/Upload';
import DrawerContent from '../screens/Sidebar';
import LoginScreen from '../screens/LoginScreen';


// export const Drawer = DrawerNavigator({
//   Feed: {
//     screen: FeedStack,
//   },
//   Upload: {
//     screen: Upload,
//   },
//   ScannerQR: {
//     screen: ScannerQR,
//   },
//   LoginScreen: {
//     screen: LoginScreen,
//   }
// }, {
//   contentComponent: DrawerContent,
//   drawerPosition: 'left',
// });


export const Tabs = TabNavigator({
  Feed: {
        screen: Feed,
        navigationOptions: {
          tabBarLabel: 'Feed',
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon size={25} name={ 'md-contact' } style={{ color: tintColor }} />
          )
        }
      },
  Upload: {
        screen: Upload,
        navigationOptions: {
          tabBarLabel: 'Upload',
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon size={25} name={ 'md-contact' } style={{ color: tintColor }} />
          )
        }
      },
      ScannerQR: {
            screen: ScannerQR,
            navigationOptions: {
              tabBarLabel: 'ScannerQR',
              tabBarIcon: ({ tintColor, focused }) => (
                <Icon size={25} name={ 'md-contact' } style={{ color: tintColor }} />
              )
            }
          },
}, {
    tabBarPosition: 'bottom',
    initialRouteName: 'Feed',
    activeTintColor: 'orange',
    inactiveTintColor: 'white',
});
