import React, { Component } from 'react';
import {Linking } from 'react-native'
import { MyApp } from './config/router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
} from 'react-native-material-ui';

const uiTheme = {
    palette: {
        primaryColor: '#3bb222',
    },
    toolbar: {
        container: {
            height: 60,
        },
    },
};

class App extends Component {
	constructor(){
		super()
		console.disableYellowBox = true;
	}
  render() {
    return (
		<ThemeContext.Provider value={getTheme(uiTheme)}>
			 <Toolbar
				 elevation={5}
					 centerElement={"Bslim"}
					 rightElement={<Icon onPress={ ()=>{ Linking.openURL('https://www.facebook.com/Bslim050/')}} style={{paddingRight: 10}} name="facebook-box" size={24} color='white' />}
			/>
			<MyApp/>
			</ThemeContext.Provider>);
  }
}

export default App;
