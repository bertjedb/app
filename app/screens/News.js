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
    ScrollView,
    Animated,
    Dimensions, ListView
} from 'react-native';
import { DrawerActions, NavigationActions } from 'react-navigation';
import UserInput from './UserInput';
import usernameImg from '../assets/Username.png';
import passwordImg from '../assets/Password.png';
import { FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-af-video-player'
import { TextField } from 'react-native-material-textfield';
import BottomSheet from 'react-native-js-bottom-sheet'
import {PacmanIndicator} from 'react-native-indicators';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
	Subheader,
	Drawer,
	Checkbox
} from 'react-native-material-ui';

import stylesCss from '../assets/css/style.js';
import Api from "../config/api";

class News extends Component {

//Define bottomSheet
bottomSheet: BottomSheet

  constructor() {
      super();
	  this.state = {
		  search: false,
		  check1: true,
		  check2: false,
		  check3: true,
		  check4: false,
		  check5: false,
		  check6: true,
		  loading: true,
	  }

      let api = Api.getInstance()
      api.callApi('api/getAllEvents', 'POST', {}, response => {
          if(response['responseCode'] == 200) {
              console.log(response);
              let ds = new ListView.DataSource({
                  rowHasChanged: (r1, r2) => r1 !== r2
              });
              this.setState({
                  dataSource: ds.cloneWithRows(response['events']),
              });
              console.log(this.state);
          }
      });
  }

  componentDidMount() {
	  setTimeout(() => {
		  this.setState({loading: false})
	  }, 5000);
  }

  showFilter() {
	  this.bottomSheet.open()
    };

  render() {
    return(
		<View>
			<Toolbar
				centerElement={"Evenementen"}
				searchable={{
				  autoFocus: true,
				  placeholder: 'Zoeken',
				  onChangeText: (text) => this.setState({search : text})
				}}
				rightElement={("filter-list")}
				onRightElementPress={()=> this.showFilter()}
			/>
			<BottomSheet
          ref={(ref: BottomSheet) => {
            this.bottomSheet = ref
          }}
		  styleContainer={{paddingBottom: 120}}
          backButtonEnabled={true}
          coverScreen={false}
          options={[
            {
              icon: (
                <Text style={{fontWeight: 'bold'}}>Wijken</Text>
              ),
            },
            {
				icon: (
                  <Checkbox label="Beijum" value="agree" onCheck={()=>this.setState({check1: !this.state.check1})} checked={this.state.check1} />
                ),
            },
            {
				icon: (
                  <Checkbox label="Hoogkerk" value="agree" onCheck={()=>this.setState({check2: !this.state.check2})} checked={this.state.check2} />
                ),
              onPress: () => null
            },
            {
				icon: (
                  <Checkbox label="Ten Boer" value="agree" onCheck={()=>this.setState({check3: !this.state.check3})} checked={this.state.check3} />
                ),
              onPress: () => null
            },
            {
				icon: (
                  <Text style={{fontWeight: 'bold'}}>Begeleider</Text>
                ),
              onPress: () => null
            },
            {
				icon: (
                  <Checkbox label="Berend Baandrecht" value="agree" onCheck={()=>this.setState({check4: !this.state.check4})} checked={this.state.check4} />
                ),
              onPress: () => null
            },
            {
				icon: (
                  <Checkbox label="Jaap Vos" value="agree" onCheck={()=>this.setState({check5: !this.state.check5})} checked={this.state.check5} />
                ),
              onPress: () => null
            },
            {
				icon: (
                  <Checkbox label="Karel Achterveld" value="agree" onCheck={()=>this.setState({check6: !this.state.check6})} checked={this.state.check6} />
                ),
              onPress: () => null
            }
          ]}
          isOpen={false}
        />
			<ScrollView orientation="vertical">
			{!this.state.loading &&
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
			}
			{this.state.loading &&
				<View style={{paddingBottom: 150, justifyContent: 'center', alignItems: 'center', widht: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: '#94D600'}}>
				<Image  style = {{width: 350, height: 225}}
							source = {require('../assets/logo.png')}
							/>
				<PacmanIndicator color='white' />
				</View>
			}
			</ScrollView>
		</View>
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
