import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { NavigationComponent } from 'react-native-material-bottom-navigation-performance'

import {Image} from 'react-native';

import Feed from '../screens/Feed';
import ScannerQR from '../screens/ScannerQR';
import Upload from '../screens/Upload';
import DrawerContent from '../screens/Sidebar';
import LoginScreen from '../screens/LoginScreen';
import PointCard from '../screens/PointCard';
import Registration from '../screens/Registration';
import ChangePassword from '../screens/ChangePassword';
import RecoverPassword from '../screens/RecoverPassword';
import MakeEvent from '../screens/MakeEvent';
import News from '../screens/News';
import More from '../screens/More';
import Api from './api.js';
import LocalStorage from './localStorage.js';

//StackNavigator for login related screens like login, register and password reset.
export const LoginStack = StackNavigator({
	LoginScreen: {
		screen: LoginScreen,
		navigationOptions: {
		}
	},Registration: {
		screen: Registration,
	},
  	ChangePassword: {
  	  screen: ChangePassword,
  	},
  	RecoverPassword: {
  	  screen: RecoverPassword,
  	},
  	MakeEvent: {
  		screen: MakeEvent,
  	}
},{
	headerMode: 'none'
})

//TabNavigator for the main layout of the app
export const MyTabLoggedIn = TabNavigator({
			News: {
		        screen: News,
		        navigationOptions: {
		          tabBarLabel: 'Evenementen',
							tabBarIcon: () => (
		          <Icon name="calendar" size={24} color='grey' />
		        )
		        }
		      },
			PointCard: {
		        screen: PointCard,
		        navigationOptions: {
		          tabBarLabel: 'Stempelkaart',
							tabBarIcon: () => (
		          <Icon name="cards-outline" size={24} color='grey' />
		        )
		        }
		      },
			More: {
						screen: MakeEvent,
						navigationOptions: {
							tabBarLabel: 'Meer',
							tabBarIcon: () => (
							<Icon name="format-list-bulleted" size={24} color='grey' />
						)
						}
					},
		}, {
		  		tabBarComponent: NavigationComponent,
		  		tabBarPosition: 'bottom',
		  		navigationOptions: ({ naviagtion }) => ({
		  			tabBarOnPress: (scene, jumpToIndex) => {
		  				if(scene.route.key == "PointCard") {
		  					let api = Api.getInstance();
		  					api.getPoints();
		  				}
		  				jumpToIndex(scene.index);
		  			}
		  		}),
				initialRouteName: 'More',
		  		tabBarOptions: {
		    	bottomNavigationOptions: {
					style: {
						backgroundColor: 'white',
						elevation: 8,
						position: 'absolute',
		      	left: 0,
		      	right: 0,
		      	bottom: 0,
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10
					},
		      	labelColor: 'grey',
				activeLabelColor: '#3bb222',
		      	rippleColor: '#3bb222',
				shifting: true,
		      	tabs: {
		        News: {
							activeIcon:	<Icon name="calendar" size={24} color='#3bb222' />
		        },
		        PointCard: {
							activeIcon:	<Icon name="cards-outline" size={24} color='#3bb222' />
		        },
						More: {
							activeIcon:	<Icon name="format-list-bulleted" size={24} color='#3bb222' />
		        },
		      }
		    }
		  }
		})

export const MyTabNotLoggedIn = TabNavigator({
			News: {
		        screen: News,
		        navigationOptions: {
		          tabBarLabel: 'Evenementen',
							tabBarIcon: () => (
		          <Icon name="calendar" size={24} color='grey' />
		        )
		        }
		      },
			More: {
						screen: More,
						navigationOptions: {
							tabBarLabel: 'Meer',
							tabBarIcon: () => (
							<Icon name="format-list-bulleted" size={24} color='grey' />
						)
						}
					},
		}, {
		  		tabBarComponent: NavigationComponent,
		  		tabBarPosition: 'bottom',
		  		navigationOptions: ({ naviagtion }) => ({
		  			tabBarOnPress: (scene, jumpToIndex) => {
		  				jumpToIndex(scene.index);
		  			}
		  		}),
				initialRouteName: 'News',
		  		tabBarOptions: {
		    	bottomNavigationOptions: {
					style: {
						backgroundColor: 'white', elevation: 8,
						position: 'absolute',
		      	left: 0,
		      	right: 0,
		      	bottom: 0,
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10
					},
		      	labelColor: 'grey',
				activeLabelColor: '#3bb222',
		      	rippleColor: '#3bb222',
				shifting: true,
		      	tabs: {
		        News: {
					activeIcon:	<Icon name="calendar" size={24} color='#3bb222' />
		        },
				More: {
					activeIcon:	<Icon name="format-list-bulleted" size={24} color='#3bb222' />
		        },
		      }
		    }
		  }
		})



//Root navigator with tabs and loginStack to navigate outside the tabs when going to login
export const MyAppNotLoggedIn = StackNavigator({
	MyTab: {
		screen: MyTabNotLoggedIn,
		navigationOptions: {
			title: 'Bslim',
			headerStyle: {
	      backgroundColor: '#93D500',
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
	      backgroundColor: '#93D500',
	    },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
	    },
		}
	},
},{

})

export const MyAppLoggedIn = StackNavigator({
	MyTab: {
		screen: MyTabLoggedIn,
		navigationOptions: {
			title: 'Bslim',
			headerStyle: {
	      backgroundColor: '#93D500',
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
	      backgroundColor: '#93D500',
	    },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
	    },
		}
	},
},{

})


