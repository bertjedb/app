import React, { Component } from 'react';
import { MyApp } from './config/router';
import Icon from 'react-native-vector-icons/MaterialIcons'

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
  render() {
    return (
		<ThemeContext.Provider value={getTheme(uiTheme)}>
			 <Toolbar
				 elevation={5}
					 centerElement={"Bslim"}
			/>
			<MyApp/>
			</ThemeContext.Provider>);
  }
}

export default App;
