import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Feed from '../screens/Feed';
import ScannerQR from '../screens/ScannerQR';
import Upload from '../screens/Upload';
import DrawerContent from '../screens/Sidebar';
import PointCard from '../screens/PointCard';
import Registration from '../screens/Registration';

export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Feed',
      header: null ,
    },
  },
  Upload: {
    screen: Upload,
    navigationOptions: {
      title: 'Uploaden',
      header: null ,
    },
  },
  ScannerQR: {
    screen: ScannerQR,
    navigationOptions: {
      title: 'Scan',
      header: null ,
    },
  },
});

export const Drawer = DrawerNavigator({
  Feed: {
    screen: FeedStack,
  },
  Upload: {
    screen: Upload,
  },
  ScannerQR: {
    screen: ScannerQR,
  },
  PointCard: {
    screen: PointCard,
  },
  Registration: {
    screen: Registration,
  },
}, {
  contentComponent: DrawerContent,
  drawerPosition: 'left',
});

/*
export const Tabs = createMaterialBottomTabNavigator({
  Feed: {
    screen: FeedStack
  },
  Feed: {
    screen: FeedStack
  },
}, {
  initialRouteName: 'Feed',
  activeTintColor: '#f0edf6',
  inactiveTintColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});
*/
