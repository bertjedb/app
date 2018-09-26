import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, ImageBackground, TextInput, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
    Drawer,
    Avatar,
} from 'react-native-material-ui';
import stylesCss from '../assets/css/style.js';
import Api from '../config/api.js';
import LocalStorage from '../config/localStorage.js';



class More extends Component {

	constructor() {
      super();
      this.state = {
			succesfull: false,
			userId: null,
            didMount: false
      };

    }

    navigateToScreen = (route) => () => {
        const navigate = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigate);
    }
    componentDidUnmount() {
        this.setState({didMount: true})
    }
  render () {
		let api = Api.getInstance();
		let localStorage = LocalStorage.getInstance();
		localStorage.retrieveItem('userId').then((goals) => {
            if(this.state.didMount) {
                this.setState({
                    userId: goals,
                });
              }
            }).catch((error) => {
                //this callback is executed when your Promise is rejected
                console.log('Promise is rejected with error: ' + error);
                });
            }

      return (
				<View style={{flex: 1}}>
        <Drawer>
				{this.state.userId == null &&
          <Drawer.Section
              divider
              items={[
                  { icon: <Icon size={25} name={ 'login-variant' } style={{ color: 'grey' }} />,
					value: 'Inloggen',
					onPress: () => this.props.navigation.dispatch(NavigationActions.navigate({
        				  routeName: 'LoginStack',
        				  action: NavigationActions.navigate({ routeName: 'LoginScreen' })
        				})
        			)
				   },
                   { icon: <Icon size={25} name={ 'login-variant' } style={{ color: 'grey' }} />,
 					value: 'Registreren',
 					onPress: () => this.props.navigation.dispatch(NavigationActions.navigate({
         				  routeName: 'LoginStack',
         				  action: NavigationActions.navigate({ routeName: 'Registration' })
         				})
         			)
 				   },
                  {
                    icon: 'today',
                    value: 'Wachtwoord vergeten',
                    onPress: () => this.props.navigation.dispatch(NavigationActions.navigate({
						  routeName: 'LoginStack',
						  action: NavigationActions.navigate({ routeName: 'RecoverPassword' })
						})
					)
                   },

              ]}
          />
					}
                    {this.state.userId != null &&
          <Drawer.Section
              items={[
                  {
                    icon: 'today',
                    value: 'Wachtwoord veranderen',
                    onPress: () => this.props.navigation.dispatch(NavigationActions.navigate({
						  routeName: 'LoginStack',
						  action: NavigationActions.navigate({ routeName: 'ChangePassword' })
						})
					)
                   },
                  {
                    icon: 'power-settings-new',
                    value: 'Uitloggen',
                    onPress: () =>
    							api.callApi('logout', 'POST', {
    								id: this.state.userId,
    							}, response => {
    								console.log(response)
    	            if(response['value'] == true){
    								localStorage.storeItem('userId', null);

    							} else {
    								//alert("Please try again..")
    							}
    	        }),
                },
              ]}

          />
      }
        </Drawer>
				</View>
      );
    }
}

const styles = StyleSheet.create({

  drawerPadding: {
    paddingTop: 100,
  },

	card: {
		backgroundColor: '#FFFFFF',
		height: 220,
		margin: 10,
		borderRadius: 10,
		shadowOffset: {width: 0, height: 13},
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3,
	},

  SectionStyleTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
		borderTopLeftRadius: 5 ,
		borderTopRightRadius: 5 ,
	},

	SectionStyleBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderBottomLeftRadius: 5 ,
		borderBottomRightRadius: 5 ,
	},

	ImageStyle: {
	    margin: 5,
	    alignItems: 'center'
	},

});

export default More;
