import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator, Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { NavigationComponent } from 'react-native-material-bottom-navigation-performance'

import {Image, Button, View, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Feed from '../screens/Feed';
import ScannerQR from '../screens/ScannerQR';
import Upload from '../screens/Upload';
import DrawerContent from '../screens/Sidebar';
import LoginScreen from '../screens/LoginScreen';
import PointCard from '../screens/PointCard';
import Registration from '../screens/Registration';
import ChangePassword from '../screens/ChangePassword';
import RecoverPassword from '../screens/RecoverPassword';
import EventDetail from '../screens/EventDetail';
import News from '../screens/News';
import More from '../screens/More';
import Api from './api.js';
import LocalStorage from './localStorage.js';
import ParticipantList from '../screens/ParticipantList'
import MakeEvent from '../screens/MakeEvent';
import CreateAdmin from '../screens/CreateAdmin';
import Events from '../screens/Events';

//Gradient header
export const GradientHeader = props => (
<View style={{ backgroundColor: '#eee', paddingBottom: Header.HEIGHT  }} >
    <LinearGradient
      colors={['#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201',  ]}
      style={[StyleSheet.absoluteFill, { height: Header.HEIGHT }]}
    >
      <Header {...props} />
    </LinearGradient>
  </View>
)
//StackNavigator for login related screens like login, register and password reset.
export const LoginStack = StackNavigator({
	LoginScreen: {
		screen: LoginScreen,
		navigationOptions: {
			title: 'Login',
		}
	},Registration: {
		screen: Registration,
		navigationOptions: {
			title: 'Registreren',
		}
	},
  ChangePassword: {
    screen: ChangePassword,
	navigationOptions: {
		title: 'Wachtwoord veranderen',
	}
  },
  RecoverPassword: {
    screen: RecoverPassword,
	navigationOptions: {
		title: 'Wachtwoord vergeten',
	}
  }
},{headerMode: 'none'
})

//Stack for all the admin screens
export const AdminStack = StackNavigator({
    MakeEvent: {
        screen: MakeEvent,
        navigationOptions: {
            title: 'Nieuw evenement',
        }
    },
    CreateAdmin: {
        screen: CreateAdmin,
        navigationOptions: {
            title: 'Nieuw begeleider account',
        }
    }
},{headerMode: 'none'
})

//Stack for all the admin screens
export const NewsStack = StackNavigator({
    NewsFeed: {
        screen: News,
        navigationOptions: {
            title: 'Nieuws',
        }
    }
},{headerMode: 'none'
})

//Stack for all the event screens
export const EventStack = StackNavigator({
    Events: {
        screen: Events,
        navigationOptions: {
            title: 'Evenementen',
        }
    },
    EventDetail: {
        screen: EventDetail,
        navigationOptions: {
            title: 'Evenementen',
        }
    }
},{headerMode: 'none'
})


//Stack for participants
export const ParticipantListStack = StackNavigator({
	ParticipantList: {
		screen: ParticipantList,
		navigationOptions: {
			title: 'Evenementen',
		}
	},
},{headerMode: 'none'
})

//TabNavigator for the app when logged in
export const MyTabLoggedIn = TabNavigator({
			EventStack: {
		        screen: EventStack,
		        navigationOptions: {
		          tabBarLabel: 'Evenementen',
							tabBarIcon: () => (
		          <Icon name="calendar" size={24} color='grey' />
		        )
		        }
		      },
		     NewsCard: {
				screen: NewsStack,
				navigationOptions: {
					tabBarLabel: 'Nieuws',
					tabBarIcon: () => (
						<Icon name="newspaper" size={24} color='grey' />
					)
				}
			},
			PointCard: {
		        screen: PointCard,
		        navigationOptions: {
		          tabBarLabel: 'Stempelkaart',
							tabBarIcon: () => (
		          <Icon name="grid" size={24} color='grey' />
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
		  				if(scene.route.key == "PointCard") {
		  					let api = Api.getInstance();
		  					api.getPoints();
		  				}
		  				jumpToIndex(scene.index);
		  			}
		  		}),
				initialRouteName: 'EventStack',
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
		      	tabs: {
		        EventStack: {
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

//TabNavigator for the app when not logged in
export const MyTabNotLoggedIn = TabNavigator({
			EventStack: {
		        screen: EventStack,
		        navigationOptions: {
		          tabBarLabel: 'Evenementen',
				  tabBarIcon: () => (
		          <Icon name="calendar" size={24} color='grey' />
		        )
		        }
		      },

			NewsCard: {
				screen: NewsStack,
				navigationOptions: {
					tabBarLabel: 'Nieuws',
					tabBarIcon: () => (
						<Icon name="newspaper" size={24} color='grey' />
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
				initialRouteName: 'EventStack',
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
		      	tabs: {
		        EventStack: {
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
            header: null,
        }

    },

	LoginStack: {
		screen: LoginStack,
		navigationOptions: {
            header: null,
		}
	},
},{

})


export const MyAppLoggedIn = StackNavigator({
	MyTab: {
		screen: MyTabLoggedIn,
		navigationOptions: {
			header: null,
		}

	},
	LoginStack: {
		screen: LoginStack,
		navigationOptions: {
			header: null,
		}
	},
	AdminStack: {
		screen: AdminStack,
		navigationOptions: {
			header: null,
		}
	},
	ParticipantListStack: {
		screen: ParticipantListStack,
		navigationOptions: {
			header: null,
		}
	}
},{
})
