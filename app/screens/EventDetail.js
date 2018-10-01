import React, {
    Component
} from 'react';

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
		StyleSheet,
		ImageBackground,
		Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { DrawerActions } from 'react-navigation';
import ActionButton from 'react-native-action-button';

import stylesCss from '../assets/css/style.js';

import QRCodeScanner from 'react-native-qrcode-scanner';

import ScannerQR from './ScannerQR.js';

import ConfettiView from 'react-native-confetti-view';

import CardFlip from 'react-native-card-flip';

import Api from '../config/api.js';

import LocalStorage from '../config/localStorage.js';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
} from 'react-native-material-ui';
import Triangle from 'react-native-triangle';



class EventDetail extends Component {

constructor() {
  super();
  this.state = {
	  map: true
  }
}

render() {
  return(
	  <ImageBackground source={require('../assets/maps.jpeg')} style={{width: '100%', height: '100%'}} >
		<TouchableOpacity style={styles.cardContainer} onPress={() => this.setState({map: !this.state.map})}>
{this.state.map == true &&
		<View style={{marginBottom: 150, flexDirection: 'row'}}>
		<ImageBackground blurRadius={2} source={require('../assets/sport_kids_bslim.jpg')} style={{width: 100, height: 75, elevation: 5}} resizeMode="cover">
			<Icon name="image-filter" size={30} style={{marginLeft:35, marginTop: 20, marginBottom: 20, marginRight: 35}} color='white' />
		</ImageBackground>
		<TouchableOpacity style={{width: 50, height: 50, borderRadius: 50, marginLeft: 210,backgroundColor: 'white', shadowOffset: {width: 0, height: 13},
        shadowOpacity: 0.3,
        shadowRadius: 6,

        // android (Android +5.0)
        elevation: 3}}>
		<Icon name="google-maps" size={30} style={{margin:10}} color='#FF6700' />
		</TouchableOpacity>
		</View>
	}
	{this.state.map == true &&
			<View style={styles.card} elevation={5}>
			<View style={styles.cardTitle} elevation={5}>
				<Image source={require('../assets/bslim_profile.png')} style={{width: 40, height: 40, margin: 10, borderRadius: 55}} resizeMode="cover"/>
				<View>
					<Text style={{marginLeft: 10, marginTop: 10, fontWeight: 'bold', fontSize: 18, color: 'white'}}>
					Jan-Willem Kroos
					</Text>
					<Text style={{marginLeft: 10, marginBottom: 10, fontWeight: 'bold', fontSize: 12, color: 'white'}}>
					Vrijdag 13:15
					</Text>
				</View>
			</View>
			<View style={{backgroundColor: 'white', paddingBottom: 15, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
			<Text style={{margin: 10,}}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor quis magna a pellentesque. Nulla eu tempor orci. Nunc dolor nunc, pulvinar ac mi vitae, fringilla facilisis mi. Vivamus blandit sapien quis ornare cursus. Aliquam suscipit purus vel tellus imperdiet fermentum.
			</Text>
			<View style={{marginLeft: 10, marginRight: 10}}>
				<Text style={{fontWeight: 'bold'}}>
				Locatie: Sportpark Het Noorden
				</Text>
				<Text style={{fontWeight: 'bold'}}>
				Datum: Maandag 24 September 2018
				</Text>
				<Text style={{fontWeight: 'bold'}}>
				Tijd: 16:00 uur
				</Text>
			</View>
			</View>

			</View>
		}
		{this.state.map == true &&
			<Triangle
			  width={80}
			  height={40}
			  color={'white'}
			  direction={'down'}
			/>
		}
		</TouchableOpacity>
	  </ImageBackground>
  );
}
}
/*
  render() {
    return(
		<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
		  <View style={styles.cardContainer} >
          <View style={styles.card} elevation={5}>
          <ScrollView style={{height: Dimensions.get('window').height -160, borderRadius: 10,}}>
                <View style={styles.cardTitle} elevation={5}>
                    <Image source={require('../assets/bslim_profile.png')} style={{width: 40, height: 40, margin: 10}} resizeMode="cover"/>
					<View>
                        <Text style={{marginLeft: 10, marginTop: 10, fontWeight: 'bold', fontSize: 18,}}>
    					Jan-Willem Kroos
    					</Text>
                        <Text style={{marginLeft: 10, marginBottom: 10, fontWeight: 'bold', fontSize: 12,}}>
    					Vrijdag 13:15
    					</Text>
                    </View>
                </View>
                <Image
                source={require('../assets/frisbee_kids_bslim.jpg')}
                    resizeMode="cover"
                    style={{width: '100%', height: 200}}
                />
                <Text style={{margin: 10,}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor quis magna a pellentesque. Nulla eu tempor orci. Nunc dolor nunc, pulvinar ac mi vitae, fringilla facilisis mi. Vivamus blandit sapien quis ornare cursus. Aliquam suscipit purus vel tellus imperdiet fermentum. Mauris eu dolor faucibus, commodo dui ac, auctor quam. Aenean maximus odio nec enim dignissim, vitae luctus purus pulvinar. Suspendisse elementum nibh non nibh malesuada fringilla. Aenean nec justo cursus, venenatis orci at, aliquet mi.
                </Text>
                <View style={{margin: 10,}}>
                    <Text style={{fontWeight: 'bold'}}>
                    Locatie: Sportpark Het Noorden
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                    Datum: Maandag 24 September 2018
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                    Tijd: 16:00 uur
                    </Text>
                </View>
                <Image
                    source={{ uri:'https://static-maps.yandex.ru/1.x/?lang=en-US&ll=6.5560995,53.2390828&z=15&l=map&size=500,300&pt=6.5560995,53.2390828,flag'}}
                    resizeMode="cover"
                    style={{width: '100%', height: 200}}/>
			</ScrollView>
            </View>
          </View>
		</ImageBackground>
    );
  }
}

*/
const styles = StyleSheet.create({

    cardContainer:{
    	height: Dimensions.get('window').height,
    	width: Dimensions.get('window').width,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 220

    },

    card: {
    	backgroundColor: '#FF6700',
    	margin: 10,
		marginBottom: 0,
    	borderRadius: 10,
    	shadowOffset: {width: 0, height: 13},
        shadowOpacity: 0.3,
        shadowRadius: 6,

        // android (Android +5.0)
        elevation: 3,
    },

    cardTitle: {
        flexDirection: 'row',
        margin: 0,
        padding: 0,
    },
})


export default EventDetail;
