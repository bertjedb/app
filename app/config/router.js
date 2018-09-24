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
import News from '../screens/News';
import More from '../screens/More';

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

//StackNavigator for login related screens like login, register and password reset.
export const LoginStack = StackNavigator({
	LoginScreen: {
		screen: LoginScreen,
		navigationOptions: {
		}
	},Registration: {
		screen: Registration,
	},
},{
	headerMode: 'none'
})

//TabNavigator for the main layout of the app
export const MyTab = TabNavigator({
	News: {
        screen: News,
        navigationOptions: {
          tabBarLabel: 'Evenementen',
					tabBarIcon: () => (
          <Icon name="calendar" size={24} color='white' />
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
	More: {
				screen: More,
				navigationOptions: {
					tabBarLabel: 'Meer',
					tabBarIcon: () => (
					<Icon name="format-list-bulleted" size={24} color='white' />
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
        News: {
          barBackgroundColor: '#37474F',
        },
        PointCard: {
          barBackgroundColor: '#00796B',
        },
				More: {
          barBackgroundColor: '#3E2723',
        },
      }
    }
  }
})


//Root navigator with tabs and loginStack to navigate outside the tabs when going to login
export const MyApp = StackNavigator({
	MyTab: {
		screen: MyTab,
		navigationOptions: {
			title: 'Bslim',
			headerStyle: {
	      backgroundColor: '#3bb222',
	    },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
	    },
		}

	},
	LoginStack: {
		screen: LoginStack,
		navigationOptions: {
			title: 'Account',
			headerStyle: {
	      backgroundColor: '#3bb222',
	    },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
	    },
		}
	},
},{

})
