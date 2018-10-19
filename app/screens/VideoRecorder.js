import React, {
    Component
} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ImageBackground
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
import LinearGradient from 'react-native-linear-gradient';
import { Toolbar } from 'react-native-material-ui';
import { Header } from 'react-navigation';
import styles from '../assets/css/style.js';

export default class VideoRecorder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            processing: false,
            path: ''
        };
    }

    async startRecording() {
        this.setState({recording: true});
        const { uri, codec = "mp4"} = await this.camera.recordAsync();
        this.setState({recording: false, processing: true});
        const type = "video/mp4";

        const data = new FormData();
        data.append("video", {
            name: "video-upload",
            type,
            uri
        })

    }

    stopRecording() {
        this.setState({recording: false})
        this.camera.stopRecording();
    }
    
    render() {
    return(
        <ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
            <LinearGradient
                        colors={['#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201','#94D600', '#76C201', '#94D600', '#76C201']}
                        style={{ height: Header.HEIGHT}}
                      >
                <Toolbar
                    iconSet="MaterialCommunityIcons"
                    centerElement={this.state.title}
                    leftElement={("arrow-left")}
                    onLeftElementPress={() => {console.log("back"); this.props.navigation.navigate("More")}}
                />
            </LinearGradient>
            <View style={{flex:1, marginTop: Header.HEIGHT + 20}}>
                <RNCamera
                    ref={camera => {
                        this.camera = camera;
                    }}
                    type={RNCamera.Constants.Type.back}
                    style={{flex: 1, justifyContent: 'flex-end'}}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    permissionDiaglogTitle={'Toegang tot camera'}
                    permissionDiaglogMessage={'Bslim heeft toegang tot je camera nodig om door te gaan'}
                    captureAudio={true}
                    ratio= "16:9"
                >
                {!this.state.recording &&
                    <TouchableOpacity onPress = {this.startRecording.bind(this)}>
                      <Text style = {styles.defaultBtn}>Opnemen</Text>
                    </TouchableOpacity>}
                {this.state.recording &&
                    <TouchableOpacity onPress = {this.stopRecording()}>
                      <Text style = {styles.defaultBtn}>stoppen</Text>
                    </TouchableOpacity>}
                </RNCamera>
            </View>
        </ImageBackground>
    );
    }
}