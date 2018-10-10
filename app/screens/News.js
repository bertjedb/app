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
    Dimensions,
    ListView,
    Button,
    Alert, Share, TouchableHighlight
} from 'react-native';
import { DrawerActions, NavigationActions, Header } from 'react-navigation';
import usernameImg from '../assets/Username.png';
import passwordImg from '../assets/Password.png';
import { FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-af-video-player'
import { TextField } from 'react-native-material-textfield';
import BottomSheet from 'react-native-js-bottom-sheet';
import {PacmanIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
	Subheader,
	Drawer,
	Checkbox
} from 'react-native-material-ui';
import Api from '../config/api.js';
import stylesCss from '../assets/css/style.js';

var filterOptions = [
  {
    icon: (
      <Text style={{fontWeight: 'bold'}}>Filter op evenementen met begeleider</Text>
    ),
  }
];

var checks = [];

class News extends Component {

//Define bottomSheet
bottomSheet: BottomSheet;


  constructor() {
      super();
	  this.state = {
      dataSource: null,
      adminArray: [],
      checkMap: new Map(),
		  loading: true,
	  }

      let api = Api.getInstance()
      api.callApi('api/getAllNewsItems', 'GET', {}, response => {
          if(response['responseCode'] == 200) {
            Log.d(response);
              let ds = new ListView.DataSource({
                  rowHasChanged: (r1, r2) => r1 !== r2
              });
              this.setState({
                  dataSource: ds.cloneWithRows(response['news']),
              });
              console.log(this.state);
          }
      });
    //  this.getAdmins();
  }


  componentDidMount() {
      //this.getAdmins();
      this.onLoad();
      this.props.navigation.addListener('willFocus', this.onLoad)
  	  setTimeout(() => {
  		  this.setState({loading: false})
  	  }, 0);
      //  this.initFilterOptions(this.getAdmins())
  }

  getAdmins() {
    api = Api.getInstance();
    api.callApi('api/getAllAdmins', 'POST', {}, response => {
      if(response['responseCode'] == 200) {
            // for(admin in response['admins']){
            //   console.log("ADMIN :::::::::::" + admin)
            //   this.adminArray.push(admin);
            // }
            // }
            // return response['admins'];
          console.log(this.state)
          this.setState({
            adminArray: response['admins']
          })
          this.initFilterOptions();
          console.log(this.state)

        }
      })
  }


    onLoad = () => {
        this.refresh();
    }

    handleSearch() {
        let api = Api.getInstance();
        userData = {
            searchString: this.state.search
        }
        api.callApi('api/searchNews', 'POST', userData, response => {
            if(response['responseCode'] == 200) {
                    console.log(response);
                  let ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });
                this.setState({
                    firstLoading: false,
                    dataSource: ds.cloneWithRows(response['news']),
                    uploading: false,
                });
              }
        });
    }

    refresh(){
        let api = Api.getInstance()
        api.callApi('api/getAllNewsItems', 'GET', {}, response => {
            if(response['responseCode'] == 200) {
                console.log(response);
                let ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });
                this.setState({
                    firstLoading: false,
                    dataSource: ds.cloneWithRows(response['news']),
                    uploading: false,
                });
            }
        })
    }

  showFilter() {
	  this.bottomSheet.open()
    };

  handleChange(e) {
     const item = e.target.name;
     const isChecked = e.target.checked;
     this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
   }

  initFilterOptions(){

    filterOptions = [
      {
        icon: (
          <Text style={{fontWeight: 'bold'}}>Filter op evenementen met begeleider</Text>
        ),
      }
    ]
      this.state.adminArray.map((admin) => {

        this.state.checkMap.set(admin.id, false);

        filterOptions.push(
            {
              icon: (
                      <Checkbox label={admin.firstName + " " + admin.lastName } value="agree" checked={this.state.checkMap.get(admin.id)}
                       onCheck={()=> {this.state.checkMap.set(admin.id, !this.state.checkMap.get(admin.id)), console.log(this.state.checkMap)}}
                            />

                    ),
                  onPress: () => null,
            },
          )
        });
      //   checks['check' + admin.ixd] = false;
      //   filterOptions.push(
      //     {
      //       icon: (
      //               <Checkbox label={admin.firstName + " " + admin.lastName } value="agree" checked={checks['check1']} onCheck={()=> {checks['check1'] = true, console.log(checks['check' + admin.id])}} />
      //             ),
      //           onPress: () => null,
      //     },
      //   )
      // });
      console.log("ARRAYOFCHECKS /////////////////////////////////////////////////////")
      console.log(this.state.checkMap)
      console.log(this.state.checkMap.get(1))
  }

  render() {


    return(
		<View >
            <LinearGradient
                  colors={['#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201','#94D600', '#76C201', '#94D600', '#76C201']}
                  style={{ height: Header.HEIGHT}}
                >
			 <Toolbar
			 	centerElement={"Nieuws"}
			 	searchable={{
			 	  autoFocus: true,
			 	  placeholder: 'Zoeken',
			 	  onChangeText: (text) => this.setState({search : text}),
                      onSubmitEditing: () => {this.handleSearch()}
			 	}}
			 	rightElement={("filter-list")}
			 	onRightElementPress={()=> this.showFilter()}
			 />
            </LinearGradient>
			<BottomSheet
          ref={(ref: BottomSheet) => {
            this.bottomSheet = ref
          }}
		      styleContainer={{paddingBottom: 120}}
          backButtonEnabled={true}
          coverScreen={false}
          options={filterOptions}
          isOpen={false}
            />

				<ImageBackground blurRadius={3} source={require('../assets/frisbee_kids_bslim.jpg')}  style={{width: '100%', height: '100%'}}>
                    <View style={{marginBottom:172}}>
                    {
                this.state.dataSource != null &&
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View style={styles.container}>
                            <View style={styles.card} elevation={5} >


                                <View style={{
                                    backgroundColor: 'rgba(52, 52, 52, 0,8)',
                                    paddingBottom: 0,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                }}>
                                    <TouchableHighlight
                                        onPress={() => this.props.navigation.navigate('NewsDetail', {
                                            title: rowData.title,
                                            content: rowData.desc,
                                            link: rowData.link,
                                            img: rowData.url
                                         })} >
                                    <ImageBackground
                                        source={{uri:rowData.url}}
                                        resizeMode="cover"
                                        imageStyle={{ borderRadius: 10 }}
                                        style={{width: '100%', height: 250,}}>
                                        <View  style={{height:'38%',width:'100%',backgroundColor:'#00000080', position: "absolute", bottom: 0,borderRadius:10}}>
                                            <View style={{flex:1,flexDirection: 'column',margin:20,marginTop:7,marginBottom:40}}>
                                                <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>
                                                    {rowData.title}
                                                </Text>
                                            </View>
                                            <View style={{flex:1,flexDirection: 'row',marginBottom:10}}>
                                                <Text style={{fontWeight: 'bold', fontSize: 15, color: '#BDBDBD',position: "absolute",right:10}}>
                                                    lees verder
                                                </Text>
                                            </View>
                                        </View >


                                    </ImageBackground>
                                    </TouchableHighlight>
                                    {/*<View style={{justifyContent:'center',alignItems: 'center',flex:1,flexDirection: 'column'}}>*/}
                                        {/*<Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>*/}
                                            {/*{rowData.title}*/}
                                        {/*</Text>*/}
                                        {/*<Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>*/}
                                            {/*{rowData.created}*/}
                                        {/*</Text>*/}
                                    {/*</View>*/}

                                    {/*<Text numberOfLines={3} ellipsizeMode="tail"*/}
                                          {/*style={{margin: 5,marginBottom:30, fontSize: 13, color: 'grey'}}>*/}
                                        {/*{rowData.desc}*/}
                                    {/*</Text>*/}
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,

                                    }}>

                                    {/*<View style={{ width: '100%',marginTop:10,}}>*/}
                                        {/*<TouchableOpacity onPress={() => Share.share({*/}
                                            {/*message: 'Bslim nieuws: ' + capitalize.words(rowData.title.toString().replace(', ,', ' ')) + '. Voor meer informatie ga naar: ' + rowData.link*/}
                                        {/*})} style={{justifyContent:'center',alignItems: 'center',height: 30,*/}
                                            {/*borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor:'#93D500'}}>*/}
                                            {/*<Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>Delen</Text></TouchableOpacity>*/}
                                    {/*</View>*/}
                                    </View>
                                </View>
                            </View>
                        </View >

                    }
                        />
                    }
                    </View>
				</ImageBackground >


			{this.state.loading &&
				<View style={{paddingBottom: 150, justifyContent: 'center', alignItems: 'center', widht: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: '#94D600'}}>
				<Image  style = {{width: 350, height: 225}}
							source = {require('../assets/logo.png')}
							/>
				<PacmanIndicator color='white'  />
				</View>
			    }
			  </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
		justifyContent: 'center',
        marginBottom: 15,

  },
	card: {
		color: 'rgba(52, 52, 52, 1.0)',
		margin: 10,
        marginBottom:10,

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
    color: 'rgba(52, 52, 52, 1.0)',
  },
})


export default News;
