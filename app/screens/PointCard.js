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

class PointCard extends Component {

  constructor() {
      super();
      this.state = {
        card: null,
        cameraActive: false,
        userId: null
      };

  }

	componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
    }
    this.refreshCard();
  }

  refreshCard() {
    let api = Api.getInstance();
    let localStorage = LocalStorage.getInstance();
        localStorage.retrieveItem('userId').then((id) => {
            userData = {
                id: id
            }
            api.callApi('api/checkPoints', 'POST', userData, response => {
                    this.setState({card: this.fillCard(response['points'][0]) });
                    localStorage.storeItem('points', response['points'][0]));
                });
          }).catch((error) => {
          //this callback is executed when your Promise is rejected
          localStorage.retrieveItem('points').then((points) => {
            this.setState({card: this.fillCard(response['points'][0])})
          });
          console.log('Promise is rejected with error: ' + error);
          });
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
    this.refreshCard();
    return(
		<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
		<CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
          <TouchableOpacity activeOpacity={1} style={styles.container}  >
				<View style={styles.card} elevation={5}>
					<Text style={{marginTop: 15, fontWeight: 'bold', fontSize: 20, color: '#3bb222'}}>
					Stempelkaart
					</Text>
					<Text style={{marginBottom: 10, fontWeight: 'bold', fontSize: 14, color: '#3bb222'}}>
					Scan een QR-code voor een stempel
					</Text>
					<View style={{
						backgroundColor: 'white',
						height: Dimensions.get('window').height -320,
						width: Dimensions.get('window').width -40,
						borderRadius: 10,
						alignItems: 'center',}}>
						{this.state.card}
					</View>
					<TouchableOpacity
						onPress={() => {  this.card.flip();
                                          this.setState({cameraActive: true})
                                       }
                                }
						style = {{ marginBottom: 10,
							marginTop: 10,
							height: 65,
							width: 65,
							backgroundColor: '#3bb222',
							borderRadius: 50,
							shadowOffset: {width: 0, height: 13},
							shadowOpacity: 0.3,
							shadowRadius: 6,
							// android (Android +5.0)
							elevation: 5,}}>
						<Icon onPress={() => {this.card.flip(); this.setState({cameraActive: false})}} name="camera" style={{margin:15,}} size={35} color='white' />
					</TouchableOpacity>
				</View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.container}>
				<View style={styles.card} elevation={5}>
					<Text style={{marginTop: 15, fontWeight: 'bold', fontSize: 20, color: '#3bb222'}}>
					Scanner
					</Text>
					<Text style={{marginBottom: 10, fontWeight: 'bold', fontSize: 14, color: '#3bb222'}}>
					Scan een QR-code voor een stempel
					</Text>
					   <View style={{
						     backgroundColor: 'white',
						     height: Dimensions.get('window').height -320,
						     width: Dimensions.get('window').width -40,
						     borderRadius: 10,
						     alignItems: 'center',}}>
					       <ScannerQR/>
					   </View>
					<TouchableOpacity
						onPress={() => this.card.flip()}
						style = {{ marginBottom: 10,
							marginTop: 10,
							height: 65,
							width: 65,
							backgroundColor: '#FF6700',
							borderRadius: 50,
							shadowOffset: {width: 0, height: 13},
							shadowOpacity: 0.3,
							shadowRadius: 6,
							// android (Android +5.0)
							elevation: 5,}}>
						<Icon onPress={() => this.card.flip()} name="close" style={{margin:15,}} size={35} color='white' />
					</TouchableOpacity>
				</View>
          </TouchableOpacity>
        </CardFlip>
		</ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  cardContainer:{
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width,
  },
  cardUM:{
    width: 320,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    lineHeight: 470,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

  container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 135,
  },
	card: {
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		height: Dimensions.get('window').height - 210,
		width: Dimensions.get('window').width -40,
		margin: 10,
		marginBottom: 40,
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

	video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  logo: {
    height: 250,
    width: 300,
    resizeMode: 'contain',
  },
  loginButton: {
    margin: 5,
    backgroundColor: '#FF6700',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden'
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
})


export default PointCard;
