import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    ImageBackground
} from 'react-native';
import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button
} from 'react-native-material-ui';
import { DrawerActions } from 'react-navigation';
import styles from '../assets/css/style.js';
import Api from '../config/api.js';


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

export default class Registration extends Component {

  constructor() {
      super();
      this.state = {
        email: 'iemand@mail.com',
        firstPassword: '1234',
        secondPassword: '1234',
        firstName: 'ab',
        lastName: 'ab',
      };
    
  }

  registrate() {
    if(this.state.firstPassword == this.state.secondPassword) {
        let api = Api.getInstance();
        let userData = {
            email: this.state.email,
            password: this.state.firstPassword,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        }
        api.callApi('register', 'POST', userData, response => {
            console.log(response);
        });
        alert("registrating");
    } else {
        alert('De ingevulde wachtwoorden zijn niet gelijk.')
    }
    
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
            <ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%', flex:1, alignItems: 'center'}}>
                <View style={styles.inputContainer}>
                    <Text style={styles.rgstTitle}>
                        Registreren
                    </Text>
                    <TextInput  style= {styles.inputField}
                                fontStyle = {'italic'}
                                label="First name"
                                placeholder="   Voornaam"
                                value={ this.state.firstName }
                                onChangeText={ firstName => this.setState({firstName}) }>
                    </TextInput>
                    <TextInput  style= {styles.inputField}
                                fontStyle = {'italic'}
                                label="Last name"
                                placeholder="   Achternaam"
                                value={ this.state.lastName }
                                onChangeText={ lastName => this.setState({lastName}) }>
                    </TextInput>
                    <TextInput  style= {styles.inputField}
                                fontStyle = {'italic'}
                                label="E-mail address"
                                placeholder="   E-mailadres"
                                value={ this.state.email }
                                onChangeText={ email => this.setState({email}) }>
                    </TextInput>
                    <TextInput  style= {styles.inputField}
                                fontStyle = {'italic'}
                                label="Password"
                                value={ this.state.firstPassword }
                                placeholder="   Wachtwoord"
                                onChangeText={ password => this.setState({firstPassword}) }
                                secureTextEntry={true}>
                    </TextInput>
                    <TextInput  style= {styles.inputField}
                                fontStyle = {'italic'}
                                label="Password"
                                value={ this.state.secondPassword }
                                placeholder="   Herhaal wachtwoord"
                                onChangeText={ password => this.setState({secondPassword}) }
                                secureTextEntry={true}
                                onSubmitEditing= { () => {
                                    this.registrate();
                                }}>
                    </TextInput>
                    <Button
                        style={{container: styles.rgstBtn}}
                        raised text="Doorgaan"
                        onPress={() => {
                            this.registrate();
                        }}>
                    </Button>
                </View>
            </ImageBackground>
        </ThemeContext.Provider>
    );
  }
}