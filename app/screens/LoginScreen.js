import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Divider,
} from 'react-native';
import { DrawerActions } from 'react-navigation';
import UserInput from './UserInput';
import usernameImg from '../assets/Username.png';
import passwordImg from '../assets/Password.png';

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

class LoginScreen extends Component {

  constructor() {
      super();
  }

  render() {
    return(
      <ThemeContext.Provider value={getTheme(uiTheme)}>
         <Toolbar
           elevation={5}
           styles={styles.toolbar}
             leftElement="menu"
             onLeftElementPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
             centerElement={"Bslim"}
        />
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry
          placeholder="Password"
          autoCapitalize={'done'}
          returnKeyType={'none'}
          autoCorrect={false}
        />
        <TouchableOpacity
          style={ styles.loginButton }>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </ThemeContext.Provider>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 250,
    width: 300,
    resizeMode: 'contain',
  },
  loginButton: {
    margin: 30,
    backgroundColor: '#FF6700',
    padding: 15,
    borderRadius: 10,
    overflow: 'hidden'
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
})


export default LoginScreen;
