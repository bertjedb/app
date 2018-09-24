import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, ImageBackground, TextInput } from 'react-native';
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


class More extends Component {

  navigateToScreen = (route) => () => {
      const navigate = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigate);
    }

  render () {
      return (
				<View style={{flex: 1}}>
				<ImageBackground blurRadius={10} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: 240}}>
					<View style={styles.card} elevation={5}>
					<Text style={{margin: 15, fontWeight: 'bold', fontSize: 16, color: '#3bb222'}}>
					Inloggen
					</Text>
					<View style={{backgroundColor: '#3bb222', height: 170, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
						<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 20}}>
			        <View style={styles.SectionStyleTop}>
				        <Icon name="at" size={24} color='grey' style={styles.ImageStyle}/>
			          <TextInput
			              style={{flex:1}}
			              placeholder="Email"
			              underlineColorAndroid="transparent"
			          />
			        </View>
		      	</View>
						<View style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
			        <View style={styles.SectionStyleBottom}>
				        <Icon name="lock" size={24} color='grey' style={styles.ImageStyle}/>
			          <TextInput
			              style={{flex:1}}
										secureTextEntry={true}
			              placeholder="Password"
			              underlineColorAndroid="transparent"
			          />
			        </View>
		      	</View>
						<Button
										style={{
											container: {
												margin: 10,
									        borderRadius: 10,
									        backgroundColor: '#FF6700'
									    },
											text: {
												color: 'white'
											}
										}}
										raised text="Doorgaan"
										onPress={() => alert("Login succesfull")} />
					</View>
					</View>
				</ImageBackground>

        <Drawer>
          <Drawer.Section
              divider
              items={[
                  { icon: <Icon size={25} name={ 'login-variant' } style={{ color: 'grey' }} />,
										value: 'Login',
										onPress: () => this.props.navigation.dispatch(NavigationActions.navigate({
																																	  routeName: 'LoginStack',
																																	  action: NavigationActions.navigate({ routeName: 'LoginScreen' })
																																	})
																																)
																															},
                  { icon: 'today', value: 'Lorem ipsum'},
                  { icon: 'assignment', value: 'Lorem ipsum' },
              ]}
          />
          <Drawer.Section
              title="Lorem ipsum"
              items={[
                  {
                    icon: 'info',
                    value: 'Lorem ipsum',
                  },
                  {
                    icon: 'power-settings-new',
                    value: 'Lorem ipsum',
                    onPress: () => this.props.navigation.navigate('Registration'),
                  },
              ]}
          />
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
