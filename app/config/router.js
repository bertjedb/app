import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator, Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { NavigationComponent } from 'react-native-material-bottom-navigation-performance'

import {Image, Button, View, StyleSheet, Dimensions, TextInput} from 'react-native';
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
import News from '../screens/News';
import More from '../screens/More';
import Api from './api.js';
import LocalStorage from './localStorage.js';
import ParticipantList from '../screens/ParticipantList'
import MakeEvent from '../screens/MakeEvent';
import CreateAdmin from '../screens/CreateAdmin';
import EventDetail from '../screens/EventDetail';

//Gradient header
export const GradientHeader = props => (
<View style={{ backgroundColor: '#eee', paddingBottom: Header.HEIGHT  }} >
    <LinearGradient
      colors={['#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201',  ]}
      style={[StyleSheet.absoluteFill, { height: Header.HEIGHT, flex: 1, flexDirection: 'column' }]}
    >
      <Header {...props} />
    </LinearGradient>
  </View>
)
export const GradientEventsHeader = props => (
	<View style={{ backgroundColor: '#eee', height: Header.HEIGHT}} >
	    <LinearGradient
	      colors={['#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201',  ]}
	      style={[StyleSheet.absoluteFill, { height: Header.HEIGHT, flex: 1, flexDirection: 'column' }]}
	    >
	      <Header {...props} />
	    </LinearGradient>
	    <Icon onPress={() => {showInput = !showInput; alert(showInput)}} name="magnify" style={{alignSelf: 'flex-end', margin: 10}} size={40} color='white' />
	</View>
)
//StackNavigator for login related screens like login, register and password reset.
export const LoginStack = StackNavigator({
	LoginScreen: {
		screen: LoginScreen,
		navigationOptions: {
			title: 'Login',
			header: props => <GradientHeader {...props} />,
			headerStyle: {
			    backgroundColor: 'transparent',
			    position: 'absolute',
			    top: 0,
			    left: 0,
			    right: 0,
			    bottom: 0,
			  },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
	    },
		}
	},Registration: {
		screen: Registration,
		navigationOptions: {
			title: 'Registreren',
			headerStyle: {
				backgroundColor: '#93D500',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		}
	},
  ChangePassword: {
    screen: ChangePassword,
		navigationOptions: {
			title: 'Wachtwoord veranderen',
			headerStyle: {
				backgroundColor: '#93D500',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		}
  },
  RecoverPassword: {
    screen: RecoverPassword,
		navigationOptions: {
			title: 'Wachtwoord vergeten',
			headerStyle: {
				backgroundColor: '#93D500',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		}
  }
},{headerMode: 'screen'
})

export const ParticipantListStack = StackNavigator({
	ParticipantList: {
		screen: ParticipantList,
		navigationOptions: {
			title: 'Login',
			header: props => <GradientHeader {...props} />,
			headerStyle: {
			    backgroundColor: 'transparent',
			    position: 'absolute',
			    top: 0,
			    left: 0,
			    right: 0,
			    bottom: 0,
			  },
		    headerTintColor: '#fff',
		    headerTitleStyle: {
		      fontWeight: 'bold',
		    },
		}
	}
},{
		headerMode: 'screen'
})

export const AdminStack = StackNavigator({
	MakeEvent: {
		screen: MakeEvent,
		navigationOptions: {
			title: 'Nieuw evenement aanmaken',
			headerStyle: {
				backgroundColor: '#93D500',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		}
	},
	CreateAdmin: {
		screen: CreateAdmin,
		navigationOptions: {
			title: 'Nieuw begeleider account aanmaken',
			headerStyle: {
				backgroundColor: '#93D500',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		}
	}
},{headerMode: 'screen'
})



export const EventStack = StackNavigator({
	News: {
		screen: News,
		navigationOptions: {
			title: 'Evenementen',
			header: props => <GradientEventsHeader {...props} />,
			headerStyle: {
			    backgroundColor: 'transparent',
			    position: 'absolute',
			    top: 0,
			    left: 0,
			    right: 0,
			    bottom: 0,
			    width: Dimensions.get('window').width - 60
			  },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
	    },
		}
	},
    EventDetail: {
		screen: EventDetail,
		navigationOptions: {
			title: 'Evenement',
			header: props => <GradientHeader {...props} />,
			headerStyle: {
			    backgroundColor: 'transparent',
			    position: 'absolute',
			    top: 0,
			    left: 0,
			    right: 0,
			    bottom: 0,
			  },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
	    },
		}
	},
},{headerMode: 'screen'
})

export const PointCardStack = StackNavigator({
	PointCard: {
		screen: PointCard,
		navigationOptions: {
			title: 'Stempelkaart',
			header: props => <GradientHeader {...props} />,
			headerStyle: {
			    backgroundColor: 'transparent',
			    position: 'absolute',
			    top: 0,
			    left: 0,
			    right: 0,
			    bottom: 0,
			  },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
	    },
		}
	},
},{headerMode: 'screen'
})



export const MoreStack = StackNavigator({
	More: {
		screen: More,
		navigationOptions: {
			title: 'Meer',
			header: props => <GradientHeader {...props} />,
			headerStyle: {
			    backgroundColor: 'transparent',
			    position: 'absolute',
			    top: 0,
			    left: 0,
			    right: 0,
			    bottom: 0,
			  },
	    headerTintColor: '#fff',
	    headerTitleStyle: {
	      fontWeight: 'bold',
	    },
		}
	},
},{headerMode: 'screen'
})

//TabNavigator for the main layout of the app
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
			PointCardStack: {
		        screen: PointCardStack,
		        navigationOptions: {
		          tabBarLabel: 'Stempelkaart',
							tabBarIcon: () => (
		          <Icon name="cards-outline" size={24} color='grey' />
		        )
		        }
		      },
			MoreStack: {
				screen: MoreStack,
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

export const MyTabNotLoggedIn = TabNavigator({
			LoginStack: {
		        screen: LoginStack,
		        navigationOptions: {
		          tabBarLabel: 'Login',
				  tabBarIcon: () => (
		          <Icon name="login" size={24} color='grey' />
		        )
		        }
		      },
			EventStack: {
		        screen: EventStack,
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
	ParticipantListStack: {
		screen: ParticipantListStack,
		navigationOptions: {
			header: null,
		}
	},
	AdminStack: {
		screen: AdminStack,
		navigationOptions: {
			header: null,
		}
	}
},{
})
