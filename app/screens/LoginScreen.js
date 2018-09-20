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
} from 'react-native';
import { DrawerActions } from 'react-navigation';
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
      <View style={styles.container}>
          <Image
          source={require('../assets/logo.png')}
          style={styles.logo}>
          </Image>
          <TextInput
            label="E-mail address"
            placeholder="Email"
            style={ styles.logInEmail }>
          </TextInput>


          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.inputStyle}
              autoCorrect={false}
              secureTextEntry
              placeholder="Password"
            />
            <Image
              source={require('../assets/Username.png')}
              style={styles.ImageStyle}
            />
          </View>

          <TouchableOpacity
            style={ styles.loginButton }>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
      </View>
      </ThemeContext.Provider>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3bb222',
    height: null,
    width: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 250,
    width: 300,
    resizeMode: 'contain',
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
  },
  logInEmail: {
    width: 300,
    margin: 30,
    padding: 15,
    fontSize: 25,
    borderWidth: 1,
    borderColor: '#efefef',
    backgroundColor: '#fff',
    letterSpacing: -1
  },
  logInPw: {
    width: 300,
    padding: 15,
    fontSize: 25,
    borderWidth: 1,
    borderColor: '#efefef',
    backgroundColor: '#fff',
    letterSpacing: -1
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
