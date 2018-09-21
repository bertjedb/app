import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Feed from '../screens/Feed';
import ScannerQR from '../screens/ScannerQR';
import Upload from '../screens/Upload';
import DrawerContent from '../screens/Sidebar';

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
}, {
  contentComponent: DrawerContent,
  drawerPosition: 'left',
});

export const Tabs = createMaterialBottomTabNavigator({
  {
    Feed: FeedStack,
    Upload: Upload,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
