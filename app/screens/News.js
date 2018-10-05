import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
		ImageBackground,
    Image,
    Divider,
		ScrollView
} from 'react-native';
import { DrawerActions, NavigationActions } from 'react-navigation';
import UserInput from './UserInput';
import usernameImg from '../assets/Username.png';
import passwordImg from '../assets/Password.png';
import { FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-af-video-player'
import { TextField } from 'react-native-material-textfield';
import SideMenu from 'react-native-side-menu';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
} from 'react-native-material-ui';

import stylesCss from '../assets/css/style.js';

class News extends Component {

  constructor() {
      super();
  }


  render() {
    return(
			<ScrollView orientation="vertical">
				<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
					<View style={styles.card} elevation={5}>
					 	<Text style={{margin: 15, fontWeight: 'bold', fontSize: 16, color: 'white'}}>
						Basketbal
						</Text>
						<View style={{backgroundColor: 'white', paddingBottom: 25, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
							<Image
							source={require('../assets/basketbal_kids_bslim.jpg')}
								resizeMode="cover"
								style={{width: '100%', height: 200}}
							/>
							<Text style={{margin: 15, fontSize: 14, color: 'grey'}}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat lacinia ex sit amet mollis. Ut dignissim dictum ligula, vitae luctus urna commodo eget. Fusce ultricies urna sodales, fringilla dolor quis, lacinia augue. Curabitur et dui porta, dapibus nunc vitae, imperdiet est. Morbi bibendum risus augue, sed elementum felis lacinia et. Nunc fringilla nulla vel arcu condimentum, at sollicitudin ante sollicitudin. Mauris porta lacus ac nisl sodales scelerisque.
							</Text>
							<Button
								primary
								text="Meer"
								style={{
      						container: {
										position: "absolute", bottom: 5, right: 5
									}
								}}
                                onPress={() => this.props.navigation.dispatch(NavigationActions.navigate({
    								routeName: 'EventStack',
    								action: NavigationActions.navigate({ routeName: 'EventDetail' })
    								})
    							)}/>
						</View>
					</View>
				</View>
				<View style={styles.container}>
					<View style={styles.card} elevation={5}>
					 	<Text style={{margin: 15, fontWeight: 'bold', fontSize: 16, color: 'white'}}>
						Klimmen
						</Text>
						<View style={{backgroundColor: 'white', paddingBottom: 25, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
							<Image
							source={require('../assets/klimmen_kids_bslim.jpg')}
								style={{width: '100%', height: 200}}
								resizeMode="cover"
							/>
							<Text style={{margin: 15, fontSize: 14, color: 'grey'}}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat lacinia ex sit amet mollis. Ut dignissim dictum ligula, vitae luctus urna commodo eget. Fusce ultricies urna sodales, fringilla dolor quis, lacinia augue. Curabitur et dui porta, dapibus nunc vitae, imperdiet est. Morbi bibendum risus augue, sed elementum felis lacinia et. Nunc fringilla nulla vel arcu condimentum, at sollicitudin ante sollicitudin. Mauris porta lacus ac nisl sodales scelerisque.
							</Text>
							<Button
								primary
								text="Meer"
								style={{
      						container: {
										position: "absolute", bottom: 5, right: 5
									}
								}}/>
						</View>
					</View>
				</View>
				</ImageBackground>
			</ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
		justifyContent: 'center',
  },
	card: {
		backgroundColor: '#FF6700',
		margin: 10,
		borderRadius: 10,
		shadowOffset: {width: 0, height: 13},
		    shadowOpacity: 0.3,
		    shadowRadius: 6,

		    // android (Android +5.0)
		    elevation: 3,
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


export default News;
