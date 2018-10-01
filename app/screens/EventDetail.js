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

class EventDetail extends Component {

  constructor() {
      super();
      this.state = {
        card: null,
        cameraActive: false,
        loggedIn: false,
        points: null
      };
  }

  componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
    }
    this.refreshCard();
  }

  refreshCard() {
    console.log("update")
    let localStorage = LocalStorage.getInstance();
    let points = localStorage.retrieveItem('points').then((points) => {
        if(points != null) {
                this.setState({card: this.fillCard(points),
                               loggedIn: true});
            }

    })
  }

  componentWillUnmount ()
  {
      if (this._confettiView)
      {
          this._confettiView.stopConfetti();
      }
  }

	getFile(id, total){
        if(id <= total){
            return require('../assets/points/check.png');
        }

        switch(id) {
        case 1:
            return require('../assets/points/1.png');
            break;
        case 2:
            return require('../assets/points/2.png');
            break;
        case 3:
            return require('../assets/points/3.png');
            break;
        case 4:
            return require('../assets/points/4.png');
            break;
        case 5:
            return require('../assets/points/5.png');
            break;
        case 6:
            return require('../assets/points/6.png');
            break;
        case 7:
            return require('../assets/points/7.png');
            break;
        case 8:
            return require('../assets/points/8.png');
            break;
        case 9:
            return require('../assets/points/9.png');
            break;
        case 10:
            return require('../assets/points/10.png');
            break;
        case 11:
            return require('../assets/points/11.png');
            break;
        case 12:
            return require('../assets/points/12.png');
            break;
        case 13:
            return require('../assets/points/13.png');
            break;
        case 14:
            return require('../assets/points/14.png');
            break;
        case 15:
            return require('../assets/points/15.png');
            break;
        default:
            return require('../assets/points/1.png');
        };
    }

  fillCard(numOfStamps) {
    let holderArray = [];
        let count = 1;

    for(let row = 0; row < 5; row++) {
        holderArray.push(
            <View key = {15 - count} style= {stylesCss.pointCardColumn }>
                <View style={ stylesCss.pointCardRow}>
                    <Image  style = { stylesCss.stampFilled}
                                    source = {this.getFile(count, numOfStamps)}
                                    />
                    <Image  style = { stylesCss.stampFilled }
                                    source = {this.getFile(count+1, numOfStamps)}
                    />
                    <Image  style = { stylesCss.stampFilled }
                                    source = {this.getFile(count+2, numOfStamps)}
                    />
                </View>
            </View>
        );
            count = count + 3;
    }
    return holderArray;
  }
//			<ConfettiView>

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

const styles = StyleSheet.create({

    cardContainer:{
    	height: Dimensions.get('window').height,
    	width: Dimensions.get('window').width,
    },

    card: {
    	backgroundColor: '#FFFFFF',
    	margin: 10,
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
