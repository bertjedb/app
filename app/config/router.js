import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { NavigationComponent } from 'react-native-material-bottom-navigation-performance'

import Feed from '../screens/Feed';
import ScannerQR from '../screens/ScannerQR';
import Upload from '../screens/Upload';
import DrawerContent from '../screens/Sidebar';
import LoginScreen from '../screens/LoginScreen';
import PointCard from '../screens/PointCard';
import Registration from '../screens/Registration';

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
//   },
//    PointCard: {
//      screen: PointCard,
//    },
//    Registration: {
//      screen: Registration,
//    },
// }, {
//   contentComponent: DrawerContent,
//   drawerPosition: 'left',
// });
export const MyApp = TabNavigator({
	Feed: {
        screen: Feed,
        navigationOptions: {
          tabBarLabel: 'Feed',
					tabBarIcon: () => (
          <Icon name="newspaper" size={24} color='white' />
        )
        }
      },
	PointCard: {
        screen: PointCard,
        navigationOptions: {
          tabBarLabel: 'Stempelkaart',
					tabBarIcon: () => (
          <Icon name="cards-outline" size={24} color='white' />
        )
        }
      },
	LoginScreen: {
				screen: LoginScreen,
				navigationOptions: {
					tabBarLabel: 'Feed',
					tabBarIcon: () => (
					<Icon name="qrcode" size={24} color='white' />
				)
				}
			},
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      tabs: {
        Feed: {
          barBackgroundColor: '#37474F',
        },
        PointCard: {
          barBackgroundColor: '#00796B',
        },
				LoginScreen: {
          barBackgroundColor: '#3E2723',
        },
      }
    }
  }
})


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
