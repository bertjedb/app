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
		Share,
		Linking,
		Platform,
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

import HTML from 'react-native-render-html';

import ImageSlider from 'react-native-image-slider';
import {PacmanIndicator} from 'react-native-indicators';

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
	  map: true,
	  title: '',
	  content: '',
	  url: '',
	  start: '',
	  end: '',
	  author: '',
	  loading: true,
	  deelnemer: false,
  }
  let days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
  let months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

  fetch('http://gromdroid.nl/ide/workspace/hanze/newfile.json', {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
	.then(response => response.json())
	.then(response => {this.setState({
		title: response['name'],
		content: response['desc'],
		url: response['link'],
		date: days[new Date(response['begin']).getDay()] + ' ' + new Date(response['begin']).getDay() + ' ' + months[new Date(response['begin']).getMonth()] + ' ' + new Date(response['begin']).getFullYear(),
		time: ('0'+new Date(response['begin']).getHours()).slice(-2) + ':' + ('0'+new Date(response['begin']).getMinutes()).slice(-2) + ' tot ' + ('0'+new Date(response['end']).getHours()).slice(-2) + ':' + ('0'+new Date(response['end']).getMinutes()).slice(-2),
		author: response['leader'],
		img: response['img'],
		lat: response['latitude'],
		long: response['longtitude'],
		location: response['location'],
		loading: false,
	})
	console.log(this.state.date)
})


}


/*
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
*/

  render() {
    return(
		<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
		<Toolbar
		iconSet="MaterialCommunityIcons"
			centerElement={this.state.title}
			leftElement={("arrow-left")}
			onLeftElementPress={() => this.props.navigation.goBack()}
		/>
		{this.state.loading &&
			<PacmanIndicator color='white' />
		}
		{!this.state.loading &&
		  <View style={styles.cardContainer} >
          <View style={styles.card} elevation={5}>
          <ScrollView style={{height: Dimensions.get('window').height -160, borderRadius: 10,}}>
                <View style={styles.cardTitle} elevation={5}>
                    <Image source={require('../assets/bslim_profile.png')} style={{width: 40, height: 40, margin: 10}} resizeMode="cover"/>
					<View>
                        <Text style={{marginLeft: 10, marginTop: 10, fontWeight: 'bold', fontSize: 18,}}>
    					{this.state.author}
    					</Text>
                        <Text style={{marginLeft: 10, marginBottom: 10, fontWeight: 'bold', fontSize: 12,}}>
    					Vrijdag 13:15
    					</Text>
                    </View>
					{this.state.deelnemer &&
					<TouchableOpacity onPress={()=> this.setState({deelnemer: !this.state.deelnemer})} style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'white', borderRadius: 35, borderWidth:1, borderColor: '#94D600', marginLeft: 60, marginTop: 15, marginBottom: 15, width: 60,}}>
                        <Text style={{marginLeft: 5, marginRight: 5, fontWeight: 'bold', fontSize: 18, color: '#94D600'}}>
    					19
    					</Text>
						<Icon style={{padding: 5, backgroundColor: '#94D600', borderRadius: 33}} name="account-multiple" size={20} color='white' />
                    </TouchableOpacity>
					}
					{!this.state.deelnemer &&
						<TouchableOpacity onPress={()=> this.setState({deelnemer: !this.state.deelnemer})} style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'white', borderRadius: 35, borderWidth:1, borderColor: 'orange', marginLeft: 60, marginTop: 15, marginBottom: 15, width: 60,}}>
							<Icon style={{padding: 5, backgroundColor: 'orange', borderRadius: 33}} name="account-multiple" size={20} color='white' />
							<Text style={{marginLeft: 5, marginRight: 5, fontWeight: 'bold', fontSize: 18, color: 'orange'}}>
						   	18
						   </Text>
						</TouchableOpacity>
					}
                </View>
				<View style={{widht: '100%', height: 200}}>
				{this.state.img &&
				<ImageSlider
				autoPlayWithInterval={3000}
				images={this.state.img}/>
			}
				</View>


                <HTML onLinkPress={(evt, href) => { Linking.openURL(href); }} containerStyle={{marginLeft: 10, marginRight: 10}} ignoredTags={['img']} html={this.state.content} imagesMaxWidth={Dimensions.get('window').width } />
                <View style={{margin: 10,}}>
					{this.state.date != '' &&
                    <Text style={{fontWeight: 'bold'}}>
                    Datum: {this.state.date}
                    </Text>
					}
					{this.state.time != '' &&
                    <Text style={{fontWeight: 'bold'}}>
                    Tijd: {this.state.time}
                    </Text>
					}
					{this.state.location != '' &&
					<Text style={{fontWeight: 'bold'}}>
                    Locatie: {this.state.location}
                    </Text>
					}
                </View>
                <Image
                    source={{ uri:'https://static-maps.yandex.ru/1.x/?lang=en-US&ll='+ this.state.long +','+ this.state.lat +'&z=15&l=map&size=500,300&pt='+ this.state.long +','+ this.state.lat +',flag'}}
                    resizeMode="cover"
                    style={{width: '100%', height: 200}}/>
				<View style={{flexDirection: 'row'}}>
						<Button
							style={{
								container: {
									margin: 10,
										borderRadius: 10,
										backgroundColor: 'green'
								},
								text: {
									color: 'white'
								}
							}}
						 	text="Delen"
							onPress={() => Share.share({
      							message: 'Kom je ook sporten op 24 September 2018 bij Sportpark Het Noorden? Voor meer info: ' + this.state.url
  							})} />
						<Button
							style={{
								container: {
									margin: 10,
										borderRadius: 10,
										backgroundColor: 'green'
								},
								text: {
									color: 'white'
								}
							}}
						 	text="Route"
							onPress={() => Linking.openURL(Platform.OS === 'ios' ? 'maps:' : 'geo:' + this.state.lat + ',' + this.state.long)} />
				</View>
			</ScrollView>
            </View>
          </View>
	  }
		</ImageBackground>
    );
  }
}



const styles = StyleSheet.create({

    cardContainer:{
    	height: Dimensions.get('window').height,
    	width: Dimensions.get('window').width,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 150

    },

    card: {
    	backgroundColor: 'white',
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
