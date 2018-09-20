import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import { DrawerActions } from 'react-navigation';
import styles from '../assets/css/style.js';
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
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 60,
        },
    },
};

class Registration extends Component {

  constructor() {
      super();
      this.state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      };
    
  }

  registrate() {
    alert("registrating")
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
                 rightElement="crop-free"
                 onRightElementPress={() => this.props.navigation.navigate('ScannerQR')}
            />
            <View>
                <TextInput  label="E-mail address"
                            placeholder="iemand@voorbeeld.com"
                            value={ this.state.email }
                            onChangeText={ email => this.setState({email}) }>
                </TextInput>
                <TextInput  label="First name"
                            placeholder="Je voornaam"
                            value={ this.state.firstName }
                            onChangeText={ email => this.setState({firstName}) }>
                </TextInput>
                <TextInput  label="Last name"
                            placeholder="Je achternaam"
                            value={ this.state.lastName }
                            onChangeText={ email => this.setState({lastName}) }>
                </TextInput>
                <TextInput  label="Password"
                            value={ this.state.password }
                            onChangeText={ password => this.setState({password}) }}
                            secureTextEntry={true}
                            onSubmitEditing= { () => {
                                this.registrate();
                            }}>
                </TextInput>
                <Button 
                    onPress={() => {
                        this.registrate();
                    }}>
                </Button>
            </View>
        </ThemeContext.Provider>
    );
  }
}



export default Registration;